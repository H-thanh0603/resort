import { NextRequest, NextResponse } from "next/server";
import { prisma, dbAvailable } from "@/lib/db";
import { getSession } from "@/lib/auth";

const STAFF = ["ADMIN", "MANAGER", "RECEPTIONIST", "CONCIERGE"];

// Admin: đổi trạng thái booking (confirm/cancel/checkin/checkout)
export async function PATCH(req: NextRequest) {
  const s = await getSession();
  if (!s || !STAFF.includes(s.role)) return NextResponse.json({ error: "Cần quyền vận hành" }, { status: 403 });
  const { code, status } = await req.json().catch(() => ({}));
  if (!code || !status || !(await dbAvailable())) return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
  const allowed = ["CONFIRMED", "CANCELLED", "CHECKED_IN", "COMPLETED", "NO_SHOW"];
  if (!allowed.includes(status)) return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });
  const b = await prisma.booking.update({ where: { code }, data: { status } });
  return NextResponse.json({ ok: true, status: b.status });
}
