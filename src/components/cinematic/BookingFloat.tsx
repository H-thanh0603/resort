"use client";
import { useState } from "react";
import { vnd } from "@/lib/site";
import { Reveal } from "./Reveal";

type Item = {
  slug: string;
  name: string;
  pricePerNight: number;
  total: number;
  nights: number;
  availableUnits: number;
  available: boolean;
};

/**
 * BOOKING — floating luxury interface.
 * Thu gọn: ngày + khách + CTA. Mở rộng: panel blur, villa + giá realtime.
 */
export default function BookingFloat() {
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function check() {
    if (!checkIn || !checkOut) {
      setError("Hãy chọn ngày nhận và trả phòng.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Không tìm được phòng");
      setItems(j.items);
      setOpen(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="dat-ky-nghi" className="relative bg-[#f7f5f0] px-5 py-24 lg:py-36">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Reserve your escape</p>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-6xl">
            Bắt đầu kỳ nghỉ
            <br />
            của bạn.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="card-lux mt-10 p-6 text-left sm:p-8" data-cursor="Đặt phòng">
            <div className="grid grid-cols-1 items-end gap-5 sm:grid-cols-4">
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Nhận phòng</span>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-lux" />
              </label>
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Trả phòng</span>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-lux" />
              </label>
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Khách</span>
                <input type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="input-lux" />
              </label>
              <button onClick={check} data-magnetic className="btn-lux">
                {loading ? "Đang tìm..." : "Kiểm tra phòng"}
              </button>
            </div>
            {error && <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <p className="mt-4 text-xs text-[#444748]">
              Giá trực tiếp tốt nhất • Đón tiễn trực thăng • Hủy linh hoạt 48h • Mã <b>AURAVIP -10%</b>
            </p>
          </div>
        </Reveal>

        {/* Panel mở rộng */}
        <div
          className={`grid transition-all duration-700 ${open && items.length ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 text-left">
              {items.map((i) => (
                <div
                  key={i.slug}
                  className={`flex flex-wrap items-center justify-between gap-4 border p-5 backdrop-blur-xl transition ${
                    i.available ? "border-[#c5a880]/40 bg-white/70" : "border-black/10 bg-white/40 opacity-60"
                  }`}
                >
                  <div>
                    <p className="font-display text-xl">{i.name}</p>
                    <p className="mt-1 text-xs text-[#444748]">
                      {i.nights} đêm • còn {i.availableUnits} căn • {vnd(i.pricePerNight)}/đêm
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">{vnd(i.total)}</p>
                    {i.available ? (
                      <a
                        href={`/booking?villa=${i.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                        className="btn-lux !px-5 !py-3"
                        data-cursor="Đặt ngay"
                      >
                        Đặt kỳ nghỉ
                      </a>
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-[#444748]">Hết phòng</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
