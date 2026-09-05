"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: vòng tròn nhỏ, mở rộng + hiện chữ khi hover
 * vào [data-cursor="..."]. Chỉ desktop (pointer:fine), tôn trọng
 * prefers-reduced-motion. Có magnetic hút nhẹ vào CTA.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    document.documentElement.classList.add("has-cursor");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      const text = t?.getAttribute("data-cursor") ?? "";
      setLabel(text);
      setActive(!!t);
      // Magnetic hút nhẹ
      const mag = (e.target as HTMLElement).closest?.("[data-magnetic]") as HTMLElement | null;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        mag.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`;
      }
    };
    const onOut = (e: MouseEvent) => {
      const mag = (e.target as HTMLElement).closest?.("[data-magnetic]") as HTMLElement | null;
      if (mag) mag.style.transform = "";
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden [@media(pointer:fine)]:block"
      >
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#c5a880]" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden [@media(pointer:fine)]:block"
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#c5a880]/70 backdrop-blur-[2px] transition-all duration-300 ${
            active ? "h-20 w-20 bg-[#161616]/55" : "h-9 w-9 bg-transparent"
          }`}
        >
          {label && (
            <span className="px-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f7f5f0]">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
