import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma, dbAvailable } from "@/lib/db";

// Tạo link thanh toán VNPay thật (sandbox) hoặc mock khi chưa cấu hình
export async function POST(req: NextRequest) {
  const { bookingCode } = await req.json().catch(() => ({}));
  if (!bookingCode) return NextResponse.json({ error: "Thiếu mã booking" }, { status: 400 });

  if (!(await dbAvailable())) {
    return NextResponse.json({ payUrl: `/checkout?code=${bookingCode}&mock=1`, mode: "mock" });
  }
  const booking = await prisma.booking.findUnique({ where: { code: bookingCode } });
  if (!booking) return NextResponse.json({ error: "Không tìm thấy booking" }, { status: 404 });

  const tmn = process.env.VNPAY_TMN_CODE;
  const secret = process.env.VNPAY_HASH_SECRET;
  const base = process.env.VNPAY_URL;
  if (!tmn || !secret || !base) {
    await prisma.payment.create({ data: { bookingId: booking.id, provider: "MOCK", amount: booking.deposit, status: "PENDING" } });
    return NextResponse.json({ payUrl: `/checkout?code=${bookingCode}&mock=1`, mode: "mock" });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const params: Record<string, string> = {
    vnp_Version: "2.1.0", vnp_Command: "pay", vnp_TmnCode: tmn,
    vnp_Amount: String(Number(booking.deposit) * 100),
    vnp_CurrCode: "VND", vnp_TxnRef: booking.code,
    vnp_OrderInfo: ` coc phong ${booking.code}`,
    vnp_OrderType: "other", vnp_Locale: "vn",
    vnp_ReturnUrl: `${process.env.BASE_URL}/api/payments/vnpay/return`,
    vnp_IpAddr: ip, vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/[-:T]/g, ""),
  };
  const sorted = Object.keys(params).sort().map((k) => `${k}=${encodeURIComponent(params[k])}`).join("&");
  const hash = crypto.createHmac("sha512", secret).update(sorted).digest("hex");
  await prisma.payment.create({ data: { bookingId: booking.id, provider: "VNPAY", amount: booking.deposit, status: "PENDING", txnId: booking.code } });
  return NextResponse.json({ payUrl: `${base}?${sorted}&vnp_SecureHash=${hash}`, mode: "vnpay" });
}

// Return URL: xác minh chữ ký, confirm booking
export async function GET(req: NextRequest) {
  const q = Object.fromEntries(req.nextUrl.searchParams.entries());
  const secret = process.env.VNPAY_HASH_SECRET ?? "";
  const { vnp_SecureHash, ...rest } = q;
  const sorted = Object.keys(rest).sort().map((k) => `${k}=${encodeURIComponent(rest[k])}`).join("&");
  const ok = secret ? crypto.createHmac("sha512", secret).update(sorted).digest("hex") === vnp_SecureHash : true;
  const success = ok && (q.vnp_ResponseCode === "00" || !q.vnp_ResponseCode);

  if (await dbAvailable() && q.vnp_TxnRef && success) {
    const b = await prisma.booking.findUnique({ where: { code: q.vnp_TxnRef } });
    if (b) {
      await prisma.booking.update({ where: { id: b.id }, data: { status: "CONFIRMED" } });
      await prisma.payment.updateMany({ where: { bookingId: b.id }, data: { status: "SUCCESS" } });
    }
  }
  return NextResponse.redirect(`${process.env.BASE_URL ?? ""}/checkout?code=${q.vnp_TxnRef ?? ""}&paid=${success ? 1 : 0}`);
}
