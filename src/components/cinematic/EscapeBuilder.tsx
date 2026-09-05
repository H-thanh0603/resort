"use client";
import { useEffect, useState } from "react";
import { VILLAS, vnd } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SceneHead } from "./Editorial";

type Moment = { slug: string; name: string; price: number; note: string };

const MOMENTS: Moment[] = [
  { slug: "michelin-beach-dinner", name: "Dạ tiệc ánh nến", price: 6800000, note: "7 món Michelin" },
  { slug: "sunset-catamaran", name: "Du thuyền hoàng hôn", price: 12500000, note: "Catamaran riêng" },
  { slug: "coral-diving", name: "Lặn san hô", price: 3900000, note: "Cùng chuyên gia" },
  { slug: "spa", name: "Liệu trình Lotus Spa", price: 2900000, note: "90 phút" },
  { slug: "stargazing", name: "Đêm sao", price: 1500000, note: "Đài quan sát riêng" },
];

const KEY = "aura-escape-v1";

/**
 * ESCAPE BUILDER — hiệu ứng Endowment: người dùng tự tay
 * composing kỳ nghỉ (villa + khoảnh khắc + số đêm) → thấy tổng giá
 * realtime → "Hành trình của bạn" → đặt một chạm.
 * Zeigarnik: lưu dở dang vào localStorage, mời quay lại tiếp tục.
 */
export default function EscapeBuilder() {
  const [villa, setVilla] = useState(VILLAS[0].slug);
  const [moments, setMoments] = useState<string[]>(["sunset-catamaran"]);
  const [nights, setNights] = useState(3);
  const [resumed, setResumed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.villa) setVilla(s.villa);
        if (Array.isArray(s.moments)) setMoments(s.moments);
        if (s.nights) setNights(s.nights);
        setResumed(true);
      }
    } catch {
      /* bỏ qua */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ villa, moments, nights }));
    } catch {
      /* bỏ qua */
    }
  }, [villa, moments, nights]);

  const toggle = (slug: string) =>
    setMoments((m) => (m.includes(slug) ? m.filter((x) => x !== slug) : [...m, slug]));

  const v = VILLAS.find((x) => x.slug === villa)!;
  const picked = MOMENTS.filter((m) => moments.includes(m.slug));
  const momentsTotal = picked.reduce((a, m) => a + m.price, 0);
  const stayTotal = v.price * nights;
  const total = stayTotal + momentsTotal;
  const link = `/booking?villa=${villa}&services=${moments.join(",")}`;

  return (
    <section id="atelier" className="bg-[#fbf9f4] py-32 lg:py-48">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <SceneHead
          no="08"
          label="Escape builder"
          title={<>Tự tay composing<br /><span className="italic text-[#8c6d46]">kỳ nghỉ của bạn.</span></>}
          lede="Ba bước. Giá minh bạch theo thời gian thực. Không tài khoản, không chờ đợi — hành trình thuộc về bạn ngay khi chạm."
          meta={["Giá thật", "Lưu tự động", "Đặt một chạm"]}
        />
        {resumed && (
          <Reveal delay={100}>
            <p className="mt-6 inline-block border border-[#c5a880]/50 bg-[#c5a880]/10 px-4 py-2 text-xs tracking-wide text-[#8c6d46]">
              ✦ Đã khôi phục hành trình bạn đang composing dở — tiếp tục nhé.
            </p>
          </Reveal>
        )}

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Bước 01 — Villa */}
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8c6d46]">01 — Chọn nơi ở</p>
            <ul className="mt-4">
              {VILLAS.map((x) => {
                const on = x.slug === villa;
                return (
                  <li key={x.slug} className="border-t hairline last:border-b">
                    <button
                      onClick={() => setVilla(x.slug)}
                      data-cursor={on ? "Đã chọn" : "Chọn"}
                      className="flex w-full items-center gap-5 py-4 text-left transition-all"
                      style={{ paddingLeft: on ? 8 : 0 }}
                    >
                      <img src={x.image} alt="" loading="lazy" className="img-grade h-16 w-24 shrink-0 object-cover" />
                      <span className="flex-1">
                        <span className={`font-display block text-2xl transition-colors ${on ? "" : "text-black/45"}`}>{x.name}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
                          {x.area}m² • {vnd(x.price)}/đêm
                        </span>
                      </span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-all ${
                          on ? "border-[#8c6d46] bg-[#161616] text-[#fedeb2]" : "border-black/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Bước 02 — Khoảnh khắc */}
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-[#8c6d46]">
              02 — Chọn khoảnh khắc <span className="text-black/40">(nhiều lựa chọn)</span>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {MOMENTS.map((m) => {
                const on = moments.includes(m.slug);
                return (
                  <button
                    key={m.slug}
                    onClick={() => toggle(m.slug)}
                    data-cursor={on ? "Bỏ chọn" : "Thêm"}
                    className={`border p-5 text-left transition-all duration-300 ${
                      on ? "border-[#161616] bg-[#161616] text-[#f7f5f0]" : "hairline border bg-white/60 hover:border-[#8c6d46]"
                    }`}
                  >
                    <span className="font-display block text-xl">{m.name}</span>
                    <span className={`mt-1 block text-xs ${on ? "text-white/60" : "text-black/50"}`}>{m.note}</span>
                    <span className={`mt-3 block font-mono text-xs tracking-wider ${on ? "text-[#fedeb2]" : "text-[#8c6d46]"}`}>
                      {m.price === 0 ? "Miễn phí" : `+ ${vnd(m.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Số đêm */}
            <div className="mt-10 flex items-center gap-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8c6d46]">03 — Số đêm</p>
              <div className="flex items-center gap-4">
                {[2, 3, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => setNights(d)}
                    className={`h-12 w-12 rounded-full border text-sm transition-all ${
                      nights === d ? "border-[#161616] bg-[#161616] text-white" : "hairline border text-black/60 hover:border-[#8c6d46]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tổng kết sticky — Peak: con số + CTA */}
          <div className="lg:col-span-5">
            <div className="bg-[#101010] p-8 text-[#f7f5f0] lg:sticky lg:top-28" data-cursor="Hành trình">
              <p className="label-uppercase text-[10px] text-[#c5a880]">Hành trình của bạn</p>
              <h3 className="font-display mt-3 text-3xl leading-tight">{v.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                {nights} đêm • {moments.length} khoảnh khắc
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/12 pt-5 text-sm">
                <li className="flex justify-between"><span className="text-white/65">Lưu trú {nights} đêm</span><span>{vnd(stayTotal)}</span></li>
                {picked.map((m) => (
                  <li key={m.slug} className="flex justify-between"><span className="text-white/65">{m.name}</span><span>{vnd(m.price)}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex items-baseline justify-between border-t border-white/12 pt-5">
                <span className="label-uppercase text-[10px] text-white/55">Tổng • cọc 30%</span>
                <span className="font-display text-4xl text-[#fedeb2]">{vnd(total)}</span>
              </div>
              <a href={link} data-magnetic data-cursor="Đặt ngay" className="btn-lux mt-7 w-full !bg-[#f7f5f0] !text-center !text-[#161616] hover:!bg-white">
                Đặt hành trình này →
              </a>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                Hủy linh hoạt 48h • Không cần tài khoản
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
