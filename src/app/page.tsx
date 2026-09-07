"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/cinematic/Preloader";
import Manifesto from "@/components/cinematic/Manifesto";
import EscapeBuilder from "@/components/cinematic/EscapeBuilder";
import Voices from "@/components/cinematic/Voices";
import VillaVoyage from "@/components/cinematic/VillaVoyage";
import Discover from "@/components/cinematic/Discover";
import Experiences from "@/components/cinematic/Experiences";
import { Dining, Wellness, SunsetMoment } from "@/components/cinematic/DiningWellness";
import BookingFloat from "@/components/cinematic/BookingFloat";

const ResortMapView = dynamic(() => import("@/components/cinematic/ResortMapView"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-mist lg:h-96" />,
});

const SeaOfLight = dynamic(() => import("@/components/cinematic/SeaOfLight"), { ssr: false });

const HERO_IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=75";

/** HERO — photographic fold: ảnh full-bleed, caption góc dưới-trái, không centred display. */
function HeroArrival() {
  const [y, setY] = useState(0);
  const [ready, setReady] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setReady(true), 2000);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);
  const fade = Math.max(0, 1 - y / 650);

  return (
    <section className="grain relative flex h-[108vh] items-end overflow-hidden bg-night text-white">
      <img src={HERO_IMG} alt="" aria-hidden fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {videoOk && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_IMG}
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `translateY(${y * 0.1}px)`, willChange: "transform" }}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-ember/25 via-transparent to-seaslate/30" />
      <div className="absolute inset-x-0 top-0 z-10 h-[7vh] bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[9vh] bg-gradient-to-t from-black/85 to-transparent" />

      <p className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.4em] text-alabaster/50 lg:block">
        10.0245°N — 104.0322°E
      </p>

      <div
        className="relative z-10 w-full px-6 pb-[12vh] lg:px-16"
        style={{ opacity: fade, transform: `translateY(${y * 0.18}px)` }}
      >
        <p className="text-[11px] uppercase tracking-[0.34em] text-sand">
          Bãi Khem, Phú Quốc — 06:12
        </p>
        <h1
          className="font-display mt-4 max-w-4xl text-5xl leading-[1.04] transition-[opacity,transform] delay-300 duration-1000 sm:text-6xl lg:text-7xl"
          style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(26px)" }}
        >
          Chạm vào thiên nhiên.
          <br />
          <span className="text-sand">Sống trong sự tinh tế.</span>
        </h1>
        <a
          href="/booking"
          className="link-line mt-7 inline-block whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-sand transition-opacity delay-500 duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          Đặt kỳ nghỉ →
        </a>
      </div>
      <a
        href="#place"
        className="absolute bottom-[10vh] right-6 z-10 hidden text-right lg:block"
        style={{ opacity: fade }}
      >
        <p className="text-[10px] uppercase tracking-[0.34em] text-alabaster/70">Cuộn xuống</p>
        <p className="scroll-hint mt-2 text-xl text-champagne">↓</p>
      </a>
    </section>
  );
}

/** THE PLACE — photo-fold tĩnh + text-fold: ảnh làm việc, không motion không gian. */
function ThePlace() {
  return (
    <section id="place" className="bg-alabaster">
      <figure className="relative h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=75"
          alt="Toàn cảnh Aura Sanctuary từ trên cao"
          loading="lazy"
          className="img-grade absolute inset-0 h-full w-full object-cover"
        />
        <div className="grade-warm absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-white lg:left-16 lg:right-16">
          <span className="text-[11px] uppercase tracking-[0.3em]">
            Toàn cảnh bán đảo Nam — 10.02°N
          </span>
          <span className="hidden max-w-md text-right text-sm font-light text-alabaster/85 sm:block">
            120ha rừng bảo tồn · 3km vịnh san hô cấm hải trình
          </span>
        </figcaption>
      </figure>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 py-24 lg:grid-cols-12 lg:px-12 lg:py-36">
        <h2 className="font-display display-lg max-w-3xl lg:col-span-8">
          Một nơi được tạo ra để bạn quên đi thế giới.
        </h2>
        <p className="max-w-md self-end font-light leading-[1.9] text-inksoft lg:col-span-4">
          Kiến trúc tropical modernism nép mình sau vách đá granite —
          mỗi biệt thự cách nhau một khoảng rừng.
        </p>
      </div>
    </section>
  );
}

/** Dải gallery editorial bất đối xứng + grade đồng bộ, click fullscreen. */
function Gallery() {
  const shots = [
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=70", cap: "Bình minh trên đại dương.", big: true },
    { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=70", cap: "Hồ bơi vô cực.", big: false },
    { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=70", cap: "Tràn viền giữa rừng.", big: false },
    { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=70", cap: "Vườn nhiệt đới.", big: true },
  ];
  return (
    <section className="bg-surface py-32 lg:py-44">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <h2 className="font-display display-lg max-w-3xl">Nhìn qua khung hình.</h2>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-12">
          {shots.map((s, i) => (
            <div key={s.src} className={s.big ? "sm:col-span-7" : "sm:col-span-5"}>
              <figure className="group overflow-hidden bg-black">
                <img
                  src={s.src}
                  alt={s.cap}
                  loading="lazy"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    if (document.fullscreenElement) document.exitFullscreen();
                    else el.requestFullscreen?.().catch(() => {});
                  }}
                  className="img-grade aspect-[16/10] w-full object-cover opacity-95 transition-[opacity,transform] duration-[1500ms] group-hover:opacity-100"
                />
              </figure>
              <figcaption className="tnum mt-3 flex justify-between text-[11px] uppercase tracking-[0.2em] text-obsidian/45">
                <span className="italic normal-case tracking-normal">{s.cap}</span>
                <span>0{i + 1} / 04</span>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Liên hệ concierge — bản đồ thật + form gạch chân tối giản, nối /api/tickets. */
function Contact() {
  return (
    <section id="contact" className="bg-alabaster px-5 py-32 lg:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="overflow-hidden">
          <ResortMapView />
        </div>
        <p className="tnum mt-3 flex justify-between text-[11px] uppercase tracking-[0.24em] text-obsidian/45">
          <span>Aura Sanctuary Bay — Bãi Khem</span>
          <span>10.0245°N, 104.0322°E</span>
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display display-lg">
            Lời mời kỳ nghỉ riêng tư.
          </h2>
          <p className="mt-6 max-w-md font-light leading-[1.9] text-inksoft">
            Full buyout, tiệc cưới bí mật, hội nghị lãnh đạo — quản gia trưởng phản hồi
            trong 12 giờ, bảo mật danh tính tuyệt đối.
          </p>
          <ul className="tnum mt-8 space-y-3 border-t hairline pt-6 text-[11px] uppercase tracking-[0.22em] text-obsidian/50">
            <li>Sân bay — 25 phút Rolls-Royce</li>
            <li>Bãi đáp trực thăng — trong khuôn viên</li>
            <li>Bến du thuyền — đến 120ft</li>
          </ul>
        </div>
        <form action="/api/tickets" method="post" className="space-y-7 lg:pt-24">
          <input name="name" required placeholder="Họ tên *" className="input-lux !text-lg" />
          <div className="grid grid-cols-2 gap-6">
            <input name="phone" required placeholder="Điện thoại *" className="input-lux" />
            <input name="email" type="email" required placeholder="Email *" className="input-lux" />
          </div>
          <textarea name="message" rows={3} required placeholder="Yêu cầu đặc biệt..." className="input-lux" />
          <button className="btn-lux">
            Gửi đến quản gia trưởng →
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-alabaster">
      <Preloader />
      <HeroArrival />
      <Manifesto />
      <ThePlace />
      <VillaVoyage />
      <Discover />
      <Experiences />
      <Dining />
      <Wellness />
      <SunsetMoment />
      <Voices />
      <Gallery />
      <EscapeBuilder />
      <BookingFloat />
      <section className="relative overflow-hidden bg-night px-6 pb-28 pt-20 text-alabaster lg:px-16 lg:pb-40">
        <SeaOfLight />
        <div className="relative max-w-6xl">
          <h2 className="font-display display-xl text-left">
            Kỳ nghỉ tiếp theo
            <br />
            <span className="text-sand">bắt đầu từ đây.</span>
          </h2>
          <a href="/booking" className="btn-lux mt-10 !bg-alabaster whitespace-nowrap !text-obsidian hover:!bg-white">
            Đặt kỳ nghỉ →
          </a>
        </div>
      </section>
      <Contact />
      {/* Sticky booking CTA — mobile */}
      <a
        href="#dat-ky-nghi"
        className="fixed bottom-4 left-4 right-4 z-20 whitespace-nowrap bg-obsidian py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-alabaster shadow-2xl md:hidden"
      >
        Đặt kỳ nghỉ →
      </a>
    </div>
  );
}
