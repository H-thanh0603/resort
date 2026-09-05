"use client";
import { useSectionProgress } from "./Reveal";

const TEXT =
  "Nơi đây, thời gian không trôi — nó lắng lại. Rừng thì thầm, biển thở chậm, và bạn cuối cùng cũng nghe được chính mình.";

 /** Tuyên ngôn scroll-fill: chữ sáng dần theo từng bước cuộn, như lời dẫn phim. */
export default function Manifesto() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const words = TEXT.split(" ");
  const lit = Math.floor(progress * (words.length + 4));

  return (
    <section ref={ref} className="relative h-[260vh] bg-[#f7f5f0]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <p className="label-uppercase mb-8 text-[11px] text-[#8c6d46]">Tuyên ngôn</p>
          <p className="font-display text-3xl leading-[1.4] sm:text-5xl">
            {words.map((w, i) => (
              <span
                key={i}
                className="transition-opacity duration-300"
                style={{ opacity: i < lit ? 1 : 0.14 }}
              >
                {w}{" "}
              </span>
            ))}
          </p>
          <p
            className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8c6d46] transition-opacity duration-700"
            style={{ opacity: progress > 0.85 ? 1 : 0 }}
          >
            Aura Sanctuary — Phú Quốc
          </p>
        </div>
      </div>
    </section>
  );
}
