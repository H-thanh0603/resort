"use client";
import { useState } from "react";
import { Reveal } from "./Reveal";

type POI = {
  id: string;
  x: number;
  y: number;
  name: string;
  line: string;
  desc: string;
  img: string;
  href: string;
};

const POIS: POI[] = [
  { id: "villa", x: 22, y: 30, name: "The Villas", line: "Không gian riêng tư", desc: "Biệt thự vách đá và hướng biển, hồ bơi vô cực riêng biệt.", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=70", href: "/#villas" },
  { id: "beach", x: 68, y: 62, name: "Bãi biển", line: "100m cát trắng biệt lập", desc: "Bờ cát riêng, không tàu thương mại, hoàng hôn trực diện.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70", href: "/#experiences" },
  { id: "pool", x: 40, y: 45, name: "Hồ bơi", line: "Vô cực tràn viền", desc: "Hồ bơi vô cực dát đá tự nhiên nhìn trọn vịnh.", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=70", href: "/#villas" },
  { id: "dining", x: 55, y: 35, name: "Nhà hàng", line: "Michelin Gastronomy", desc: "Bếp trưởng 2 sao, thực đơn 7 món dưới ngàn sao.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70", href: "/#dining" },
  { id: "spa", x: 30, y: 65, name: "The Spa", line: "Nơi cơ thể tìm lại nhịp điệu", desc: "12 phòng trị liệu, nghi thức sen hoàng cung bên biển.", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=70", href: "/#wellness" },
  { id: "bar", x: 60, y: 50, name: "Sunset Bar", line: "Champagne & Grand Cru", desc: "Hầm rượu EuroCave, cigar và vang ủ sồi hảo hạng.", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=70", href: "/#dining" },
  { id: "marina", x: 82, y: 40, name: "Bến du thuyền", line: "Đến 120ft", desc: "Catamaran túc trực, hải trình vịnh san hô bí mật.", img: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=70", href: "/#experiences" },
  { id: "garden", x: 15, y: 55, name: "Vườn nhiệt đới", line: "120ha rừng bảo tồn", desc: "Thiền hành, yoga bình minh giữa rừng nguyên sinh.", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=70", href: "/#wellness" },
];

/** DISCOVER THE RESORT — bản đồ minh họa tương tác, hover/click di camera tới điểm. */
export default function ResortMap() {
  const [active, setActive] = useState<POI>(POIS[4]);

  return (
    <section className="bg-[#f7f5f0] py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <Reveal>
          <p className="label-uppercase text-[11px] text-[#8c6d46]">Discover the resort</p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Một bản đồ,
            <br />
            tám thế giới.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Map minh họa */}
          <Reveal className="lg:col-span-7" delay={100}>
            <div className="relative aspect-[16/10] overflow-hidden bg-[#ece7dc]" data-cursor="Khám phá">
              <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path d="M-5,45 C15,38 25,48 40,42 C55,36 60,28 75,30 C90,32 95,22 105,25 L105,67 L-5,67 Z" fill="#1f363d" opacity="0.12" />
                <path d="M-5,45 C15,38 25,48 40,42 C55,36 60,28 75,30 C90,32 95,22 105,25" fill="none" stroke="#8c6d46" strokeWidth="0.4" opacity="0.6" />
                <path d="M5,15 C20,10 35,14 50,10 C65,6 80,10 95,7" fill="none" stroke="#1f363d" strokeWidth="0.25" opacity="0.3" />
                <path d="M10,25 C25,20 40,24 55,20" fill="none" stroke="#1f363d" strokeWidth="0.25" opacity="0.25" />
                <ellipse cx="50" cy="34" rx="46" ry="26" fill="none" stroke="#161616" strokeWidth="0.2" opacity="0.15" strokeDasharray="1.5 1.5" />
              </svg>
              {POIS.map((p) => (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(p)}
                  onClick={() => setActive(p)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={p.name}
                >
                  <span
                    className={`pulse-dot block rounded-full transition-all duration-300 ${
                      active.id === p.id ? "h-4 w-4 bg-[#8c6d46]" : "h-3 w-3 bg-[#161616]/60 group-hover:bg-[#8c6d46]"
                    }`}
                  />
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all ${
                      active.id === p.id ? "bg-[#161616] text-[#f7f5f0] opacity-100" : "bg-white/80 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
              <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#161616]/50">
                Bán đảo Nam — 10.0245°N
              </p>
            </div>
          </Reveal>

          {/* Panel thông tin — đổi theo điểm */}
          <div className="lg:col-span-5">
            <div key={active.id} className="kenburns relative h-full min-h-[320px] overflow-hidden bg-[#161616] text-white">
              <img src={active.img} alt={active.name} className="absolute inset-0 h-full w-full object-cover opacity-60" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <p className="label-uppercase text-[10px] text-[#fedeb2]">{active.line}</p>
                <h3 className="font-display mt-2 text-4xl">{active.name}</h3>
                <p className="mt-3 max-w-md font-light text-white/75">{active.desc}</p>
                <a href={active.href} className="link-line mt-5 inline-block w-fit text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fedeb2]">
                  Khám phá →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
