"use client";
import { Reveal, useSectionProgress } from "./Reveal";

const MOMENTS = [
  { n: "01", title: "Bữa tối riêng bên biển.", desc: "99 ngọn nến sen, 7 món Michelin, một bầu trời sao.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=70" },
  { n: "02", title: "Hoàng hôn trên du thuyền.", desc: "Catamaran lướt qua vịnh san hô, Dom Pérignon ướp lạnh.", img: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=2000&q=70" },
  { n: "03", title: "Một buổi sáng không báo thức.", desc: "Thức dậy cùng tiếng sóng, ăn sáng trên sundeck gỗ teak.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=70" },
  { n: "04", title: "Spa giữa thiên nhiên.", desc: "Sen tuyết và đá bazan ấm, giấc ngủ sâu nguyên khí.", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=70" },
  { n: "05", title: "Đêm dưới bầu trời đầy sao.", desc: "Đài quan sát riêng, kính thiên văn và trà thảo mộc.", img: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2000&q=70" },
];

/**
 * EXPERIENCES — vertical storytelling.
 * Mỗi khoảnh khắc thay toàn bộ background (crossfade + zoom),
 * text kể chuyện trên nền sticky.
 */
export default function Experiences() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const active = Math.min(MOMENTS.length - 1, Math.floor(progress * MOMENTS.length));

  return (
    <section id="experiences" ref={ref} className="relative bg-[#101010] text-white" style={{ height: `${(MOMENTS.length + 1) * 100}vh` }}>
      {/* Background sticky crossfade */}
      <div className="grain sticky top-0 h-screen overflow-hidden">
        {MOMENTS.map((m, i) => (
          <img
            key={m.n}
            src={m.img}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms]"
            style={{
              opacity: i === active ? 1 : 0,
              transform: `scale(${i === active ? 1 : 1.1})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      {/* Heading mở đầu */}
      <div className="absolute top-0 flex h-screen w-full items-center justify-center px-6 text-center">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#fedeb2]">Những khoảnh khắc</p>
          <h2 className="font-display mx-auto mt-4 max-w-4xl text-4xl leading-[1.15] sm:text-6xl">
            Kỳ nghỉ không được đo bằng ngày tháng.
          </h2>
          <p className="font-display mt-4 text-xl italic text-white/70 sm:text-2xl">
            Mà bằng những khoảnh khắc bạn nhớ mãi.
          </p>
        </Reveal>
      </div>

      {/* Từng moment */}
      <div className="absolute inset-x-0 top-[100vh]">
        {MOMENTS.map((m, i) => (
          <div key={m.n} className="flex h-screen items-center px-6 lg:px-24">
            <div
              className="max-w-xl transition-all duration-700"
              style={{ opacity: i === active - 1 ? 1 : 0.25, transform: `translateY(${(i - (active - 1)) * 20}px)` }}
            >
              <p className="font-display text-7xl text-[#c5a880]/80">{m.n}</p>
              <h3 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">{m.title}</h3>
              <p className="mt-4 font-light text-white/70">{m.desc}</p>
              <a href="/booking" data-cursor="Đặt" className="link-line mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fedeb2]">
                Đặt trải nghiệm →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
