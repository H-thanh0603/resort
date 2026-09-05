"use client";
import { useState } from "react";
import { Counter, Reveal, Tilt, useInView } from "./Reveal";
import { SceneHead } from "./Editorial";
import { Motes, GodRays } from "./Atmosphere";

const TABS = [
  { id: "sang", label: "Bữa sáng", title: "Bình minh trên sundeck.", desc: "Trái cây vườn nhiệt đới, bánh mì men tự nhiên, cà phê rang mộc.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=70" },
  { id: "fine", label: "Fine Dining", title: "Hương vị của những điều tinh tế.", desc: "Thực đơn 7 món của bếp trưởng 2 sao Michelin.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=70" },
  { id: "beach", label: "Beach Dinner", title: "Dạ tiệc ánh nến bờ biển.", desc: "Cua hoàng đế, tôm hùm đá, bò Wagyu A5 giữa 99 ngọn nến.", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1800&q=70" },
  { id: "private", label: "Private Dining", title: "Đầu bếp của riêng bạn.", desc: "Bếp mở Michelin ngay tại villa, phục vụ tại bàn.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=70" },
];

/** DINING — luxury fashion magazine: ảnh cực lớn, tab editorial. */
export function Dining() {
  const [tab, setTab] = useState(TABS[1]);
  return (
    <section id="dining" className="bg-[#fbf9f4] py-32 lg:py-48">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <SceneHead
          no="06"
          label="Ẩm thực"
          title={<>Hương vị của<br /><span className="italic text-[#8c6d46]">những điều tinh tế.</span></>}
          lede="Từ bình minh trên sundeck đến dạ tiệc 99 ngọn nến — mỗi bữa ăn là một chương."
        />
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t)}
                data-cursor="Xem"
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  tab.id === t.id ? "bg-[#161616] text-[#f7f5f0]" : "bg-transparent text-[#444748] hover:bg-black/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="overflow-hidden lg:col-span-8" data-cursor="Thưởng thức">
            <Tilt max={3}>
              <div key={tab.id} className="kenburns relative aspect-[16/10] overflow-hidden">
                <img src={tab.img} alt={tab.title} className="img-grade h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
                <div className="grade-warm absolute inset-0" />
              </div>
            </Tilt>
          </div>
          <div key={`t-${tab.id}`} className="kenburns lg:col-span-4">
            <p className="label-uppercase text-[10px] text-[#8c6d46]">{tab.label}</p>
            <h3 className="font-display mt-2 text-3xl leading-tight">{tab.title}</h3>
            <p className="mt-3 font-light leading-relaxed text-[#444748]">{tab.desc}</p>
            <a href="/booking?service=michelin-beach-dinner" className="btn-lux mt-6" data-magnetic data-cursor="Đặt bàn">
              Đặt bàn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** WELLNESS — đổi atmosphere: nền tối, số animate. */
export function Wellness() {
  return (
    <section id="wellness" className="grain relative overflow-hidden bg-[#0d1517] py-28 text-[#f7f5f0] lg:py-40">
      <img
        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=60"
        alt=""
        loading="lazy"
        className="slow-drift absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1517] via-transparent to-[#0d1517]" />
      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#c5a880]">07</p>
          <p className="label-uppercase mt-3 text-[11px] text-[#fedeb2]">Wellness — chậm lại</p>
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-5xl leading-[1.1] sm:text-7xl">
            Hãy để thế giới
            <br />
            chờ bạn.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-light text-white/65">
            Triết lý chữa lành phương Đông ngàn năm cùng y học tái tạo Thụy Sĩ —
            yoga bình minh, suối khoáng Onsen, dinh dưỡng thải độc.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { to: 12, label: "phòng trị liệu" },
            { to: 4, label: "nghi thức trị liệu" },
            { to: 1, label: "không gian bên biển" },
          ].map((s) => (
            <Reveal key={s.label}>
              <p className="font-display text-7xl text-[#c5a880]">
                <Counter to={s.to} />
              </p>
              <p className="label-uppercase mt-2 text-[10px] text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <a href="/booking?service=spa" className="btn-light mt-12" data-magnetic data-cursor="Thư giãn">
            Tư vấn liệu trình
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** SUNSET MOMENT — hero moment thứ hai: video sóng biển + ánh hoàng hôn. */
export function SunsetMoment() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  return (
    <section ref={ref} className="grain-anim relative flex h-[110vh] items-center justify-center overflow-hidden bg-black text-white">
      <img
        src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2200&q=75"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.85 }}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={(e) => ((e.target as HTMLVideoElement).style.display = "none")}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: inView ? "scale(1)" : "scale(1.12)",
          transition: "transform 4s cubic-bezier(0.16,1,0.3,1)",
          opacity: 0.55,
        }}
      >
        <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      </video>
      {/* Ánh hoàng hôn phủ lên sóng biển */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#8c4a1f]/45 via-transparent to-[#1f363d]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      <GodRays />
      <Motes count={80} />
      {/* Letterbox khép lại khi cảnh tới */}
      <div
        className="absolute inset-x-0 top-0 z-10 bg-black transition-all duration-[1600ms]"
        style={{ height: inView ? "9vh" : "0vh" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 bg-black transition-all duration-[1600ms]"
        style={{ height: inView ? "9vh" : "0vh" }}
      />
      <div className="relative px-6 text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.4em] text-[#fedeb2] transition-all delay-300 duration-1000"
          style={{ opacity: inView ? 1 : 0 }}
        >
          Hoàng hôn / 18:42
        </p>
        <h2
          className="font-display mx-auto mt-6 max-w-3xl text-4xl leading-[1.2] transition-all delay-700 duration-[1400ms] sm:text-6xl"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", filter: inView ? "blur(0)" : "blur(10px)" }}
        >
          Có những khoảnh khắc
          <br />
          không cần được nói thành lời.
        </h2>
      </div>
    </section>
  );
}
