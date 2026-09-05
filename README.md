# Aura Sanctuary — Resort Production App

Sản phẩm thật (không demo): web đặt phòng + vận hành khu nghỉ dưỡng, theo mẫu
`stitch_luxury_resort_website_design` (Quiet Luxury: Playfair Display + Plus Jakarta Sans,
Alabaster `#F7F5F0`, Obsidian `#161616`, Champagne `#C5A880`).

## Chạy production

```bash
docker compose up -d db
cp .env.example .env        # sửa DATABASE_URL, JWT_SECRET
npx prisma migrate dev
npm run seed                # admin: admin@aura.resort / Aura@123
npm run dev
```

Docker full: `docker build -t aura-resort . && docker run -p 3000:3000 --env-file .env aura-resort`

## Tính năng thật

- `/` homepage + booking widget, `/villas`, `/villas/[slug]`
- `/booking`: availability chống double-booking, giữ chỗ 15', promo `AURAVIP -10%`, dịch vụ đính kèm, cọc 30%
- `/checkout` + `/api/payments/vnpay`: VNPay sandbox HMAC-SHA512, fallback mock khi chưa cấu hình
- `/login`: JWT + bcrypt, RBAC (GUEST/MEMBER/CONCIERGE/RECEPTIONIST/MANAGER/ADMIN)
- `/admin`: doanh thu, occupancy, bookings, tickets VIP
- API: availability, bookings, reviews verified, tickets, newsletter

## Cấu hình VNPay thật

Điền `VNPAY_TMN_CODE`, `VNPAY_HASH_SECRET`, `VNPAY_URL`, `BASE_URL` trong `.env`.
