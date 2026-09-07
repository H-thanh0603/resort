"use client";
import { useEffect, useState } from "react";
import { VILLAS, vnd } from "@/lib/site";

type Moment = { slug: string; name: string; price: number; note: string };

const MOMENTS: Moment[] = [
  { slug: "michelin-beach-dinner", name: "Dạ tiệc ánh nến", price: 6800000, note: "7 món Michelin" },
  { slug: "sunset-catamaran", name: "Du thuyền hoàng hôn", price: 12500000, note: "Catamaran riêng" },
  { slug: "coral-diving", name: "Lặn san hô", price: 3900000, note: "Cùng chuyên gia" },
  { slug: "spa", name: "Liệu trình Lotus Spa", price: 2900000, note: "90 phút" },
  { slug: "stargazing", name: "Đêm sao", price: 1500000, note: "Đài quan sát riêng" },
];

const KEY = "aura-escape-v1";

/**
 * ESCAPE BUILDER — hiệu ứng Endowment: người dùng tự tay
 * composing kỳ nghỉ (villa + khoảnh khắc + số đêm) → thấy tổng giá
 * realtime → "Hành trình của bạn" → đặt một chạm.
 * Zeigarnik: lưu dở dang vào localStorage, mời quay lại tiếp tục.
 */
export default function EscapeBuilder() {
  const [villa, setVilla] = useState(VILLAS[0].slug);
  const [moments, setMoments] = useState<string[]>(["sunset-catamaran"]);
  const [nights, setNights] = useState(3);
  const [resumed, setResumed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.villa) setVilla(s.villa);
        if (Array.isArray(s.moments)) setMoments(s.moments);
        if (s.nights) setNights(s.nights);
        setResumed(true);
      }
    } catch {
      /* bỏ qua */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ villa, moments, nights }));
    } catch {
      /* bỏ qua */
    }
  }, [villa, moments, nights]);

  const toggle = (slug: string) =>
    setMoments((m) => (m.includes(slug) ? m.filter((x) => x !== slug) : [...m, slug]));

  const v = VILLAS.find((x) => x.slug === villa)!;
  const picked = MOMENTS.filter((m) => moments.includes(m.slug));
  const momentsTotal = picked.reduce((a, m) => a + m.price, 0);
  const stayTotal = v.price * nights;
  const total = stayTotal + momentsTotal;
  const link = `/booking?villa=${villa}&services=${moments.join(",")}`;

  return (
    <section id="atelier" className="bg-surface py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display display-lg max-w-3xl lg:col-span-7">
            Tự tay composing kỳ nghỉ của bạn.
          </h2>
          <p className="max-w-md font-light leading-[1.9] text-inksoft lg:col-span-5">
            Ba bước. Giá minh bạch theo thời gian thực. Không tài khoản, không chờ đợi.
          </p>
        </div>
        <p className="tnum mt-8 flex flex-wrap gap-x-10 gap-y-2 border-t hairline pt-5 text-[11px] uppercase tracking-[0.24em] text-obsidian/45">
          <span>Giá thật</span><span>Lưu tự động</span><span>Đặt một chạm</span>
        </p>
        {resumed && (
          <p className="mt-6 inline-block border border-champagne/50 bg-champagne/10 px-4 py-2 text-xs tracking-wide text-obsidian">
            Đã khôi phục hành trình bạn đang composing dở — tiếp tục nhé.
          </p>
        )}

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Bước 01 — Villa */}
            <p className="text-[11px] uppercase tracking-[0.3em] text-bronze">01 — Chọn nơi ở</p>
            <ul className="mt-4">
              {VILLAS.map((x) => {
                const on = x.slug === villa;
                return (
                  <li key={x.slug} className="border-t hairline last:border-b">
                    <button
                      onClick={() => setVilla(x.slug)}
                     
                      className="flex w-full items-center gap-5 py-4 text-left transition-transform duration-300"
                      style={{ transform: on ? "translateX(8px)" : "none" }}
                    >
                      <img src={x.image} alt="" loading="lazy" className="img-grade h-16 w-24 shrink-0 object-cover" />
                      <span className="flex-1">
                        <span className={`font-display block text-2xl transition-colors ${on ? "" : "text-obsidian/45"}`}>{x.name}</span>
                        <span className="tnum text-[11px] uppercase tracking-[0.2em] text-obsidian/45">
                          {x.area}m² • {vnd(x.price)}/đêm
                        </span>
                      </span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-[background-color,color,border-color] duration-300 ${
                          on ? "border-bronze bg-obsidian text-sand" : "border-obsidian/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Bước 02 — Khoảnh khắc */}
            <p className="mt-12 text-[11px] uppercase tracking-[0.3em] text-bronze">
              02 — Chọn khoảnh khắc <span className="text-obsidian/40">(nhiều lựa chọn)</span>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {MOMENTS.map((m) => {
                const on = moments.includes(m.slug);
                return (
                  <button
                    key={m.slug}
                    onClick={() => toggle(m.slug)}
                   
                    className={`border p-5 text-left transition-[background-color,color,border-color] duration-300 ${
                      on ? "border-obsidian bg-obsidian text-alabaster" : "hairline border bg-alabaster/60 hover:border-bronze"
                    }`}
                  >
                    <span className="font-display block text-xl">{m.name}</span>
                    <span className={`mt-1 block text-xs ${on ? "text-alabaster/60" : "text-obsidian/50"}`}>{m.note}</span>
                    <span className={`mt-3 block text-xs tracking-wider ${on ? "text-sand" : "text-bronze"}`}>
                      {m.price === 0 ? "Miễn phí" : `+ ${vnd(m.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Số đêm */}
            <div className="mt-10 flex items-center gap-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-bronze">03 — Số đêm</p>
              <div className="flex items-center gap-4">
                {[2, 3, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => setNights(d)}
                    className={`h-12 w-12 rounded-full border text-sm transition-[background-color,color,border-color] duration-300 ${
                      nights === d ? "border-obsidian bg-obsidian text-white" : "hairline border text-obsidian/60 hover:border-bronze"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tổng kết sticky — Peak: con số + CTA */}
          <div className="lg:col-span-5">
            <div className="bg-night p-8 text-alabaster lg:sticky lg:top-28">
              <p className="label-uppercase text-[10px] text-champagne">Hành trình của bạn</p>
              <h3 className="font-display mt-3 text-3xl leading-tight">{v.name}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-alabaster/50">
                {nights} đêm • {moments.length} khoảnh khắc
              </p>
              <ul className="tnum mt-6 space-y-3 border-t border-alabaster/12 pt-5 text-sm">
                <li className="flex justify-between"><span className="text-alabaster/65">Lưu trú {nights} đêm</span><span>{vnd(stayTotal)}</span></li>
                {picked.map((m) => (
                  <li key={m.slug} className="flex justify-between"><span className="text-alabaster/65">{m.name}</span><span>{vnd(m.price)}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex items-baseline justify-between border-t border-alabaster/12 pt-5">
                <span className="label-uppercase text-[10px] text-alabaster/55">Tổng • cọc 30%</span>
                <span className="tnum font-display text-4xl text-sand">{vnd(total)}</span>
              </div>
              <a href={link} className="btn-lux mt-7 w-full whitespace-nowrap !bg-alabaster !text-center !text-obsidian hover:!bg-white">
                Đặt hành trình này →
              </a>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-alabaster/40">
                Hủy linh hoạt 48h • Không cần tài khoản
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
