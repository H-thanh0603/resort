export type Villa = {
  slug: string;
  name: string;
  category: string;
  area: number;
  guests: number;
  bedrooms: number;
  price: number;
  view: string;
  tag?: string;
  image: string;
  description: string;
  amenities: string[];
};

export const RESORT = {
  name: "Aura Sanctuary Bay",
  location: "Bãi Khem, Phú Quốc",
  gps: "10.0245°N, 104.0322°E",
  phone: "+84 1800 8889",
};

export const VILLAS: Villa[] = [
  {
    slug: "oceanfront-sunset-pool-villa",
    name: "Oceanfront Sunset Pool Villa",
    category: "Oceanfront Signature",
    area: 380,
    guests: 3,
    bedrooms: 1,
    price: 28500000,
    view: "Hoàng hôn trực diện",
    tag: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
    description:
      "Bước ra từ phòng ngủ là bãi cát trắng mịn, hồ bơi vô cực 65m² ngắm hoàng hôn, quản gia riêng 24/7.",
    amenities: ["Hồ bơi vô cực 65m²", "01 King Master", "Quản gia riêng", "Bếp Michelin tại villa"],
  },
  {
    slug: "cliffside-canopy-sanctuary",
    name: "Cliffside Canopy Sanctuary",
    category: "Canopy Residence",
    area: 260,
    guests: 4,
    bedrooms: 2,
    price: 34200000,
    view: "Vách đá rừng nguyên sinh",
    tag: "Ẩn mình vách đá",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    description:
      "Trên vách đá rợp cây cổ thụ, bồn tắm khoáng Onsen ngoài trời và đài quan sát vịnh biển.",
    amenities: ["260m²", "02 phòng ngủ", "Bồn khoáng Onsen", "Ban công treo rừng"],
  },
  {
    slug: "presidential-beach-estate",
    name: "Presidential Beach Estate",
    category: "Grand Presidential",
    area: 950,
    guests: 8,
    bedrooms: 4,
    price: 88000000,
    view: "100m bãi biển biệt lập",
    tag: "VIP",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
    description:
      "Dinh thự 4 phòng ngủ lớn nhất, đầu bếp riêng, du thuyền Catamaran túc trực.",
    amenities: ["950m²", "4 Master Suites", "Du thuyền riêng", "Hầm rượu Grand Cru"],
  },
];

export type Service = {
  slug: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  image: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    slug: "michelin-beach-dinner",
    name: "Dạ tiệc ánh nến bờ biển",
    category: "Ẩm thực Michelin",
    price: 6800000,
    duration: "3.5 giờ",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    description: "Thực đơn 7 món của bếp trưởng 2 sao Michelin, vang Grand Cru dưới ngàn sao.",
  },
  {
    slug: "sunset-catamaran",
    name: "Du thuyền hoàng hôn riêng biệt",
    category: "Đại dương",
    price: 12500000,
    duration: "Khởi hành 16:30",
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=80",
    description: "Catamaran quanh vịnh san hô, Champagne Dom Pérignon và hàu Pháp.",
  },
  {
    slug: "coral-diving",
    name: "Lặn san hô cùng chuyên gia",
    category: "Sinh thái",
    price: 3900000,
    duration: "4 giờ",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description: "Rạn san hô bảo tồn nghiêm ngặt, ươm cấy san hô mang tên bạn.",
  },
];

export const vnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
