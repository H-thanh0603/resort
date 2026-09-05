import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const s = await getSession();
  if (!s) return NextResponse.json({ user: null });
  return NextResponse.json({ user: s });
}

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", "aura_session=; Path=/; HttpOnly; Max-Age=0");
  return res;
}
