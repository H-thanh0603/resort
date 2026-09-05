import { differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import { UnitStatus } from "@prisma/client";
import { prisma, dbAvailable } from "@/lib/db";
import { VILLAS } from "@/lib/site";

export type AvailabilityItem = {
  slug: string;
  name: string;
  pricePerNight: number;
  total: number;
  nights: number;
  availableUnits: number;
  available: boolean;
};

export async function getAvailability(checkIn: string, checkOut: string, guests = 2) {
  const ci = new Date(checkIn);
  const co = new Date(checkOut);
  const nights = differenceInCalendarDays(co, ci);
  if (isNaN(ci.getTime()) || isNaN(co.getTime()) || nights <= 0) {
    throw new Error("Khoảng ngày không hợp lệ");
  }

  // Fallback khi chưa có DB: dùng catalogue tĩnh, coi như còn phòng
  if (!(await dbAvailable())) {
    return VILLAS.filter((v) => v.guests >= guests).map((v) => ({
      slug: v.slug,
      name: v.name,
      pricePerNight: v.price,
      total: v.price * nights,
      nights,
      availableUnits: 3,
      available: true,
    })) as AvailabilityItem[];
  }

  const days = eachDayOfInterval({ start: ci, end: new Date(co.getTime() - 86400000) });
  const roomTypes = await prisma.roomType.findMany({
    include: { units: true, ratePlans: true, bookings: {
      where: {
        status: { in: ["PENDING_HOLD", "CONFIRMED", "CHECKED_IN"] },
        checkIn: { lt: co },
        checkOut: { gt: ci },
      },
    }},
  });

  return roomTypes
    .filter((r) => r.maxGuests >= guests)
    .map((r) => {
      const readyUnits = r.units.filter((u) => u.status === UnitStatus.READY).length || r.units.length;
      const bookedUnits = new Set(r.bookings.map((b) => b.unitId).filter(Boolean)).size;
      // Đếm booking chưa gán unit cụ thể theo số lượng
      const unassigned = r.bookings.filter((b) => !b.unitId).length;
      const availableUnits = Math.max(0, readyUnits - bookedUnits - unassigned);
      const perNight = days.map((d) => {
        const key = format(d, "yyyy-MM-dd");
        const plan = r.ratePlans.find((p) => format(p.date, "yyyy-MM-dd") === key);
        return Number(plan?.price ?? r.basePrice);
      });
      const total = perNight.reduce((a, b) => a + b, 0);
      return {
        slug: r.slug,
        name: r.name,
        pricePerNight: Math.round(total / Math.max(1, nights)),
        total,
        nights,
        availableUnits,
        available: availableUnits > 0,
      };
    });
}
