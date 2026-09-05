import { prisma } from "@/lib/db";
import { VILLAS, SERVICES } from "@/lib/site";

async function main() {
  const resort = await prisma.resort.upsert({
    where: { slug: "phu-quoc-sanctuary" },
    update: {},
    create: { slug: "phu-quoc-sanctuary", name: "Aura Sanctuary Bay", location: "Bãi Khem, Phú Quốc" },
  });

  for (const v of VILLAS) {
    const rt = await prisma.roomType.upsert({
      where: { slug: v.slug },
      update: { basePrice: v.price, name: v.name },
      create: {
        resortId: resort.id,
        slug: v.slug,
        name: v.name,
        category: v.category,
        area: v.area,
        maxGuests: v.guests,
        bedrooms: v.bedrooms,
        basePrice: v.price,
        description: v.description,
        image: v.image,
      },
    });
    for (let i = 1; i <= 3; i++) {
      await prisma.unit.upsert({
        where: { code: `${v.slug.toUpperCase().slice(0, 4)}-0${i}` },
        update: {},
        create: { roomTypeId: rt.id, code: `${v.slug.toUpperCase().slice(0, 4)}-0${i}` },
      });
    }
  }

  for (const s of SERVICES) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug, name: s.name, category: s.category,
        price: s.price, duration: s.duration, description: s.description, image: s.image,
      },
    });
  }
  await prisma.service.upsert({
    where: { slug: "spa" },
    update: {},
    create: {
      slug: "spa", name: "Liệu trình Lotus Spa 90 phút", category: "Spa",
      price: 2900000, duration: "90 phút", description: "Sen tuyết + đá bazan ấm.", image: "",
    },
  });

  await prisma.promotion.upsert({
    where: { code: "AURAVIP" },
    update: {},
    create: {
      code: "AURAVIP", percent: 10, minNights: 2,
      validFrom: new Date("2024-01-01"), validTo: new Date("2030-01-01"),
    },
  });

  const adminEmail = "admin@aura.resort";
  const bcrypt = await import("bcryptjs");
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail, name: "Quản trị Aura", role: "ADMIN",
      passwordHash: await bcrypt.hash("Aura@123", 10),
    },
  });

  console.log("Seed OK: admin@aura.resort / Aura@123");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
