"use client";

/** Tuyên ngôn — text-fold: drop-cap + cột số liệu, không kicker, không reveal. */
export default function Manifesto() {
  return (
    <section className="bg-alabaster py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 lg:grid-cols-12 lg:px-12">
        <h2 className="font-display display-lg max-w-3xl lg:col-span-7">
          Chậm lại để cảm nhiều hơn.
        </h2>
        <dl className="tnum grid content-start gap-0 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          <div className="flex justify-between border-t hairline py-4 text-[11px] uppercase tracking-[0.24em] text-obsidian/45"><dt>Vị trí</dt><dd className="text-obsidian/70">Bãi Khem, Phú Quốc</dd></div>
          <div className="flex justify-between border-t hairline py-4 text-[11px] uppercase tracking-[0.24em] text-obsidian/45"><dt>Rừng bảo tồn</dt><dd className="text-obsidian/70">120 ha</dd></div>
          <div className="flex justify-between border-t hairline py-4 text-[11px] uppercase tracking-[0.24em] text-obsidian/45"><dt>Vịnh riêng</dt><dd className="text-obsidian/70">3 km</dd></div>
          <div className="flex justify-between border-y hairline py-4 text-[11px] uppercase tracking-[0.24em] text-obsidian/45"><dt>Quản gia</dt><dd className="text-obsidian/70">24 / 7</dd></div>
        </dl>
        <p className="dropcap font-display max-w-3xl text-[1.65rem] leading-[1.5] text-obsidian sm:text-3xl lg:col-span-7">
          Nơi đây, thời gian không trôi — nó lắng lại. Rừng thì thầm sau vách đá,
          biển thở chậm dưới chân villa, và bạn cuối cùng cũng nghe được chính mình.
        </p>
        <div className="lg:col-span-5">
          <p className="max-w-2xl font-light leading-[1.9] text-inksoft">
            Aura không xây thêm phòng — chúng tôi giữ lại khoảng trống. Mỗi biệt thự
            cách nhau một khoảng rừng, mỗi trải nghiệm cách nhau một khoảng lặng.
            Sang trọng, với chúng tôi, là đặc quyền của sự vắng mặt: vắng ồn ào,
            vắng vội vã, vắng những điều thừa thãi.
          </p>
          <a href="#place" className="link-line mt-8 inline-block whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
            Vào trong khu nghỉ dưỡng →
          </a>
        </div>
      </div>
    </section>
  );
}
