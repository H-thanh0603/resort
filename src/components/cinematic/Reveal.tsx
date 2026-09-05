"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
};

/** Fade + rise + de-blur — chuyển động "đắt tiền", chậm và có chủ đích. */
export function Reveal({ children, delay = 0, y = 32, className = "", style }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        filter: inView ? "blur(0)" : "blur(8px)",
        transition:
          "opacity 1.1s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.1s ease",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type CounterProps = {
  to: number;
  pad?: number;
  duration?: number;
  className?: string;
};

/** Đếm số animate khi scroll tới — dùng cho Wellness stats. */
export function Counter({ to, pad = 2, duration = 1600, className = "" }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {String(val).padStart(pad, "0")}
    </span>
  );
}

/** Thẻ cảnh kiểu phim: "SCENE 03 — PRIVATE SPACES". */
export function SceneTag({
  no,
  title,
  light = false,
  className = "",
}: {
  no: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c5a880]">{no}</span>
      <span className={`h-px w-14 ${light ? "bg-white/30" : "bg-black/25"}`} />
      <span
        className={`text-[10px] font-semibold uppercase tracking-[0.4em] ${
          light ? "text-white/60" : "text-black/50"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

/** Nghiêng 3D nhẹ theo con trỏ — chỉ desktop, GPU transform. */
export function Tilt({ children, className = "", max = 5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const top = el.getBoundingClientRect().top;
      setProgress(Math.min(1, Math.max(0, -top / total)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, progress };
}
