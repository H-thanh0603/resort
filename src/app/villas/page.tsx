import { VILLAS, vnd } from "@/lib/site";

export const metadata = { title: "Biệt thự — Aura Sanctuary" };

export default function VillasPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-16">
      <p className="label-uppercase text-[11px] text-bronze">Bộ sưu tập</p>
      <h1 className="font-display text-5xl mt-2">Biệt thự &amp; dinh thự</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {VILLAS.map((v) => (
          <article key={v.slug} className="card-lux overflow-hidden">
            <img src={v.image} alt={v.name} className="aspect-[16/10] w-full object-cover" />
            <div className="p-7">
              <p className="label-uppercase text-[10px] text-bronze">{v.category} • {v.area}m² • {v.bedrooms} PN</p>
              <h2 className="font-display text-2xl mt-2">{v.name}</h2>
              <p className="text-sm mt-2">{vnd(v.price)} / đêm</p>
              <a href={`/villas/${v.slug}`} className="btn-ghost inline-block mt-4 !py-2.5 !px-4">Xem chi tiết</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
