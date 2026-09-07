import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/cinematic/SiteNav";
import SmoothScroll from "@/components/cinematic/SmoothScroll";
import AmbientSound from "@/components/cinematic/AmbientSound";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Aura Sanctuary — Khu nghỉ dưỡng biển siêu sang",
  description:
    "Digital Luxury Journey: biệt thự hồ bơi vô cực, ẩm thực Michelin, spa sen, quản gia riêng 24/7 tại Phú Quốc.",
};

/**
 * Ft5 statement meta — câu closing nằm ở trang; footer chỉ giữ
 * wordmark, ba link, newsletter gọn và một dòng colophon.
 */
function Footer() {
  return (
    <footer className="bg-night text-shell">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="flex flex-col gap-8 border-t border-alabaster/15 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.1em]">Aura</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-alabaster/45">
              Bãi Khem, Phú Quốc — 10.0245°N, 104.0322°E
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <a className="whitespace-nowrap hover:text-sand" href="/villas">Biệt thự</a>
            <a className="whitespace-nowrap hover:text-sand" href="/booking">Đặt phòng</a>
            <a className="whitespace-nowrap hover:text-sand" href="/admin">Vận hành</a>
          </nav>
          <form action="/api/newsletter" method="post" className="flex w-full max-w-xs items-center gap-2">
            <input name="email" type="email" required placeholder="Email nhận Aura Journal" className="h-11 min-w-0 flex-1 border-b border-alabaster/25 bg-transparent py-2 text-sm outline-none placeholder:text-alabaster/35 focus:border-champagne" />
            <button className="h-11 whitespace-nowrap px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">Gửi</button>
          </form>
        </div>
        <p className="border-t border-alabaster/10 py-5 text-[11px] uppercase tracking-[0.2em] text-alabaster/35">
          © {new Date().getFullYear()} Aura Sanctuary — Concierge 24/7
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <AmbientSound />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-center" toastOptions={{ style: { background: "#161616", color: "#f7f5f0", border: "1px solid rgba(197,168,128,.4)" } }} />
      </body>
    </html>
  );
}
