"use client";
import { Reveal } from "./Reveal";
import { SceneHead } from "./Editorial";

/** Tuyên ngôn editorial: drop-cap + cột meta, vượt thời gian thay vì trick. */
export default function Manifesto() {
  return (
    <section className="bg-[#f7f5f0] py-32 lg:py-48">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <SceneHead
            no="01"
            label="Tuyên ngôn"
            title={<>Chậm lại<br />để <span className="italic text-[#8c6d46]">cảm nhiều hơn.</span></>}
          />
          <Reveal delay={200}>
            <dl className="mt-12 space-y-5 font-mono text-[11px] uppercase tracking-[0.24em] text-black/45">
              <div className="flex justify-between border-t hairline pt-4"><dt>Vị trí</dt><dd className="text-black/70">Bãi Khem, Phú Quốc</dd></div>
              <div className="flex justify-between border-t hairline pt-4"><dt>Rừng bảo tồn</dt><dd className="text-black/70">120 ha</dd></div>
              <div className="flex justify-between border-t hairline pt-4"><dt>Vịnh riêng</dt><dd className="text-black/70">3 km</dd></div>
              <div className="flex justify-between border-y hairline py-4"><dt>Quản gia</dt><dd className="text-black/70">24 / 7</dd></div>
            </dl>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={120}>
            <p className="dropcap font-display text-[1.65rem] leading-[1.5] text-[#161616] sm:text-3xl sm:leading-[1.5]">
              Nơi đây, thời gian không trôi — nó lắng lại. Rừng thì thầm sau vách đá,
              biển thở chậm dưới chân villa, và bạn cuối cùng cũng nghe được chính mình.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-light leading-[1.9] text-[#444748]">
              Aura không xây thêm phòng — chúng tôi giữ lại khoảng trống. Mỗi biệt thự
              cách nhau một khoảng rừng, mỗi trải nghiệm cách nhau một khoảng lặng.
              Sang trọng, với chúng tôi, là đặc quyền của sự vắng mặt: vắng ồn ào,
              vắng vội vã, vắng những điều thừa thãi.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <a href="#place" data-cursor="Vào trong" className="link-line mt-10 inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8c6d46]">
              Vào trong khu nghỉ dưỡng →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
