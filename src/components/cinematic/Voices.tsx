"use client";
import { useEffect, useState } from "react";

const NOTES = [
  { t: "Buổi sáng không báo thức.", d: "Tiếng sóng thay chuông. Ăn sáng trên sundeck gỗ teak, chân trần." },
  { t: "Hoàng hôn đúng 18:42.", d: "Hồ vô cực chuyển màu đồng. Không ai nói gì trong mười phút." },
  { t: "Đêm đầu ngủ một mạch.", d: "Sen tuyết, đá bazan ấm, và sự im lặng tuyệt đối của vịnh cấm." },
];

/**
 * FIELD NOTES — ghi chép của nhà, không testimonial bịa đặt.
 * Ba mẩu quan sát xoay chậm, tạm dừng khi hover/focus.
 */
export default function Voices() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % NOTES.length), 7000);
    return () => clearInterval(t);
  }, [paused]);
  const cur = NOTES[idx];

  return (
    <section
      className="grain relative overflow-hidden bg-moss py-28 text-alabaster lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-4xl px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-champagne">Sổ tay khu nghỉ</p>
        <div key={idx} className="mt-8 min-h-[190px] sm:min-h-[160px]">
          <h2 className="font-display text-3xl leading-[1.25] sm:text-5xl">
            {cur.t}
          </h2>
          <p className="mt-5 max-w-xl font-light leading-relaxed text-alabaster/65">{cur.d}</p>
        </div>
        <div className="mt-10 flex items-center gap-3">
          {NOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ghi chép ${i + 1}`}
              className={`h-1 transition-[width,background-color] duration-500 ${i === idx ? "w-12 bg-champagne" : "w-6 bg-alabaster/25 hover:bg-alabaster/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
