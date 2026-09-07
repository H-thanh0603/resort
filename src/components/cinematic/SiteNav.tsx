"use client";
import { useEffect, useState } from "react";

/**
 * N6 newspaper masthead — issue line trên, wordmark giữa,
 * một rule đơn, không hàng link. Trang là một lá thư;
 * masthead là tiêu đề ấn phẩm của nó.
 * Knobs: issue-above · wordmark 2xl · rule single.
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-alabaster/90 backdrop-blur-xl" : "bg-alabaster"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-4 lg:px-12">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-inksoft">
          Thư từ Bãi Khem — Số 07, mùa khô 2026
        </p>
        <a href="/" className="font-display mt-1 block text-center text-2xl uppercase tracking-[0.12em]">
          Aura
        </a>
        <hr aria-hidden="true" className="mt-3 border-0 border-t hairline" />
      </div>
    </header>
  );
}
