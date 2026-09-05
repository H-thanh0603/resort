"use client";
import { useEffect, useState } from "react";
import { Reveal, useSectionProgress } from "@/components/cinematic/Reveal";
import VillaVoyage from "@/components/cinematic/VillaVoyage";
import ResortMap from "@/components/cinematic/ResortMap";
import Experiences from "@/components/cinematic/Experiences";
import { Dining, Wellness, SunsetMoment } from "@/components/cinematic/DiningWellness";
import BookingFloat from "@/components/cinematic/BookingFloat";

const HERO_IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=75";

/** 03. HERO — THE ARRIVAL: fullscreen cinematic, scroll = camera tiến vào resort. */
function HeroArrival() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const zoom = 1 + Math.min(0.25, y / 4000);
  const fade = Math.max(0, 1 - y / 700);

  return (
    <section className="grain relative flex h-[108vh] items-center justify-center overflow-hidden bg-[#101010] text-white">
      <img
        src={HERO_IMG}
        alt="Aura Sanctuary — vịnh biển biệt lập"
        className="kenburns absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(${zoom}) translateY(${y * 0.12}px)`, willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
      <div className="relative z-10 px-6 text-center" style={{ opacity: fade, transform: `translateY(${y * 0.25}px)` }}>
        <p className="label-uppercase text-[11px] tracking-[0.34em] text-[#fedeb2]">Khu nghỉ dưỡng — Phú Quốc</p>
        <h1 className="font-display mx-auto mt-6 max-w-5xl text-[13vw] leading-[1.04] sm:text-7xl lg:text-8xl">
          Chạm vào thiên nhiên.
          <br />
          <span className="italic text-[#fedeb2]">Sống trong sự tinh tế.</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#place" className="btn-light" data-magnetic data-cursor="Khám phá">
            Khám phá khu nghỉ dưỡng
          </a>
          <a href="/booking" className="btn-lux !bg-[#f7f5f0] !text-[#161616] hover:!bg-white" data-magnetic data-cursor="Đặt ngay">
            Đặt kỳ nghỉ
          </a>
        </div>
      </div>
      <a
        href="#place"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: fade }}
        data-cursor="Cuộn"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/80">Kéo để khám phá</p>
        <p className="scroll-hint mt-2 text-xl text-[#c5a880]">↓</p>
      </a>
    </section>
  );
}

/** 05. THE PLACE — khung ảnh nở từ nhỏ → toàn màn hình khi scroll. */
function ThePlace() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const expand = Math.min(1, progress * 1.6);
  const width = 36 + expand * 64; // % viewport width
  const textOut = Math.max(0, 1 - progress * 2.2);

  return (
    <section id="place" ref={ref} className="relative h-[220vh] bg-[#f7f5f0]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[16vh]" style={{ opacity: textOut }}>
          <div className="px-6 text-center">
            <p className="label-uppercase text-[11px] text-[#8c6d46]">The Place</p>
            <h2 className="font-display mx-auto mt-4 max-w-4xl text-4xl leading-[1.12] sm:text-6xl">
              Một nơi được tạo ra
              <br />
              để bạn quên đi thế giới.
            </h2>
          </div>
        </div>
        <div
          className="relative overflow-hidden"
          data-cursor="The Place"
          style={{ width: `${width}vw`, height: `${52 + expand * 34}vh`, willChange: "width, height" }}
        >
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=75"
            alt="Toàn cảnh Aura Sanctuary từ trên cao"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: `scale(${1.25 - expand * 0.25})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" style={{ opacity: expand }} />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white" style={{ opacity: expand }}>
            <p className="max-w-md text-sm font-light text-white/85">
              120ha rừng bảo tồn • 3km vịnh san hô cấm hải trình • kiến trúc tropical modernism.
            </p>
            <p className="font-mono text-xs tracking-[0.3em] text-[#fedeb2]">10.02°N</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dải gallery editorial bất đối xứng — click fullscreen native. */
function Gallery() {
  const shots = [
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=70", cap: "Bình minh trên đại dương.", big: true },
    { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=70", cap: "Hồ bơi vô cực.", big: false },
    { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=70", cap: "Tràn viền giữa rừng.", big: false },
    { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=70", cap: "Vườn nhiệt đới.", big: true },
  ];
  return (
    <section className="bg-[#fbf9f4] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Bộ sưu tập</p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">Nhìn qua khung hình.</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-12">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 2) * 100} className={s.big ? "sm:col-span-7" : "sm:col-span-5"}>
              <figure className="group overflow-hidden bg-black" data-cursor="Xem">
                <img
                  src={s.src}
                  alt={s.cap}
                  loading="lazy"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if (document.fullscreenElement) document.exitFullscreen();
                    else el.requestFullscreen?.().catch(() => {});
                  }}
                  className="aspect-[16/10] w-full object-cover opacity-95 transition-all duration-[1500ms] group-hover:scale-105 group-hover:opacity-100"
                />
              </figure>
              <figcaption className="mt-3 flex justify-between text-xs text-[#444748]">
                <span className="italic">{s.cap}</span>
                <span className="font-mono">0{i + 1} / 04</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Liên hệ concierge — form thật nối /api/tickets. */
function Contact() {
  return (
    <section id="contact" className="bg-[#f7f5f0] px-5 pb-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Kênh ưu tiên</p>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Lời mời kỳ nghỉ
            <br />
            riêng tư.
          </h2>
          <p className="mt-4 max-w-md font-light text-[#444748]">
            Full buyout, tiệc cưới bí mật, hội nghị lãnh đạo — quản gia trưởng phản hồi trong 12 giờ,
            bảo mật danh tính tuyệt đối.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✈ 25 phút Rolls-Royce từ sân bay quốc tế</li>
            <li>🚁 Bãi đáp trực thăng trong khuôn viên</li>
            <li>🛥 Bến du thuyền đến 120ft</li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form action="/api/tickets" method="post" className="card-lux space-y-4 p-8">
            <input name="name" required placeholder="Họ tên *" className="input-lux" />
            <div className="grid grid-cols-2 gap-4">
              <input name="phone" required placeholder="Điện thoại *" className="input-lux" />
              <input name="email" type="email" required placeholder="Email *" className="input-lux" />
            </div>
            <textarea name="message" rows={3} required placeholder="Yêu cầu đặc biệt..." className="input-lux" />
            <button className="btn-lux w-full" data-magnetic data-cursor="Gửi">
              Gửi đến quản gia trưởng
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#f7f5f0]">
      <HeroArrival />
      <ThePlace />
      <VillaVoyage />
      <ResortMap />
      <Experiences />
      <Dining />
      <Wellness />
      <SunsetMoment />
      <Gallery />
      <BookingFloat />
      <section className="bg-[#f7f5f0] px-6 pb-24 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-4xl text-4xl leading-[1.15] sm:text-6xl">
            Kỳ nghỉ tiếp theo
            <br />
            có thể bắt đầu từ đây.
          </h2>
          <a href="/booking" className="btn-lux mt-8" data-magnetic data-cursor="Đặt ngay">
            Đặt kỳ nghỉ
          </a>
        </Reveal>
      </section>
      <Contact />
      {/* Sticky booking CTA — mobile */}
      <a
        href="#dat-ky-nghi"
        className="fixed bottom-4 left-4 right-4 z-[50] bg-[#161616] py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f7f5f0] shadow-2xl md:hidden"
      >
        Đặt kỳ nghỉ →
      </a>
    </div>
  );
}
