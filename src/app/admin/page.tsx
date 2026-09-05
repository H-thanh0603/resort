import { prisma, dbAvailable } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminCharts from "./AdminCharts";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const s = await getSession();
  if (!s) redirect("/login");
  if (!["ADMIN", "MANAGER", "RECEPTIONIST", "CONCIERGE"].includes(s.role)) redirect("/booking");
  if (!(await dbAvailable())) {
    return (
      <div className="max-w-3xl mx-auto p-10">
        <h1 className="font-display text-4xl">Admin vận hành</h1>
        <p className="mt-4 bg-amber-50 border border-amber-200 p-4 text-sm">
          Chưa kết nối database. Chạy: <code>docker compose up -d db</code> → <code>cp .env.example .env</code> → <code>npx prisma migrate dev</code> → <code>npm run seed</code>
        </p>
      </div>
    );
  }
  const [bookings, tickets, revenue] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 30, include: { roomType: true } }),
    prisma.conciergeTicket.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.booking.aggregate({ _sum: { total: true }, where: { status: { in: ["CONFIRMED", "CHECKED_IN", "COMPLETED"] } } }),
  ]);
  const occupancy = await prisma.booking.count({ where: { status: { in: ["CONFIRMED", "CHECKED_IN"] } } });

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-12">
      <p className="label-uppercase text-[11px] text-[#8c6d46]">Vận hành • {s.name} ({s.role})</p>
      <h1 className="font-display text-5xl mt-2">Bảng điều hành</h1>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="card-lux p-6"><p className="label-uppercase text-[10px]">Doanh thu xác nhận</p><p className="font-display text-3xl mt-2">{Number(revenue._sum.total ?? 0).toLocaleString("vi-VN")}₫</p></div>
        <div className="card-lux p-6"><p className="label-uppercase text-[10px]">Booking hoạt động</p><p className="font-display text-3xl mt-2">{occupancy}</p></div>
        <div className="card-lux p-6"><p className="label-uppercase text-[10px]">Ticket VIP mới</p><p className="font-display text-3xl mt-2">{tickets.filter((t) => t.status === "NEW").length}</p></div>
      </div>

      <AdminCharts
        items={bookings.map((b) => ({ status: b.status, total: Number(b.total), createdAt: b.createdAt }))}
      />

      <h2 className="font-display text-3xl mt-12">Booking mới nhất</h2>      <div className="card-lux mt-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead><tr className="text-left border-b hairline text-xs uppercase tracking-wider text-[#444748]">
            <th className="p-3">Mã</th><th className="p-3">Villa</th><th className="p-3">Ngày</th><th className="p-3">Khách</th><th className="p-3">Tổng</th><th className="p-3">Trạng thái</th>
          </tr></thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hairline">
                <td className="p-3 font-mono text-xs">{b.code}</td>
                <td className="p-3">{b.roomType.name}</td>
                <td className="p-3 text-xs">{b.checkIn.toISOString().slice(0, 10)} → {b.checkOut.toISOString().slice(0, 10)}</td>
                <td className="p-3">{b.guestName}<br /><span className="text-xs">{b.guestPhone}</span></td>
                <td className="p-3">{Number(b.total).toLocaleString("vi-VN")}₫</td>
                <td className="p-3 text-xs font-semibold">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#444748] mt-3">Đổi trạng thái qua API: PATCH /api/admin/bookings {"{code, status: CONFIRMED|CHECKED_IN|COMPLETED|CANCELLED}"}</p>

      <h2 className="font-display text-3xl mt-12">Ticket concierge</h2>
      <div className="space-y-3 mt-4">
        {tickets.map((t) => (
          <div key={t.id} className="card-lux p-4 text-sm">
            <b>{t.name}</b> • {t.phone} • {t.email} • <span className="text-xs">{t.status}</span>
            <p className="text-[#444748] mt-1">{t.message}</p>
          </div>
        ))}
        {tickets.length === 0 && <p className="text-sm">Chưa có yêu cầu VIP.</p>}
      </div>
    </div>
  );
}
