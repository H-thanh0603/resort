import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, dbAvailable } from "@/lib/db";
import { hashPassword, verifyPassword, signToken } from "@/lib/auth";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const regSchema = loginSchema.extend({ name: z.string().min(2), phone: z.string().optional() });

function cookie(token: string) {
  return `aura_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 86400}`;
}

export async function POST(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const body = await req.json().catch(() => null);
  if (!(await dbAvailable())) return NextResponse.json({ error: "Chưa kết nối database (chạy docker compose + seed)" }, { status: 503 });

  if (url.endsWith("/register")) {
    const p = regSchema.safeParse(body);
    if (!p.success) return NextResponse.json({ error: "Dữ liệu chưa đúng" }, { status: 400 });
    const exists = await prisma.user.findUnique({ where: { email: p.data.email } });
    if (exists) return NextResponse.json({ error: "Email đã tồn tại" }, { status: 409 });
    const u = await prisma.user.create({
      data: { email: p.data.email, name: p.data.name, phone: p.data.phone, passwordHash: await hashPassword(p.data.password) },
    });
    const token = await signToken({ id: u.id, email: u.email, name: u.name, role: u.role });
    const res = NextResponse.json({ id: u.id, email: u.email, name: u.name, role: u.role });
    res.headers.set("Set-Cookie", cookie(token));
    return res;
  }

  // login
  const p = loginSchema.safeParse(body);
  if (!p.success) return NextResponse.json({ error: "Dữ liệu chưa đúng" }, { status: 400 });
  const u = await prisma.user.findUnique({ where: { email: p.data.email } });
  if (!u || !(await verifyPassword(p.data.password, u.passwordHash)))
    return NextResponse.json({ error: "Sai email hoặc mật khẩu" }, { status: 401 });
  const token = await signToken({ id: u.id, email: u.email, name: u.name, role: u.role });
  const res = NextResponse.json({ id: u.id, email: u.email, name: u.name, role: u.role });
  res.headers.set("Set-Cookie", cookie(token));
  return res;
}
