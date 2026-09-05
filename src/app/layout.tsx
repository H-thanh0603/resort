import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/cinematic/SiteNav";
import Cursor from "@/components/cinematic/Cursor";
import SmoothScroll from "@/components/cinematic/SmoothScroll";
import AmbientSound from "@/components/cinematic/AmbientSound";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Aura Sanctuary — Khu nghỉ dưỡng biển siêu sang",
  description:
    "Digital Luxury Journey: biệt thự hồ bơi vô cực, ẩm thực Michelin, spa sen, quản gia riêng 24/7 tại Phú Quốc.",
};

function Footer() {
  return (
    <footer className="bg-[#161616] text-[#f2f1ec]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl uppercase">Aura Resorts</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Bãi Khem, Phú Quốc — vịnh biển biệt lập, rừng bảo tồn 120ha, 3km bờ san hô.
            </p>
            <p className="mt-4 text-xs text-white/40">GPS 10.0245°N, 104.0322°E • Concierge 24/7</p>
          </div>
          <div>
            <p className="label-uppercase mb-4 text-[10px] text-[#c5a880]">Khám phá</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/#villas">Biệt thự &amp; phòng</a></li>
              <li><a href="/#experiences">Ẩm thực &amp; trải nghiệm</a></li>
              <li><a href="/#wellness">Spa &amp; trị liệu</a></li>
              <li><a href="/booking">Đặt phòng</a></li>
            </ul>
          </div>
          <div>
            <p className="label-uppercase mb-4 text-[10px] text-[#c5a880]">Hỗ trợ</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/booking">Chính sách hủy 48h</a></li>
              <li><a href="/#contact">Liên hệ quản gia</a></li>
              <li><a href="/admin">Dành cho vận hành</a></li>
            </ul>
          </div>
          <div>
            <p className="label-uppercase mb-4 text-[10px] text-[#c5a880]">Aura Journal</p>
            <form action="/api/newsletter" method="post" className="flex gap-2">
              <input name="email" type="email" required placeholder="Email của bạn" className="flex-1 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
              <button className="bg-[#c5a880] px-4 text-xs font-semibold uppercase tracking-widest text-black">Gửi</button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aura Sanctuary.
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
        <Cursor />
        <AmbientSound />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-center" toastOptions={{ style: { background: "#161616", color: "#f7f5f0", border: "1px solid rgba(197,168,128,.4)" } }} />
      </body>
    </html>
  );
}
