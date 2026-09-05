"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VILLAS, SERVICES, vnd } from "@/lib/site";

export const dynamic = "force-dynamic";

type Item = { slug: string; name: string; pricePerNight: number; total: number; nights: number; availableUnits: number; available: boolean };

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-10">Đang tải...</div>}>
      <BookingInner />
    </Suspense>
  );
}

function BookingInner() {
  const sp = useSearchParams();
  const [checkIn, setCheckIn] = useState(sp.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(sp.get("checkOut") ?? "");
  const [guests, setGuests] = useState(Number(sp.get("guests") ?? 2));
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(sp.get("villa") ?? "");
  const [services, setServices] = useState<string[]>(sp.get("service") ? [sp.get("service")!] : []);
  const [form, setForm] = useState({ guestName: "", guestPhone: "", guestEmail: "", promoCode: "AURAVIP" });
  const [result, setResult] = useState<{ code: string; total: number; deposit: number } | null>(null);
  const [error, setError] = useState("");

  async function search() {
    if (!checkIn || !checkOut) { setError("Chọn ngày nhận và trả phòng"); return; }
    setLoading(true); setError("");
    try {
      const r = await fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Lỗi tìm phòng");
      setItems(j.items);
      if (j.items.length && !selected) setSelected(j.items[0].slug);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (checkIn && checkOut) search(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit() {
    setError("");
    try {
      const r = await fetch("/api/bookings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ villaSlug: selected, checkIn, checkOut, guests, ...form, serviceSlugs: services }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Đặt phòng thất bại");
      setResult(j);
    } catch (e) { setError((e as Error).message); }
  }

  const chosen = items.find((i) => i.slug === selected) ?? VILLAS.map((v) => ({ slug: v.slug, name: v.name, pricePerNight: v.price, total: 0, nights: 0, availableUnits: 0, available: true } as Item)).find((i) => i.slug === selected);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-14">
      <p className="label-uppercase text-[11px] text-[#8c6d46]">Đặt kỳ nghỉ</p>
      <h1 className="font-display text-5xl mt-2">Tìm phòng trống &amp; giữ chỗ</h1>

      <div className="card-lux p-6 mt-8 grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
        <label className="block"><span className="label-uppercase text-[10px]">Nhận phòng</span><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-lux" /></label>
        <label className="block"><span className="label-uppercase text-[10px]">Trả phòng</span><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-lux" /></label>
        <label className="block"><span className="label-uppercase text-[10px]">Khách</span><input type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="input-lux" /></label>
        <label className="block"><span className="label-uppercase text-[10px]">Mã ưu đãi</span><input value={form.promoCode} onChange={(e) => setForm({ ...form, promoCode: e.target.value })} className="input-lux uppercase" /></label>
        <button onClick={search} className="btn-lux rounded-lg">{loading ? "Đang tìm..." : "Tìm phòng"}</button>
      </div>
      {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3">{error}</p>}

      {items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <label key={i.slug} className={`card-lux p-5 flex items-center justify-between gap-4 cursor-pointer ${selected === i.slug ? "ring-2 ring-[#c5a880]" : ""} ${!i.available ? "opacity-50" : ""}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" checked={selected === i.slug} onChange={() => setSelected(i.slug)} disabled={!i.available} />
                  <span>
                    <b>{i.name}</b>
                    <span className="block text-xs text-[#444748]">{i.nights} đêm • còn {i.availableUnits} căn • {vnd(i.pricePerNight)}/đêm</span>
                  </span>
                </span>
                <b>{vnd(i.total)}</b>
              </label>
            ))}
            <div className="card-lux p-5">
              <p className="label-uppercase text-[10px] mb-3">Dịch vụ đính kèm</p>
              {SERVICES.map((s) => (
                <label key={s.slug} className="flex items-center justify-between py-2 border-t hairline text-sm">
                  <span className="flex items-center gap-2"><input type="checkbox" checked={services.includes(s.slug)} onChange={() => setServices(services.includes(s.slug) ? services.filter((x) => x !== s.slug) : [...services, s.slug])} />{s.name}</span>
                  <b>{vnd(s.price)}</b>
                </label>
              ))}
            </div>
          </div>
          <div className="card-lux p-6 h-fit space-y-3">
            <h2 className="font-display text-2xl">Thông tin khách</h2>
            <input placeholder="Họ tên *" value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} className="input-lux" />
            <input placeholder="Điện thoại *" value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} className="input-lux" />
            <input placeholder="Email *" value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} className="input-lux" />
            <button onClick={submit} disabled={!selected} className="btn-lux rounded-lg w-full">Giữ chỗ 15 phút — {chosen ? vnd(chosen.total) : ""}</button>
            <p className="text-xs text-[#444748]">Cọc 30% để xác nhận. Hủy linh hoạt đến 48h trước nhận phòng.</p>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8 bg-[#161616] text-white p-8 rounded-2xl">
          <h2 className="font-display text-3xl">Giữ chỗ thành công 🎉</h2>
          <p className="mt-2">Mã giữ chỗ: <b className="text-[#fedeb2]">{result.code}</b></p>
          <p>Tổng: <b>{vnd(result.total)}</b> • Cọc 30%: <b>{vnd(result.deposit)}</b></p>
          <div className="flex gap-3 mt-5">
            <a href={`/checkout?code=${result.code}`} className="bg-[#c5a880] text-black px-6 py-3 text-xs font-semibold tracking-widest uppercase">Thanh toán ngay</a>
            <button onClick={() => setResult(null)} className="border border-white/30 px-6 py-3 text-xs tracking-widest uppercase">Đặt thêm</button>
          </div>
        </div>
      )}
    </div>
  );
}
