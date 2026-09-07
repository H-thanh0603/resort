"use client";
import { useSectionProgress } from "./Reveal";

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

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const seg = (el.offsetHeight - window.innerHeight) / MOMENTS.length;
    window.scrollTo({ top: top + window.innerHeight * 0.6 + seg * i, behavior: "smooth" });
  };

  return (
    <section id="experiences" ref={ref} className="relative bg-night text-white" style={{ height: `${(MOMENTS.length + 1) * 100}vh` }}>
      {/* Background sticky crossfade */}
      <div className="grain sticky top-0 h-screen overflow-hidden">
        {MOMENTS.map((m, i) => (
          <img
            key={m.n}
            src={m.img}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="img-grade absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms]"
            style={{
              opacity: i === active ? 1 : 0,
              transform: `scale(${i === active ? 1 : 1.1})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-obsidian/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      </div>

      {/* Mở đầu — caption góc, không centred display */}
      <div className="absolute top-0 flex h-screen w-full items-end px-6 pb-[12vh] lg:px-24">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-sand">
            Những khoảnh khắc — 05 chương
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.1] sm:text-6xl">
            Kỳ nghỉ không được đo bằng ngày tháng.
          </h2>
        </div>
      </div>

      {/* Từng moment */}
      <div className="absolute inset-x-0 top-[100vh]">
        {MOMENTS.map((m, i) => (
          <div key={m.n} className="flex h-screen items-center px-6 lg:px-24">
            <div
              className="max-w-xl transition-[opacity,transform] duration-700"
              style={{ opacity: i === active - 1 ? 1 : 0.25, transform: `translateY(${(i - (active - 1)) * 20}px)` }}
            >
              <p className="tnum font-display text-7xl text-champagne/80">{m.n}</p>
              <h3 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">{m.title}</h3>
              <p className="mt-4 font-light text-alabaster/70">{m.desc}</p>
              <a href="/booking" className="link-line mt-6 inline-block whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">
                Đặt trải nghiệm →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Chapter rail — nhảy tới từng khoảnh khắc */}
      <div className="absolute right-5 top-[115vh] z-10 hidden flex-col gap-4 md:flex lg:right-10">
        {MOMENTS.map((m, i) => (
          <button
            key={m.n}
            onClick={() => goTo(i)}
            aria-label={`Khoảnh khắc ${m.n}`}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`text-[10px] tracking-[0.25em] transition-colors ${
                i === active - 1 ? "text-sand" : "text-alabaster/35 group-hover:text-alabaster/70"
              }`}
            >
              {m.n}
            </span>
            <span
              className={`h-8 w-px transition-[background-color] duration-500 ${
                i === active - 1 ? "bg-champagne" : "bg-alabaster/20 group-hover:bg-alabaster/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
