"use client";
import { useState } from "react";
import { vnd } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SceneHead } from "./Editorial";

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
 * BOOKING ATELIER — đặt phòng như một nghi thức, nền đêm mực.
 * Không hộp trắng: chữ khổng lồ, input gạch chân, kết quả là hàng editorial.
 */
export default function BookingFloat() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

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
      setSearched(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="dat-ky-nghi" className="grain relative bg-[#101010] py-32 text-[#f7f5f0] lg:py-48">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-12">
        <SceneHead
          light
          no="Final"
          label="Reserve your escape"
          title={<>Bắt đầu kỳ nghỉ<br /><span className="italic text-[#fedeb2]">của bạn.</span></>}
          lede="Giá trực tiếp tốt nhất. Đón tiễn trực thăng. Hủy linh hoạt đến 48 giờ. Mã AURAVIP −10%."
        />

        <Reveal delay={150}>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-4 sm:items-end" data-cursor="Đặt phòng">
            <label className="block">
              <span className="label-uppercase text-[10px] text-[#c5a880]">Nhận phòng</span>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-line [color-scheme:dark]" />
            </label>
            <label className="block">
              <span className="label-uppercase text-[10px] text-[#c5a880]">Trả phòng</span>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-line [color-scheme:dark]" />
            </label>
            <label className="block">
              <span className="label-uppercase text-[10px] text-[#c5a880]">Khách</span>
              <input type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="input-line" />
            </label>
            <button onClick={check} data-magnetic className="btn-lux !bg-[#f7f5f0] !text-[#161616] hover:!bg-white">
              {loading ? "Đang tìm..." : "Kiểm tra phòng →"}
            </button>
          </div>
          {error && <p className="mt-6 border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200">{error}</p>}
        </Reveal>

        {searched && (
          <ul className="mt-6">
            {items.map((i, n) => (
              <li
                key={i.slug}
                className="group grid grid-cols-1 gap-3 border-t border-white/12 py-7 transition-colors last:border-b hover:bg-white/[0.03] sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs text-[#c5a880] sm:col-span-1">{String(n + 1).padStart(2, "0")}</span>
                <span className="sm:col-span-6">
                  <span className="font-display block text-3xl sm:text-4xl">{i.name}</span>
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {i.nights} đêm • còn {i.availableUnits} căn • {vnd(i.pricePerNight)}/đêm
                  </span>
                </span>
                <span className="font-display text-2xl sm:col-span-3 sm:text-right">{vnd(i.total)}</span>
                <span className="sm:col-span-2 sm:text-right">
                  {i.available ? (
                    <a
                      href={`/booking?villa=${i.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                      className="link-line text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fedeb2]"
                      data-cursor="Đặt ngay"
                    >
                      Đặt kỳ nghỉ →
                    </a>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-white/35">Hết phòng</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
