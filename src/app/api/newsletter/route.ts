import { NextRequest, NextResponse } from "next/server";
import { prisma, dbAvailable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const isForm = req.headers.get("content-type")?.includes("form");
  const data = isForm ? Object.fromEntries((await req.formData()).entries()) : await req.json().catch(() => ({}));
  const email = String(data.email ?? "");
  if (!email.includes("@")) return NextResponse.json({ error: "Email chưa đúng" }, { status: 400 });
  if (await dbAvailable()) {
    await prisma.newsletterSub.upsert({ where: { email }, update: {}, create: { email } });
  }
  if (isForm) return NextResponse.redirect(new URL("/?subscribed=1", req.url));
  return NextResponse.json({ ok: true });
}
