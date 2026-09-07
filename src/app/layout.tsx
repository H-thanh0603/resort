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
 * Ft6 letter close — khép trang như khép thư: lời chào,
 * một dòng P.S. hồi âm, rồi colophon một dòng.
 */
function Footer() {
  return (
    <footer className="bg-night text-shell">
      <div className="mx-auto max-w-[60ch] px-5 py-20 lg:py-28">
        <p className="font-display text-2xl leading-snug">
          Thân mến,
          <br />
          <span className="font-semibold">— Aura</span>
        </p>
        <form action="/api/newsletter" method="post" className="mt-8 flex items-center gap-3">
          <span className="whitespace-nowrap text-sm text-alabaster/60">P.S. Thư hồi âm:</span>
          <input name="email" type="email" required placeholder="email của bạn" className="h-11 min-w-0 flex-1 border-b border-alabaster/25 bg-transparent py-2 text-sm outline-none placeholder:text-alabaster/35 focus:border-champagne" />
          <button className="h-11 whitespace-nowrap px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">Gửi</button>
        </form>
        <p className="tnum mt-10 border-t border-alabaster/10 pt-5 text-[11px] uppercase leading-relaxed tracking-[0.2em] text-alabaster/35">
          Bãi Khem, Phú Quốc — 10.0245°N, 104.0322°E
          <br />
          <a className="hover:text-sand" href="/villas">Biệt thự</a>
          {" · "}
          <a className="hover:text-sand" href="/booking">Đặt phòng</a>
          {" · "}
          <a className="hover:text-sand" href="/admin">Vận hành</a>
          {" — © "}
          {new Date().getFullYear()} Aura Sanctuary
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
