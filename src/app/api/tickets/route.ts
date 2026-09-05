import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, dbAvailable } from "@/lib/db";

const ticketSchema = z.object({
  name: z.string().min(2), phone: z.string().min(6), email: z.string().email(),
  type: z.string().optional().default("GENERAL"), message: z.string().min(5),
});

export async function POST(req: NextRequest) {
  const isForm = req.headers.get("content-type")?.includes("form");
  const body = isForm ? Object.fromEntries((await req.formData()).entries()) : await req.json().catch(() => null);
  const p = ticketSchema.safeParse(body);
  if (!p.success) {
    if (isForm) return NextResponse.redirect(new URL("/#lien-he?error=1", req.url));
    return NextResponse.json({ error: "Dữ liệu chưa đúng" }, { status: 400 });
  }
  if (await dbAvailable()) {
    await prisma.conciergeTicket.create({ data: { ...p.data, nda: true } });
  }
  if (isForm) return NextResponse.redirect(new URL("/#lien-he?ok=1", req.url));
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  if (!(await dbAvailable())) return NextResponse.json({ items: [] });
  const items = await prisma.conciergeTicket.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ items });
}
