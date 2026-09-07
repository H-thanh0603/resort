"use client";
import { useEffect, useRef, type MutableRefObject } from "react";
import { useSectionProgress } from "./Reveal";

type OpenRef = MutableRefObject<number>;

/**
 * Sương mù canvas: ~30 quầng noise trôi ngang, mật độ đọc live
 * từ openRef (0 = mịt mù → 1 = tan hết). Vẽ ở độ phân giải thấp
 * + blur CSS nên rẻ GPU; tự dừng khi ra khỏi viewport.
 */
export function FogCanvas({
  openRef,
  dark = false,
  className = "",
}: {
  openRef: OpenRef;
  dark?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 220;
    const H = 124;
    canvas.width = W;
    canvas.height = H;

    const puffs = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 18 + Math.random() * 36,
      vx: 0.06 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      a: 0.05 + Math.random() * 0.09,
    }));

    let raf = 0;
    let running = false;
    let t = Math.random() * 10;

    const paint = () => {
      t += 0.008;
      const density = Math.max(0, 1 - openRef.current);
      ctx.clearRect(0, 0, W, H);
      if (density > 0.01) {
        for (const p of puffs) {
          p.x += p.vx;
          if (p.x - p.r > W) p.x = -p.r;
          const y = p.y + Math.sin(t * 2 + p.phase) * 4;
          const alpha = p.a * density;
          const g = ctx.createRadialGradient(p.x, y, 0, p.x, y, p.r);
          g.addColorStop(0, dark ? `rgba(8,12,14,${alpha})` : `rgba(247,245,240,${alpha})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.fillRect(p.x - p.r, y - p.r, p.r * 2, p.r * 2);
        }
      }
    };

    const loop = () => {
      if (!running) return;
      paint();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      paint(); // một khung tĩnh
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            loop();
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [openRef, dark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ filter: "blur(14px)", width: "100%", height: "100%" }}
    />
  );
}

/**
 * MIST GATE — hai bờ sương tách đôi + tan dần theo scroll,
 * hé lộ toàn cảnh vịnh bên dưới. Đặt ngay sau Hero.
 */
export function MistGate() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const openRef = useRef(0);
  const open = Math.min(1, progress * 1.3);
  openRef.current = open;
  const captionOut = Math.max(0, 1 - open * 1.5);

  return (
    <section ref={ref} className="relative h-[240vh] bg-night">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=75"
          alt="Vịnh Ngọc hiện ra sau màn sương"
          loading="lazy"
          className="img-grade absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `scale(${1.14 - open * 0.14})`,
            filter: `blur(${(1 - open) * 7}px)`,
            willChange: "transform, filter",
          }}
        />
        <div className="grade-warm absolute inset-0" />
        {/* Hai bờ sương tách đôi */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[58vw] bg-alabaster/85 blur-3xl"
          style={{ transform: `translateX(${-open * 46}vw)`, opacity: 1 - open * 0.35 }}
        />
        <div
          className="absolute bottom-0 right-0 top-0 w-[58vw] bg-alabaster/85 blur-3xl"
          style={{ transform: `translateX(${open * 46}vw)`, opacity: 1 - open * 0.35 }}
        />
        <FogCanvas openRef={openRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/30" style={{ opacity: open }} />

        <div
          className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-[12vh] text-left text-white lg:px-16"
          style={{ opacity: captionOut }}
        >
          <p className="text-[11px] uppercase tracking-[0.34em] text-sand">
            Màn sương — 06:12
          </p>
          <h2 className="font-display display-lg mt-4 max-w-4xl">
            Vén màn sương, vịnh hiện ra.
          </h2>
        </div>

        <div
          className="absolute bottom-8 left-0 right-0 mx-auto flex max-w-[1440px] items-center justify-between px-6 text-white lg:px-16"
          style={{ opacity: open }}
        >
          <p className="tnum text-[10px] uppercase tracking-[0.3em] text-alabaster/70">
            Vịnh Ngọc — sương tan
          </p>
          <a href="#place" className="link-line whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.24em] text-sand">
            Vào trong →
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Hạt sáng bay (Motes): bụi nắng/hơi biển lơ lửng, nhấp nháy nhẹ.
 * Phủ lên ảnh fullscreen để ảnh "có gì đó đang sống".
 */
export function Motes({
  count = 60,
  warm = true,
  className = "",
}: {
  count?: number;
  warm?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let t = Math.random() * 10;
    const parts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vy: 0.0004 + Math.random() * 0.0012,
      drift: Math.random() * Math.PI * 2,
      tw: 0.5 + Math.random() * 2,
    }));

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = canvas.width = Math.max(2, Math.floor((rect?.width ?? 300) / 2));
      h = canvas.height = Math.max(2, Math.floor((rect?.height ?? 300) / 2));
    };
    resize();

    const loop = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        const x = (p.x + Math.sin(t * 0.6 + p.drift) * 0.012) * w;
        const y = p.y * h;
        const a = 0.12 + 0.5 * Math.abs(Math.sin(t * p.tw + p.drift));
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = warm ? `rgba(255,236,200,${a.toFixed(3)})` : `rgba(205,225,230,${a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resize();
          if (!running) {
            running = true;
            loop();
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, warm]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

/** Vệt sáng quét (light leak) + tia nắng hoàng hôn — blend screen. */
export function LightLeak({ className = "" }: { className?: string }) {
  return <div className={`light-leak pointer-events-none absolute inset-0 ${className}`} />;
}

export function GodRays({ className = "" }: { className?: string }) {
  return <div className={`god-rays pointer-events-none absolute inset-0 ${className}`} />;
}
