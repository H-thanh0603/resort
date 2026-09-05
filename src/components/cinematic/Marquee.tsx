"use client";

/** Dải chữ chạy editorial — ngăn các cảnh như title phim. */
export default function Marquee({
  items,
  dark = false,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y py-5 ${
        dark ? "border-white/10 bg-[#101010] text-[#f7f5f0]" : "hairline border-y bg-[#f7f5f0] text-[#161616]"
      } ${className}`}
    >
      <div className="marquee-track flex w-max items-baseline gap-10 whitespace-nowrap pr-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-baseline gap-10">
            {row.map((t, i) => (
              <span key={`${half}-${i}`} className="flex items-baseline gap-10">
                <span className={`font-display text-2xl italic sm:text-3xl ${i % 2 ? "" : "not-italic font-semibold"}`}>
                  {t}
                </span>
                <span className="text-[#c5a880]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
