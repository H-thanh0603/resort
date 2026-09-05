import { VILLAS, SERVICES, vnd } from "@/lib/site";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#161616] text-white">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Vịnh biển Aura Sanctuary"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pt-10 pb-16">
          <p className="label-uppercase text-[11px] text-[#fedeb2] mb-6">
            World&apos;s Leading Luxury Sanctuary 2024
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.15]">
            Nơi thiên nhiên gặp gỡ sang trọng bất tận
          </h1>
          <p className="mt-6 text-white/80 font-light text-lg max-w-2xl mx-auto">
            Ẩn dật nguyên bản tách biệt thế giới ồn ào. Quản gia riêng 24/7, kiến trúc vách đá
            đại dương và tĩnh lặng tuyệt đối.
          </p>
          <div className="mt-10 bg-[#fbf9f4]/95 backdrop-blur rounded-2xl p-5 text-left text-[#161616]">
            <form action="/booking" method="get" className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Nhận phòng</span>
                <input name="checkIn" type="date" required className="input-lux" />
              </label>
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Trả phòng</span>
                <input name="checkOut" type="date" required className="input-lux" />
              </label>
              <label className="block">
                <span className="label-uppercase text-[10px] text-[#8c6d46]">Khách</span>
                <input name="guests" type="number" min={1} max={8} defaultValue={2} className="input-lux" />
              </label>
              <button className="btn-lux rounded-lg">Tìm phòng trống</button>
            </form>
            <p className="mt-3 text-xs text-[#444748]">
              Đảm bảo giá trực tiếp tốt nhất • Đón tiễn trực thăng • Hủy linh hoạt đến 48h
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b hairline">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["100%", "Biệt thự biển tư nhân", "Hồ bơi vô cực riêng biệt"],
            ["24/7", "Quản gia riêng", "Chuẩn hoàng gia Thụy Sĩ"],
            ["3+", "Ẩm thực Michelin", "Nguyên liệu tự nhiên"],
            ["9.9", "Forbes Travel Guide", "Xuất sắc nhất Đông Nam Á"],
          ].map(([n, t, d]) => (
            <div key={t}>
              <p className="font-display text-4xl">{n}</p>
              <p className="label-uppercase text-[11px] text-[#8c6d46] mt-2">{t}</p>
              <p className="text-xs text-[#444748] mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VILLAS */}
      <section className="max-w-[1440px] mx-auto px-5 lg:px-12 py-24">
        <p className="label-uppercase text-[11px] text-[#8c6d46]">Bộ sưu tập biệt thự</p>
        <h2 className="font-display text-4xl mt-2">Nơi kiến trúc hòa cùng đại dương</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {VILLAS.map((v) => (
            <article key={v.slug} className="card-lux overflow-hidden group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-7">
                <p className="label-uppercase text-[10px] text-[#8c6d46]">{v.category}</p>
                <h3 className="font-display text-2xl mt-2">{v.name}</h3>
                <p className="text-sm text-[#444748] mt-2 line-clamp-2">{v.description}</p>
                <p className="mt-4 font-semibold">{vnd(v.price)} <span className="text-xs font-normal">/ đêm</span></p>
                <div className="flex gap-3 mt-5">
                  <a href={`/villas/${v.slug}`} className="btn-ghost !py-2.5 !px-4">Chi tiết</a>
                  <a href={`/booking?villa=${v.slug}`} className="btn-lux !py-2.5 !px-4 rounded">Đặt ngay</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="trai-nghiem" className="bg-[#f0eee9] border-y hairline">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-24">
          <p className="label-uppercase text-[11px] text-[#8c6d46] text-center">Hành trình độc bản</p>
          <h2 className="font-display text-4xl text-center mt-2">Ẩm thực &amp; trải nghiệm thượng lưu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {SERVICES.map((s) => (
              <article key={s.slug} className="card-lux overflow-hidden">
                <img src={s.image} alt={s.name} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <p className="label-uppercase text-[10px] text-[#8c6d46]">{s.category} • {s.duration}</p>
                  <h3 className="font-display text-xl mt-2">{s.name}</h3>
                  <p className="text-sm text-[#444748] mt-2">{s.description}</p>
                  <p className="mt-3 font-semibold">{vnd(s.price)}</p>
                  <a href={`/booking?service=${s.slug}`} className="inline-block mt-4 btn-lux !py-2.5 !px-4 rounded">Đặt trải nghiệm</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPA */}
      <section id="spa" className="max-w-[1440px] mx-auto px-5 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80" alt="Aura Lotus Spa" className="rounded-2xl shadow-2xl aspect-[16/11] object-cover" />
        <div>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Holistic Sanctuary</p>
          <h2 className="font-display text-4xl mt-2">Thanh lọc thân tâm trong tĩnh lặng</h2>
          <p className="text-[#444748] mt-4 font-light leading-relaxed">
            Aura Lotus Spa hòa quyện triết lý phương Đông và y học tái tạo Thụy Sĩ: yoga bình minh,
            suối khoáng Onsen, dinh dưỡng thải độc từ nông trại khép kín.
          </p>
          <a href="/booking?service=spa" className="btn-lux rounded inline-block mt-6">Tư vấn liệu trình</a>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="danh-gia" className="bg-white border-y hairline">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-24">
          <h2 className="font-display text-4xl text-center">Dấu ấn hoàn mỹ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              ["Gia đình Hoàng Nam", "Hội viên Black • 6 lần lưu trú", "Thời gian như ngừng trôi. Tỉ mỉ từng chi tiết gỗ và quản gia kín đáo."],
              ["Elena Rostova", "Condé Nast Traveller UK", "Hoàng hôn từ hồ vô cực nghẹt thở. Món ăn như tác phẩm mỹ thuật."],
              ["Minh Triết & Thu An", "Cưới riêng tư 12/2024", "Như cổ tích ngoài đời thực. Concierge lo từng cánh hoa sen."],
            ].map(([n, r, q]) => (
              <figure key={n} className="card-lux p-8">
                <p className="text-[#c5a880]">★★★★★</p>
                <blockquote className="font-display italic text-lg mt-4">“{q}”</blockquote>
                <figcaption className="mt-6 text-sm"><b>{n}</b><br /><span className="text-xs text-[#444748]">{r}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="lien-he" className="max-w-[1440px] mx-auto px-5 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Vị trí độc quyền</p>
          <h2 className="font-display text-4xl mt-2">Vịnh biển biệt lập Phú Quốc</h2>
          <p className="text-[#444748] mt-4">Mũi đất riêng, rừng mưa nhiệt đới, 3km vịnh san hô cấm tàu thương mại.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>✈ Sân bay quốc tế — 25 phút Rolls-Royce riêng</li>
            <li>🚁 Bãi đáp trực thăng trong khuôn viên</li>
            <li>🛥 Bến du thuyền đến 120ft</li>
          </ul>
        </div>
        <form action="/api/tickets" method="post" className="card-lux p-8 space-y-4">
          <h3 className="font-display text-2xl">Lời mời kỳ nghỉ riêng tư</h3>
          <input name="name" required placeholder="Họ tên *" className="input-lux" />
          <div className="grid grid-cols-2 gap-4">
            <input name="phone" required placeholder="Điện thoại *" className="input-lux" />
            <input name="email" type="email" required placeholder="Email *" className="input-lux" />
          </div>
          <textarea name="message" rows={3} placeholder="Yêu cầu đặc biệt..." className="input-lux" />
          <button className="btn-lux rounded-lg w-full">Gửi đến quản gia trưởng</button>
        </form>
      </section>
    </div>
  );
}
