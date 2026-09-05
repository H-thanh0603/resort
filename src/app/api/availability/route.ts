import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAvailability } from "@/lib/availability";

const schema = z.object({
  checkIn: z.string().min(8),
  checkOut: z.string().min(8),
  guests: z.coerce.number().min(1).max(12).default(2),
});

export async function GET(req: NextRequest) {
  const q = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = schema.safeParse(q);
  if (!parsed.success) return NextResponse.json({ error: "Tham số không hợp lệ" }, { status: 400 });
  try {
    const items = await getAvailability(parsed.data.checkIn, parsed.data.checkOut, parsed.data.guests);
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
