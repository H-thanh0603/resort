"use client";
import { useEffect, useRef, useState } from "react";

type Place = {
  id: string;
  name: string;
  line: string;
  desc: string;
  img: string;
  href: string;
};

const PLACES: Place[] = [
  { id: "villa", name: "The Villas", line: "Không gian riêng tư", desc: "Biệt thự vách đá và hướng biển, hồ bơi vô cực dát đá riêng biệt.", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=70", href: "/#villas" },
  { id: "beach", name: "Bãi biển", line: "100m cát trắng biệt lập", desc: "Bờ cát riêng, cấm tàu thương mại, hoàng hôn trực diện.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=70", href: "/#experiences" },
  { id: "pool", name: "Hồ bơi vô cực", line: "Tràn viền ra vịnh", desc: "Hồ bơi vô cực nhìn trọn vịnh san hô,Bar chìm phục vụ cả ngày.", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=70", href: "/#villas" },
  { id: "dining", name: "Nhà hàng", line: "Michelin Gastronomy", desc: "Bếp trưởng 2 sao, thực đơn 7 món dưới bầu trời ngàn sao.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=70", href: "/#dining" },
  { id: "spa", name: "The Spa", line: "Nơi cơ thể tìm lại nhịp điệu", desc: "12 phòng trị liệu, nghi thức sen hoàng cung bên biển.", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=70", href: "/#wellness" },
  { id: "bar", name: "Sunset Bar", line: "Champagne & Grand Cru", desc: "Hầm rượu EuroCave, vang ủ sồi và cigar hảo hạng.", img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1400&q=70", href: "/#dining" },
  { id: "marina", name: "Bến du thuyền", line: "Tiếp nhận đến 120ft", desc: "Catamaran túc trực, hải trình vịnh san hô bí mật.", img: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1400&q=70", href: "/#experiences" },
  { id: "garden", name: "Vườn nhiệt đới", line: "120ha rừng bảo tồn", desc: "Thiền hành, yoga bình minh giữa rừng nguyên sinh.", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=70", href: "/#wellness" },
];

/**
 * DISCOVER — danh mục editorial + panel ảnh sticky crossfade.
 * Hover/chạm để đổi, tự xoay cho tới khi người dùng tương tác.
 */
export default function Discover() {
  const [idx, setIdx] = useState(0);
  const touched = useRef(false);
  const cur = PLACES[idx];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!touched.current) setIdx((i) => (i + 1) % PLACES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const pick = (i: number) => {
    touched.current = true;
    setIdx(i);
  };

  return (
    <section className="bg-alabaster py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display display-lg max-w-3xl lg:col-span-7">
            Một bản đồ, tám thế giới.
          </h2>
          <p className="max-w-md font-light leading-[1.9] text-inksoft lg:col-span-5">
            Tám địa điểm, một triết lý: mỗi nơi là một nhịp thở khác nhau của cùng một kỳ nghỉ.
          </p>
        </div>
        <p className="tnum mt-8 flex flex-wrap gap-x-10 gap-y-2 border-t hairline pt-5 text-[11px] uppercase tracking-[0.24em] text-obsidian/45">
          <span>10.0245°N</span><span>104.0322°E</span><span>Bán đảo Nam</span>
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Danh mục */}
          <ul className="order-2 lg:order-1 lg:col-span-6">
            {PLACES.map((p, i) => {
              const on = i === idx;
              return (
                <li key={p.id} className="border-t hairline last:border-b">
                  <button
                    onMouseEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                    onClick={() => pick(i)}
                   
                    className="group flex w-full items-baseline gap-5 py-5 text-left transition-transform duration-500"
                    style={{ transform: on ? "translateX(12px)" : "none" }}
                  >
                    <span className={`text-xs transition-colors ${on ? "text-bronze" : "text-obsidian/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className={`font-display block text-3xl transition-colors duration-500 sm:text-4xl ${on ? "text-obsidian" : "text-obsidian/40 group-hover:text-obsidian/70"}`}>
                        {p.name}
                      </span>
                      <span
                        className="grid transition-[grid-template-rows,opacity] duration-500"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                      >
                        <span className="overflow-hidden">
                          <span className="block pb-1 pt-2 text-sm font-light text-inksoft">
                            <em className="text-bronze">{p.line}.</em> {p.desc}
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className={`transition-[transform,opacity,color] duration-500 ${on ? "translate-x-0 text-bronze opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panel ảnh sticky */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                {PLACES.map((p, i) => (
                  <img
                    key={p.id}
                    src={p.img}
                    alt={p.name}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="img-grade absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms]"
                    style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "scale(1)" : "scale(1.07)" }}
                  />
                ))}
                <div className="grade-warm absolute inset-0" />
              </div>
              <div key={cur.id} className="kenburns mt-4 flex items-start justify-between gap-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-obsidian/50">
                  {String(idx + 1).padStart(2, "0")} / {String(PLACES.length).padStart(2, "0")} — {cur.line}
                </p>
                <a href={cur.href} className="link-line shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
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
