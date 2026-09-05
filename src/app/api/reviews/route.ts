import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, dbAvailable } from "@/lib/db";

export async function GET() {
  if (!(await dbAvailable())) return NextResponse.json({ items: [] });
  const items = await prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 30 });
  return NextResponse.json({ items });
}

const schema = z.object({
  bookingCode: z.string().min(4), rating: z.number().min(1).max(5), comment: z.string().min(5),
});

// Chỉ booking COMPLETED/CHECKED_IN mới được review (verified)
export async function POST(req: NextRequest) {
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success || !(await dbAvailable())) return NextResponse.json({ error: "Dữ liệu chưa đúng hoặc chưa có DB" }, { status: 400 });
  const booking = await prisma.booking.findUnique({ where: { code: p.data.bookingCode } });
  if (!booking || !["CHECKED_IN", "COMPLETED", "CONFIRMED"].includes(booking.status))
    return NextResponse.json({ error: "Chỉ booking đã xác nhận/lưu trú mới được đánh giá" }, { status: 403 });
  const userId = booking.userId ?? (await prisma.user.findFirst())?.id;
  if (!userId) return NextResponse.json({ error: "Chưa có user" }, { status: 400 });
  const review = await prisma.review.upsert({
    where: { bookingId: booking.id },
    update: { rating: p.data.rating, comment: p.data.comment },
    create: { bookingId: booking.id, userId, rating: p.data.rating, comment: p.data.comment },
  });
  return NextResponse.json({ ok: true, id: review.id }, { status: 201 });
}
