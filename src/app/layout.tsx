import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Sanctuary — Khu nghỉ dưỡng biển sang trọng",
  description:
    "Khu ẩn dật biển nguyên bản: biệt thự hồ bơi vô cực, ẩm thực Michelin, spa sen, quản gia riêng 24/7.",
};

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/90 backdrop-blur-xl border-b hairline">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-20 flex items-center justify-between gap-4">
        <a href="/" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wider uppercase">Aura Resorts</span>
          <span className="label-uppercase text-[9px] text-[#8c6d46] mt-1">
            Sanctuary &amp; Retreats
          </span>
        </a>
        <nav className="hidden xl:flex items-center gap-8 label-uppercase text-[11px] text-[#444748]">
          <a className="hover:text-[#8c6d46]" href="/villas">Biệt thự</a>
          <a className="hover:text-[#8c6d46]" href="/#trai-nghiem">Trải nghiệm</a>
          <a className="hover:text-[#8c6d46]" href="/#spa">Spa</a>
          <a className="hover:text-[#8c6d46]" href="/#danh-gia">Đánh giá</a>
          <a className="hover:text-[#8c6d46]" href="/booking">Đặt phòng</a>
          <a className="hover:text-[#8c6d46]" href="/admin">Quản trị</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/booking" className="btn-lux !py-3 !px-5">Đặt kỳ nghỉ</a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#161616] text-[#f2f1ec] mt-24">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl uppercase">Aura Resorts</p>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            Bãi Khem, Phú Quốc — vịnh biển biệt lập, rừng bảo tồn 120ha, 3km bờ san hô.
          </p>
          <p className="text-xs text-white/40 mt-4">GPS 10.0245°N, 104.0322°E • Concierge 24/7</p>
        </div>
        <div>
          <p className="label-uppercase text-[10px] text-[#c5a880] mb-4">Khám phá</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="/villas">Biệt thự &amp; phòng</a></li>
            <li><a href="/#trai-nghiem">Ẩm thực &amp; trải nghiệm</a></li>
            <li><a href="/#spa">Spa &amp; trị liệu</a></li>
            <li><a href="/booking">Đặt phòng</a></li>
          </ul>
        </div>
        <div>
          <p className="label-uppercase text-[10px] text-[#c5a880] mb-4">Hỗ trợ</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="/booking">Chính sách hủy 48h</a></li>
            <li><a href="/#lien-he">Liên hệ quản gia</a></li>
            <li><a href="/admin">Dành cho vận hành</a></li>
          </ul>
        </div>
        <div>
          <p className="label-uppercase text-[10px] text-[#c5a880] mb-4">Aura Journal</p>
          <form action="/api/newsletter" method="post" className="flex gap-2">
            <input name="email" type="email" required placeholder="Email của bạn" className="flex-1 bg-white/10 px-4 py-3 text-sm placeholder:text-white/40 outline-none" />
            <button className="bg-[#c5a880] text-black px-4 text-xs font-semibold tracking-widest uppercase">Gửi</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aura Sanctuary. Sản phẩm thật — đặt phòng, thanh toán, vận hành.
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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
