"use client";
import { useCallback, useRef } from "react";
import { VILLAS, vnd } from "@/lib/site";
import { useSectionProgress } from "./Reveal";

/**
 * VILLAS — horizontal cinematic gallery.
 * Mỗi villa chiếm trọn viewport, chuyển cảnh bằng scroll dọc
 * (morph + crossfade + zoom nhẹ). Hỗ trợ drag, arrows, dots.
 */
export default function VillaVoyage() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const drag = useRef<{ y: number; scroll: number } | null>(null);
  const n = VILLAS.length;
  const active = Math.min(n - 1, Math.round(progress * (n - 1)));

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (total * i) / (n - 1), behavior: "smooth" });
    },
    [ref, n]
  );

  return (
    <section id="villas" ref={ref} className="relative h-[380vh] bg-[#101010] text-[#f7f5f0]">
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          drag.current = { y: e.clientY, scroll: window.scrollY };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          window.scrollTo(0, drag.current.scroll - (e.clientY - drag.current.y) * 2.2);
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        {/* Track trượt ngang theo tiến trình scroll */}
        <div
          className="flex h-full"
          style={{
            width: `${n * 100}vw`,
            transform: `translateX(-${progress * (n - 1) * 100}vw)`,
            willChange: "transform",
          }}
        >
          {VILLAS.map((v, i) => {
            const dist = Math.abs(progress * (n - 1) - i);
            const focus = Math.max(0, 1 - dist);
            return (
              <article key={v.slug} className="relative h-full w-screen shrink-0 overflow-hidden">
                {/* Số ma khổng lồ trôi ngược chiều — chiều sâu điện ảnh */}
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-6 right-4 z-10 select-none text-[38vw] leading-none text-white/[0.07] lg:text-[24vw]"
                  style={{ transform: `translateX(${dist * -60}px)` }}
                >
                  0{i + 1}
                </span>
                <img
                  src={v.image}
                  alt={v.name}
                  draggable={false}
                  className="img-grade absolute inset-0 h-full w-full select-none object-cover"
                  style={{
                    opacity: 0.35 + focus * 0.65,
                    transform: `translateX(${(progress * (n - 1) - i) * 70}px) scale(${1.12 - focus * 0.08})`,
                    filter: `blur(${(1 - focus) * 6}px)`,
                    willChange: "transform",
                  }}
                />
                <div className="grade-warm absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                <div
                  className="relative z-10 flex h-full max-w-[1440px] flex-col justify-end px-6 pb-28 lg:px-16"
                  style={{ opacity: 0.25 + focus * 0.75 }}
                >
                  <p className="label-uppercase text-[11px] text-[#fedeb2]">
                    0{i + 1} — {v.category}
                  </p>
                  <h3 className="font-display display-lg mt-3 max-w-4xl">
                    {v.name}
                  </h3>
                  <p className="mt-5 max-w-xl font-light leading-relaxed text-white/75">
                    {v.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-10 gap-y-2 border-t border-white/20 pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/65">
                    <span>{v.area} m²</span>
                    <span>{v.bedrooms} phòng ngủ</span>
                    <span>{v.guests} khách</span>
                    <span>{v.view}</span>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <span className="font-display text-2xl">
                      {vnd(v.price)} <span className="text-sm font-normal text-white/60">/ đêm</span>
                    </span>
                    <a href={`/booking?villa=${v.slug}`} data-cursor="Đặt ngay" data-magnetic className="btn-lux">
                      Đặt biệt thự
                    </a>
                    <a href={`/villas/${v.slug}`} className="btn-light" data-cursor="Xem">
                      Chi tiết
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Indicator 01 — 03 + arrows */}
        <div className="absolute inset-x-0 top-0 z-20 h-[2px] bg-white/10">
          <div className="h-full bg-[#c5a880]" style={{ width: `${((active + 1) / n) * 100}%` }} />
        </div>
        <div className="absolute left-6 top-24 z-20 lg:left-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c5a880]">Scene 03</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">
            Private Spaces — kéo để đi qua
          </p>
        </div>
        <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-16">
          <p className="font-mono text-sm tracking-[0.3em] text-white/70">
            0{active + 1} <span className="text-white/30">— 0{n}</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {VILLAS.map((v, i) => (
                <button
                  key={v.slug}
                  onClick={() => goTo(i)}
                  aria-label={v.name}
                  className={`h-1 transition-all duration-500 ${i === active ? "w-10 bg-[#c5a880]" : "w-5 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo(Math.max(0, active - 1))}
              data-cursor="Trước"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-[#c5a880] hover:text-[#c5a880]"
            >
              ←
            </button>
            <button
              onClick={() => goTo(Math.min(n - 1, active + 1))}
              data-cursor="Tiếp"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-[#c5a880] hover:text-[#c5a880]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
