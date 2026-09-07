"use client";
import { useEffect, useState } from "react";

/**
 * N9 edge-aligned minimal — wordmark serif trái, một CTA phải,
 * khoảng trống giữa là thiết kế. Không hàng link, không menu:
 * trang là hành trình tuyến tính, các chương nối nhau in-flow.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-35 h-[2px]">
        <div className="h-full origin-left bg-champagne" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? "bg-alabaster/85 text-obsidian backdrop-blur-xl" : "bg-transparent text-alabaster"
        }`}
      >
        <div className="mx-auto flex min-h-[72px] items-center justify-between gap-6 px-5 py-4 lg:px-12">
          <a href="/" className="font-display text-lg uppercase leading-none tracking-[0.14em]">
            Aura
          </a>
          <a
            href="/booking"
            className="link-line whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            Đặt kỳ nghỉ →
          </a>
        </div>
      </header>
    </>
  );
}
