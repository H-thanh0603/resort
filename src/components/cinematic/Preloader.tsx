"use client";
import { useEffect, useState } from "react";

/** Màn mở phim: đếm 0→100, rèm kéo lên, chữ Aura reveal. */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1700;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        setTimeout(() => setGone(true), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (gone) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#101010] text-[#f7f5f0] transition-transform duration-[900ms]"
      style={{
        transform: done ? "translateY(-100%)" : "none",
        transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      <p className="label-uppercase text-[10px] tracking-[0.4em] text-[#c5a880]">Sanctuary &amp; Retreats</p>
      <h1 className="font-display mt-3 text-6xl tracking-[0.08em] sm:text-8xl">AURA</h1>
      <div className="mt-8 h-px w-56 bg-white/15">
        <div className="h-full bg-[#c5a880] transition-[width]" style={{ width: `${count}%` }} />
      </div>
      <p className="mt-4 font-mono text-xs tracking-[0.3em] text-white/50">{count}%</p>
    </div>
  );
}
