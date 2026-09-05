import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";
import { prisma, dbAvailable } from "@/lib/db";
import { getAvailability } from "@/lib/availability";
import { VILLAS } from "@/lib/site";

const schema = z.object({
  villaSlug: z.string().min(2),
  checkIn: z.string().min(8),
  checkOut: z.string().min(8),
  guests: z.coerce.number().min(1).max(12).default(2),
  guestName: z.string().min(2),
  guestPhone: z.string().min(6),
  guestEmail: z.string().email(),
  promoCode: z.string().optional(),
  serviceSlugs: z.array(z.string()).optional().default([]),
});

// POST /api/bookings — tạo giữ chỗ 15 phút + tính tiền thật (promo, dịch vụ)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Dữ liệu đặt phòng chưa đúng", details: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const nights = differenceInCalendarDays(new Date(d.checkOut), new Date(d.checkIn));
  if (nights <= 0) return NextResponse.json({ error: "Ngày trả phòng phải sau ngày nhận phòng" }, { status: 400 });

  const items = await getAvailability(d.checkIn, d.checkOut, d.guests);
  const found = items.find((i) => i.slug === d.villaSlug && i.available);
  if (!found) return NextResponse.json({ error: "Biệt thự đã hết phòng trong khoảng ngày này" }, { status: 409 });

  let discount = 0;
  if (d.promoCode && (await dbAvailable())) {
    const promo = await prisma.promotion.findUnique({ where: { code: d.promoCode.toUpperCase() } });
    const now = new Date();
    if (promo?.active && now >= promo.validFrom && now <= promo.validTo && nights >= promo.minNights) {
      discount = Math.round((found.total * promo.percent) / 100);
    }
  } else if (d.promoCode?.toUpperCase() === "AURAVIP") {
    discount = Math.round((found.total * 10) / 100);
  }

  // Cộng tiền dịch vụ đính kèm
  let servicesTotal = 0;
  const { SERVICES } = await import("@/lib/site");
  const pickedServices = SERVICES.filter((s) => d.serviceSlugs.includes(s.slug));
  servicesTotal = pickedServices.reduce((a, s) => a + s.price, 0);

  const total = found.total - discount + servicesTotal;
  const deposit = Math.round(total * 0.3);
  const code = `AURA-${Date.now().toString(36).toUpperCase()}`;
  const holdExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  if (await dbAvailable()) {
    const rt = await prisma.roomType.findUnique({ where: { slug: d.villaSlug } });
    if (!rt) return NextResponse.json({ error: "Không tìm thấy loại biệt thự" }, { status: 404 });
    const booking = await prisma.booking.create({
      data: {
        code, roomTypeId: rt.id,
        checkIn: new Date(d.checkIn), checkOut: new Date(d.checkOut),
        guests: d.guests, guestName: d.guestName, guestPhone: d.guestPhone,
        guestEmail: d.guestEmail, total, deposit,
        promoCode: d.promoCode?.toUpperCase(), holdExpiresAt,
        services: { create: pickedServices.map((s) => ({
          serviceId: "", // gắn sau khi map slug->id
          date: new Date(d.checkIn), qty: 1, amount: s.price,
        })) },
      },
    });
    // Gắn serviceId thật
    for (const s of pickedServices) {
      const svc = await prisma.service.findUnique({ where: { slug: s.slug } });
      if (svc) await prisma.bookingService.create({
        data: { bookingId: booking.id, serviceId: svc.id, date: new Date(d.checkIn), qty: 1, amount: Number(svc.price) },
      });
    }
    return NextResponse.json({ code: booking.code, bookingId: booking.id, total, deposit, holdExpiresAt, nights }, { status: 201 });
  }

  // Chế độ chưa có DB (dev nhanh): trả kết quả tính toán để FE đi tiếp tới thanh toán mock
  return NextResponse.json({ code, total, deposit, holdExpiresAt, nights, mode: "no-db" }, { status: 201 });
}

export async function GET() {
  if (!(await dbAvailable())) return NextResponse.json({ items: [] });
  const items = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ items: items.map((b) => ({ ...b, total: Number(b.total), deposit: Number(b.deposit) })) });
}
