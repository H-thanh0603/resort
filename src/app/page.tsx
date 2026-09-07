"use client";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/cinematic/Preloader";
import VillaVoyage from "@/components/cinematic/VillaVoyage";
import EscapeBuilder from "@/components/cinematic/EscapeBuilder";
import BookingFloat from "@/components/cinematic/BookingFloat";

const ResortMapView = dynamic(() => import("@/components/cinematic/ResortMapView"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-mist lg:h-96" />,
});

function Plate({ src, caption, right }: { src: string; caption: string; right?: string }) {
  return (
    <figure className="my-14">
      <div className="overflow-hidden">
        <img src={src} alt={caption} loading="lazy" className="img-grade aspect-[16/9] w-full object-cover" />
      </div>
      <figcaption className="tnum mt-3 flex justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-black/45">
        <span>{caption}</span>
        {right && <span className="shrink-0">{right}</span>}
      </figcaption>
    </figure>
  );
}

function Sidenote({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute -right-56 top-1 hidden w-44 text-[11px] uppercase leading-relaxed tracking-[0.2em] text-black/40 xl:block">
      {children}
    </span>
  );
}

/**
 * Macrostructure 12 · Letter — một lá thư của quản gia trưởng,
 * cột hẹp, plates kèm chú thích, sign-off + P.S. Các block đặt
 * phòng là "kèm theo thư" (enclosures), giữ nguyên logic thật.
 */
function Letter() {
  return (
    <article className="mx-auto max-w-[62ch] px-5 pb-10 pt-36 lg:pt-44">
      <p className="tnum text-[11px] uppercase tracking-[0.3em] text-inksoft">
        Bãi Khem, đầu mùa khô
      </p>
      <p className="font-display mt-8 text-3xl">Gửi bạn,</p>

      <div className="mt-8 space-y-7 text-[1.1rem] font-light leading-[1.9] text-obsidian">
        <p className="relative">
          <Sidenote>06:12 — sương trên vịnh</Sidenote>
          Sáu giờ mười hai phút sáng, sương vẫn còn nằm trên mặt vịnh. Tôi đi bộ
          dọc con đường cát từ nhà chính xuống bãi biển, kiểm tra xem đêm qua
          sóng có mang gì vào bờ không. Thường thì không mang gì cả — vịnh này
          cấm tàu bè, nên buổi sáng ở đây nguyên vẹn như một căn phòng vừa dọn.
        </p>
        <p className="relative">
          <Sidenote>120 ha rừng giữ lại</Sidenote>
          Nơi này rộng một trăm hai mươi hecta rừng và ba cây số bờ biển, nhưng
          chúng tôi chỉ xây vài căn nhà, mỗi căn cách nhau một khoảng cây. Không
          phải vì không xây được thêm. Mà vì sang trọng, với chúng tôi, là đặc
          quyền của sự vắng mặt: vắng ồn ào, vắng vội vã, vắng những điều thừa thãi.
        </p>
      </div>

      <Plate
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=75"
        caption="Nhìn từ trên cao, mùa khô"
        right="10.02°N"
      />

      <div className="space-y-7 text-[1.1rem] font-light leading-[1.9] text-obsidian">
        <p className="relative">
          <Sidenote>Buổi sáng không báo thức</Sidenote>
          Buổi sáng ở đây không có báo thức. Bạn sẽ dậy vì tiếng sóng đổi nhịp,
          ăn sáng trên thềm gỗ teak trong khi sương tan dần trên mặt hồ bơi.
          Cà phê rang mộc, trái cây hái trong vườn. Không ai giục bạn làm gì tiếp theo.
        </p>
        <p>
          Chúng tôi có ba căn nhà hướng biển. Căn Oceanfront nhìn thẳng ra hoàng hôn.
          Căn Canopy nằm lọt trong tán cây cổ thụ, có bồn tắm khoáng ngoài trời.
          Còn dinh thự Presidential — bốn phòng ngủ, một trăm mét bãi cát riêng,
          và một chiếc du thuyền luôn trong tình trạng sẵn sàng nổ máy. Bạn có thể{" "}
          <a href="#villas" className="link-line whitespace-nowrap font-normal text-bronze">
            xem từng căn một
          </a>
          , ảnh chụp đúng như ngoài đời.
        </p>
        <p className="relative">
          <Sidenote>18:42 — hoàng hôn</Sidenote>
          Buổi tối thì tùy bạn. Có người chọn dạ tiệc bảy món dưới chín mươi chín
          ngọn nến. Có người ra khơi ngắm hoàng hôn với một ly champagne ướp lạnh.
          Có người chỉ ngâm mình trong suối khoáng nóng rồi ngủ một mạch tới sáng.
          Tôi đã chứng kiến cả ba kiểu, và cả ba đều đúng.
        </p>
      </div>

      <Plate
        src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2200&q=75"
        caption="18:42, vịnh cấm"
        right="Hoàng hôn"
      />

      <div className="space-y-7 text-[1.1rem] font-light leading-[1.9] text-obsidian">
        <p>
          Nếu bạn đến, bạn không cần mang gì nhiều. Báo cho tôi biết ngày giờ,
          chế độ ăn, và điều duy nhất bạn muốn tránh trong kỳ nghỉ này. Mọi thứ
          còn lại — đưa đón, thực đơn, liệu trình — đội của tôi lo trong vòng
          mười hai giờ kể từ lúc nhận thư hồi âm của bạn.
        </p>
      </div>

      <p aria-hidden="true" className="my-12 text-center tracking-[0.5em] text-black/30">
        * * *
      </p>

      <p className="font-display text-2xl leading-snug">
        Thân mến,
        <br />
        <span className="font-semibold">Isabella</span>
      </p>
      <p className="tnum mt-2 text-[11px] uppercase tracking-[0.24em] text-black/45">
        Quản gia trưởng — Aura Sanctuary
      </p>
      <p className="mt-8 border-t hairline pt-6 text-[1.05rem] font-light leading-[1.9]">
        P.S. Đặt trực tiếp với chúng tôi luôn rẻ nhất, hủy linh hoạt đến 48 giờ.
        Bạn có thể{" "}
        <a href="#dat-ky-nghi" className="link-line whitespace-nowrap font-normal text-bronze">
          giữ chỗ ngay cuối thư
        </a>
        .
      </p>
    </article>
  );
}

/** Hồi âm — bản đồ thật + form gạch chân, nối /api/tickets. */
function Contact() {
  return (
    <section id="contact" className="bg-alabaster px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-[62ch]">
        <h2 className="font-display display-lg">Viết thư hồi âm.</h2>
        <div className="mt-10 overflow-hidden">
          <ResortMapView />
        </div>
        <p className="tnum mt-3 flex justify-between text-[11px] uppercase tracking-[0.24em] text-black/45">
          <span>Bãi Khem</span>
          <span>10.0245°N, 104.0322°E</span>
        </p>
        <form action="/api/tickets" method="post" className="mt-10 space-y-7">
          <input name="name" required placeholder="Họ tên *" className="input-lux !text-lg" />
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <input name="phone" required placeholder="Điện thoại *" className="input-lux" />
            <input name="email" type="email" required placeholder="Email *" className="input-lux" />
          </div>
          <textarea name="message" rows={3} required placeholder="Ngày đi, chế độ ăn, điều bạn muốn tránh..." className="input-lux" />
          <button className="btn-lux whitespace-nowrap">
            Gửi cho Isabella →
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
      <Letter />
      <div className="mx-auto max-w-[62ch] px-5 pb-14">
        <p aria-hidden="true" className="mb-8 text-center tracking-[0.5em] text-black/30">
          * * *
        </p>
        <p className="text-[1.05rem] font-light leading-[1.9]">
          Kèm theo thư này, tôi gửi bạn ba thứ: các căn nhà để xem, một bảng tự
          composing kỳ nghỉ, và tờ giữ chỗ trực tiếp.
        </p>
      </div>
      <VillaVoyage />
      <EscapeBuilder />
      <BookingFloat />
      <Contact />
      <a
        href="#dat-ky-nghi"
        className="fixed bottom-4 left-4 right-4 z-20 whitespace-nowrap bg-obsidian py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-alabaster shadow-2xl md:hidden"
      >
        Đặt kỳ nghỉ →
      </a>
    </div>
  );
}
