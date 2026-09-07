"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10">Đang tải...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const sp = useSearchParams();
  const code = sp.get("code") ?? "";
  const paid = sp.get("paid") === "1";
  const mock = sp.get("mock") === "1";
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    const r = await fetch("/api/payments/vnpay", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingCode: code }),
    });
    const j = await r.json();
    setLoading(false);
    if (j.payUrl?.includes("mock") || j.mode === "mock") {
      window.location.href = `/checkout?code=${code}&mock=1`;
    } else if (j.payUrl) {
      setUrl(j.payUrl);
      window.location.href = j.payUrl;
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <p className="label-uppercase text-[11px] text-bronze">Thanh toán</p>
      <h1 className="font-display text-4xl mt-2">Xác nhận &amp; cọc 30%</h1>
      <div className="card-lux p-8 mt-6 space-y-4">
        <p>Mã giữ chỗ: <b>{code || "—"}</b></p>
        {paid && <p className="bg-green-50 border border-green-200 text-green-800 p-3 text-sm">Thanh toán thành công. Booking đã CONFIRMED. Mã QR check-in đã gửi email.</p>}
        {mock && !paid && (
          <div className="bg-amber-50 border border-amber-200 p-4 text-sm">
            <b>Chế độ sandbox nội bộ</b> (chưa cấu hình VNPay thật). Nhấn “Tôi đã chuyển khoản” để lễ tân xác nhận.
            <div className="mt-3 flex gap-2">
              <button onClick={() => (window.location.href = `/checkout?code=${code}&paid=1`)} className="btn-lux rounded !py-2.5 !px-4">Tôi đã chuyển khoản</button>
            </div>
          </div>
        )}
        {!paid && !mock && (
          <button onClick={pay} className="btn-lux rounded-lg w-full">{loading ? "Đang tạo link..." : "Thanh toán VNPay sandbox"}</button>
        )}
        {url && <p className="text-xs break-all">{url}</p>}
        <p className="text-xs text-inksoft">Cấu hình VNPAY_TMN_CODE + VNPAY_HASH_SECRET trong .env để chạy thanh toán thật.</p>
      </div>
    </div>
  );
}
