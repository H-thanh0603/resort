import { notFound } from "next/navigation";
import { VILLAS, vnd } from "@/lib/site";

export default async function VillaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const villa = VILLAS.find((v) => v.slug === slug);
  if (!villa) return notFound();
  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-16">
      <p className="label-uppercase text-[11px] text-[#8c6d46]">{villa.category}</p>
      <h1 className="font-display text-5xl mt-2">{villa.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <img src={villa.image} alt={villa.name} className="w-full aspect-[16/11] object-cover" />
        <div>
          <p className="text-lg font-light">{villa.description}</p>
          <p className="mt-4 font-display text-3xl">{vnd(villa.price)} <span className="text-sm">/ đêm</span></p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <li>Diện tích: <b>{villa.area}m²</b></li>
            <li>Khách: <b>{villa.guests}</b></li>
            <li>Phòng ngủ: <b>{villa.bedrooms}</b></li>
            <li>View: <b>{villa.view}</b></li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm">
            {villa.amenities.map((a) => <li key={a}>◆ {a}</li>)}
          </ul>
          <div className="flex gap-3 mt-8">
            <a href={`/booking?villa=${villa.slug}`} className="btn-lux rounded">Đặt biệt thự này</a>
            <a href="/villas" className="btn-ghost">Quay lại</a>
          </div>
        </div>
      </div>
    </div>
  );
}
