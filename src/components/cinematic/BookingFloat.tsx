"use client";
import { useState } from "react";
import { vnd } from "@/lib/site";

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
    <section id="dat-ky-nghi" className="grain relative bg-night py-28 text-alabaster lg:py-40">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display display-lg max-w-3xl lg:col-span-7">
            Bắt đầu kỳ nghỉ của bạn.
          </h2>
          <p className="max-w-md font-light leading-[1.9] text-alabaster/65 lg:col-span-5">
            Giá trực tiếp tốt nhất. Đón tiễn trực thăng. Hủy linh hoạt đến 48 giờ. Mã AURAVIP −10%.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-alabaster/15 pt-10 sm:grid-cols-4 sm:items-end">
          <label className="block">
            <span className="label-uppercase text-[10px] text-champagne">Nhận phòng</span>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-line [color-scheme:dark]" />
          </label>
          <label className="block">
            <span className="label-uppercase text-[10px] text-champagne">Trả phòng</span>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-line [color-scheme:dark]" />
          </label>
          <label className="block">
            <span className="label-uppercase text-[10px] text-champagne">Khách</span>
            <input type="number" min={1} max={8} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="input-line" />
          </label>
          <button onClick={check} className="btn-lux whitespace-nowrap !bg-alabaster !text-obsidian hover:!bg-white">
            {loading ? "Đang tìm..." : "Kiểm tra phòng →"}
          </button>
        </div>
        <div className="mt-6 min-h-[24px]">{error ? <p className="border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200">{error}</p> : null}</div>

        {searched && (
          <ul className="mt-6">
            {items.map((i, n) => (
              <li
                key={i.slug}
                className="group grid grid-cols-1 gap-3 border-t border-alabaster/12 py-7 transition-colors last:border-b hover:bg-alabaster/[0.03] sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <span className="text-xs text-champagne sm:col-span-1">{String(n + 1).padStart(2, "0")}</span>
                <span className="sm:col-span-6">
                  <span className="font-display block text-3xl sm:text-4xl">{i.name}</span>
                  <span className="tnum mt-2 block text-[11px] uppercase tracking-[0.22em] text-alabaster/45">
                    {i.nights} đêm • còn {i.availableUnits} căn • {vnd(i.pricePerNight)}/đêm
                  </span>
                </span>
                <span className="tnum font-display text-2xl sm:col-span-3 sm:text-right">{vnd(i.total)}</span>
                <span className="sm:col-span-2 sm:text-right">
                  {i.available ? (
                    <a
                      href={`/booking?villa=${i.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                      className="link-line text-[11px] font-semibold uppercase tracking-[0.22em] text-sand"
                     
                    >
                      Đặt kỳ nghỉ →
                    </a>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-alabaster/35">Hết phòng</span>
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
