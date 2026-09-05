"use client";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

const QUOTES = [
  { q: "Thời gian như ngừng trôi. Từng chi tiết gỗ, từng cái cúi đầu của quản gia — hoàn toàn chinh phục tôi.", n: "Gia đình Hoàng Nam", r: "Hội viên Black • 6 lần lưu trú" },
  { q: "Hoàng hôn từ hồ vô cực nghẹt thở. Món ăn như tác phẩm mỹ thuật sống.", n: "Elena Rostova", r: "Condé Nast Traveller UK" },
  { q: "Tiệc cưới của chúng tôi giống giấc mơ cổ tích ngoài đời thực.", n: "Minh Triết & Thu An", r: "Cưới riêng tư • 12/2024" },
];

/** VOICES — lời chứng điện ảnh: quote khổng lồ tự xoay, nền xanh rừng sâu. */
export default function Voices() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = QUOTES[idx];

  return (
    <section className="grain relative overflow-hidden bg-[#12272c] py-28 text-[#f7f5f0] lg:py-40">
      <span className="font-display pointer-events-none absolute -top-10 left-4 select-none text-[34vw] leading-none text-white/[0.04] lg:text-[22vw]">
        ”
      </span>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#fedeb2]">Lời khen quốc tế</p>
          <p className="mt-6 text-[#c5a880] tracking-[0.4em]">★★★★★</p>
        </Reveal>
        <div key={idx} className="kenburns mt-8 min-h-[220px] sm:min-h-[190px]">
          <blockquote className="font-display text-2xl italic leading-[1.4] sm:text-4xl">
            “{cur.q}”
          </blockquote>
          <p className="mt-8 text-sm font-semibold">{cur.n}</p>
          <p className="label-uppercase mt-2 text-[10px] text-white/50">{cur.r}</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Quote ${i + 1}`}
              className={`h-1 transition-all duration-500 ${i === idx ? "w-12 bg-[#c5a880]" : "w-6 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
          Forbes ★★★★★ — Condé Nast Gold List 2024 — Michelin Keys
        </p>
      </div>
    </section>
  );
}
