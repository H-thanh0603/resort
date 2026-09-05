"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Khu nghỉ dưỡng", href: "/#place", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=70" },
  { label: "Biệt thự", href: "/#villas", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=70" },
  { label: "Trải nghiệm", href: "/#experiences", img: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=70" },
  { label: "Ẩm thực", href: "/#dining", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70" },
  { label: "Wellness", href: "/#wellness", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=70" },
  { label: "Bộ sưu tập", href: "/villas", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=70" },
  { label: "Đặt kỳ nghỉ", href: "/booking", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70" },
];

/** Navigation minimal: Logo | MENU — fullscreen menu editorial, đổi theo background. */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
        <div className="h-full bg-[#c5a880] transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled && !open ? "bg-[#f7f5f0]/85 text-[#161616] backdrop-blur-xl" : "bg-transparent text-[#f7f5f0]"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 lg:px-12">
          <a href="/" className="leading-none" data-cursor="Aura">
            <span className="font-display block text-lg uppercase tracking-[0.14em]">Aura</span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.32em] text-[#c5a880]">
              Sanctuary &amp; Retreats
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/booking"
              data-magnetic
              className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] underline-offset-8 hover:underline sm:block"
            >
              Đặt kỳ nghỉ
            </a>
            <button
              onClick={() => setOpen(!open)}
              data-cursor={open ? "Đóng" : "Menu"}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
            >
              {open ? "Đóng" : "Menu"}
              <span className="flex flex-col gap-[5px]">
                <span className={`h-px w-7 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`h-px w-7 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`h-px w-7 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#101010] text-[#f7f5f0] transition-all duration-700 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700"
          style={{
            backgroundImage: hoverImg ? `url(${hoverImg})` : "none",
            opacity: hoverImg ? 0.28 : 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        <nav className="relative flex h-full flex-col justify-center gap-1 px-8 lg:px-24">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setHoverImg(l.img)}
              onMouseLeave={() => setHoverImg(null)}
              className={`group flex items-baseline gap-5 transition-all duration-500 hover:pl-4 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="font-mono text-xs text-[#c5a880]">0{i + 1}</span>
              <span className="font-display text-[11vw] leading-[1.05] transition-colors group-hover:text-[#c5a880] sm:text-6xl lg:text-7xl">
                {l.label}
              </span>
            </a>
          ))}
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40">
            Bãi Khem, Phú Quốc — Concierge 24/7
          </p>
        </nav>
      </div>
    </>
  );
}
