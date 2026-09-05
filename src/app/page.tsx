"use client";
import { useEffect, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { Reveal, useSectionProgress } from "@/components/cinematic/Reveal";
import { SceneHead } from "@/components/cinematic/Editorial";
import Preloader from "@/components/cinematic/Preloader";
import Marquee from "@/components/cinematic/Marquee";
import Manifesto from "@/components/cinematic/Manifesto";
import EscapeBuilder from "@/components/cinematic/EscapeBuilder";
import { MistGate, Motes, LightLeak } from "@/components/cinematic/Atmosphere";
import Voices from "@/components/cinematic/Voices";
import VillaVoyage from "@/components/cinematic/VillaVoyage";
import Discover from "@/components/cinematic/Discover";
import Experiences from "@/components/cinematic/Experiences";
import { Dining, Wellness, SunsetMoment } from "@/components/cinematic/DiningWellness";
import BookingFloat from "@/components/cinematic/BookingFloat";

const ResortMapView = dynamic(() => import("@/components/cinematic/ResortMapView"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-[#e8e2d5] lg:h-96" />,
});

const SeaOfLight = dynamic(() => import("@/components/cinematic/SeaOfLight"), { ssr: false });

const HERO_IMG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=75";

/** 03. HERO — THE ARRIVAL: video cinematic, camera tiến vào, chữ reveal từng dòng. */
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
  const zoom = 1 + Math.min(0.22, y / 4500);
  const fade = Math.max(0, 1 - y / 650);

  const line = (delay: number) => ({
    display: "block",
    overflow: "hidden",
  });
  const inner = (delay: number): CSSProperties => ({
    display: "block",
    transform: ready ? "none" : "translateY(112%)",
    transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <section className="grain-anim relative flex h-[108vh] items-center justify-center overflow-hidden bg-[#101010] text-white">
      {/* Ảnh nền luôn có — video phủ lên khi tải được */}
      <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
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
          style={{ transform: `scale(${zoom}) translateY(${y * 0.1}px)`, willChange: "transform" }}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      {/* Vệt sáng hoàng hôn */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#8c6d46]/25 via-transparent to-[#1f363d]/30" />
      <LightLeak />
      <Motes count={70} />
      {/* Letterbox điện ảnh */}
      <div className="absolute inset-x-0 top-0 z-10 h-[7vh] bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[9vh] bg-gradient-to-t from-black/85 to-transparent" />

      {/* Chữ dọc hai bên */}
      <p className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50 lg:block">
        10.0245°N — 104.0322°E
      </p>
      <p className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50 lg:block">
        Est. Phú Quốc — Sanctuary
      </p>

      <div className="relative z-10 px-6 text-center" style={{ opacity: fade, transform: `translateY(${y * 0.22}px)` }}>
        <p
          className="label-uppercase text-[11px] tracking-[0.34em] text-[#fedeb2] transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          Khu nghỉ dưỡng — Phú Quốc
        </p>
        <h1 className="font-display display-xl mx-auto mt-6 max-w-6xl">
          <span style={line(0)}>
            <span style={inner(2100)}>Chạm vào thiên nhiên.</span>
          </span>
          <span style={line(0)}>
            <span style={inner(2250)} className="text-outline italic">
              Sống trong sự tinh tế.
            </span>
          </span>
        </h1>
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 transition-all delay-300 duration-1000"
          style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)" }}
        >
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
        className="absolute bottom-[10vh] left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: fade }}
        data-cursor="Cuộn"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/80">Kéo để khám phá</p>
        <p className="scroll-hint mt-2 text-xl text-[#c5a880]">↓</p>
      </a>
      <p
        className="absolute bottom-[10vh] left-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 lg:block"
        style={{ opacity: fade }}
      >
        Scene 01 — The Arrival
      </p>
      <p
        className="absolute bottom-[10vh] right-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 lg:block"
        style={{ opacity: fade }}
      >
        Phú Quốc — 2026
      </p>
    </section>
  );
}

/** 05. THE PLACE — khung ảnh nở + clip-path reveal, ảnh parallax ngược bên trong. */
function ThePlace() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const expand = Math.min(1, progress * 1.6);
  const width = 36 + expand * 64; // % viewport width
  const textOut = Math.max(0, 1 - progress * 2.2);
  const inset = (1 - expand) * 10;

  return (
    <section id="place" ref={ref} className="relative h-[220vh] bg-[#f7f5f0]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[13vh]" style={{ opacity: textOut }}>
          <div className="px-6 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#c5a880]">02</p>
            <p className="label-uppercase mt-3 text-[11px] text-[#8c6d46]">The Place</p>
            <h2 className="font-display mx-auto mt-4 max-w-4xl text-4xl leading-[1.12] sm:text-6xl">
              Một nơi được tạo ra
              <br />
              để bạn <span className="italic text-[#8c6d46]">quên đi thế giới.</span>
            </h2>
          </div>
        </div>
        <div
          className="relative overflow-hidden"
          data-cursor="The Place"
          style={{
            width: `${width}vw`,
            height: `${52 + expand * 34}vh`,
            clipPath: `inset(${inset}% ${inset * 1.4}% ${inset}% ${inset * 1.4}%)`,
            willChange: "width, height, clip-path",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=75"
            alt="Toàn cảnh Aura Sanctuary từ trên cao"
            loading="lazy"
            className="img-grade absolute inset-0 h-[120%] w-full object-cover"
            style={{ transform: `translateY(${(0.5 - progress) * 12}%) scale(${1.25 - expand * 0.25})`, willChange: "transform" }}
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

/** Dải gallery editorial bất đối xứng + grade đồng bộ, click fullscreen. */
function Gallery() {
  const shots = [
    { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=70", cap: "Bình minh trên đại dương.", big: true },
    { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=70", cap: "Hồ bơi vô cực.", big: false },
    { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=70", cap: "Tràn viền giữa rừng.", big: false },
    { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=70", cap: "Vườn nhiệt đới.", big: true },
  ];
  return (
    <section className="bg-[#fbf9f4] py-32 lg:py-48">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <SceneHead
          no="07"
          label="Bộ sưu tập"
          title={<>Nhìn qua<br /><span className="italic text-[#8c6d46]">khung hình.</span></>}
          meta={["04 khung hình", "Chạm để phóng to"]}
        />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12">
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
                  className="img-grade aspect-[16/10] w-full object-cover opacity-95 transition-all duration-[1500ms] group-hover:scale-105 group-hover:opacity-100"
                />
              </figure>
              <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                <span className="italic normal-case tracking-normal">{s.cap}</span>
                <span>0{i + 1} / 04</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Liên hệ concierge — bản đồ thật + form gạch chân tối giản, nối /api/tickets. */
function Contact() {
  return (
    <section id="contact" className="bg-[#f7f5f0] px-5 py-32 lg:py-40">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="overflow-hidden" data-cursor="Bản đồ">
            <ResortMapView />
          </div>
          <p className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-black/45">
            <span>Aura Sanctuary Bay — Bãi Khem</span>
            <span>10.0245°N, 104.0322°E</span>
          </p>
        </Reveal>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <SceneHead
            no="09"
            label="Kênh ưu tiên"
            title={<>Lời mời kỳ nghỉ<br /><span className="italic text-[#8c6d46]">riêng tư.</span></>}
            lede="Full buyout, tiệc cưới bí mật, hội nghị lãnh đạo — quản gia trưởng phản hồi trong 12 giờ, bảo mật danh tính tuyệt đối."
          />
          <Reveal delay={200}>
            <ul className="mt-8 space-y-3 border-t hairline pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-black/50">
              <li>✈ &nbsp;25 phút Rolls-Royce từ sân bay</li>
              <li>🚁 &nbsp;Bãi đáp trực thăng trong khuôn viên</li>
              <li>🛥 &nbsp;Bến du thuyền đến 120ft</li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <form action="/api/tickets" method="post" className="space-y-7 lg:pt-24">
            <input name="name" required placeholder="Họ tên *" className="input-lux !text-lg" />
            <div className="grid grid-cols-2 gap-6">
              <input name="phone" required placeholder="Điện thoại *" className="input-lux" />
              <input name="email" type="email" required placeholder="Email *" className="input-lux" />
            </div>
            <textarea name="message" rows={3} required placeholder="Yêu cầu đặc biệt..." className="input-lux" />
            <button className="btn-lux" data-magnetic data-cursor="Gửi">
              Gửi đến quản gia trưởng →
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
      <Preloader />
      <HeroArrival />
      <MistGate />
      <Marquee items={["Aura Sanctuary", "Phú Quốc", "Quiet Luxury", "Private Bay", "Michelin"]} />
      <Manifesto />
      <ThePlace />
      <VillaVoyage />
      <Marquee dark items={["Ocean Villa", "Canopy Sanctuary", "Presidential Estate", "Infinity Pool"]} />
      <Discover />
      <Experiences />
      <Dining />
      <Wellness />
      <SunsetMoment />
      <Voices />
      <Gallery />
      <EscapeBuilder />
      <BookingFloat />
      <section className="relative overflow-hidden bg-[#101010] px-6 pb-28 pt-4 text-center text-[#f7f5f0] lg:pb-40">
        <SeaOfLight />
        <div className="relative">
        <Reveal>
          <p className="label-uppercase text-[11px] tracking-[0.34em] text-[#c5a880]">Begin</p>
          <h2 className="font-display display-xl mx-auto mt-6 max-w-6xl">
            Kỳ nghỉ tiếp theo
            <br />
            <span className="italic text-[#fedeb2]">bắt đầu từ đây.</span>
          </h2>
          <a href="/booking" className="btn-lux mt-10 !bg-[#f7f5f0] !text-[#161616] hover:!bg-white" data-magnetic data-cursor="Đặt ngay">
            Đặt kỳ nghỉ
          </a>
        </Reveal>
        </div>
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
