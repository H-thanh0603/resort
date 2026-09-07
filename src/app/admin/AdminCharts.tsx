"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

type B = { status: string; total: number; createdAt: string | Date };

/** Dashboard charts (recharts): booking theo trạng thái + doanh thu 14 ngày. */
export default function AdminCharts({ items }: { items: B[] }) {
  const byStatus = Object.entries(
    items.reduce<Record<string, number>>((a, b) => {
      a[b.status] = (a[b.status] ?? 0) + 1;
      return a;
    }, {})
  ).map(([status, count]) => ({ status, count }));

  const byDayMap = new Map<string, number>();
  for (const b of items) {
    if (!["CONFIRMED", "CHECKED_IN", "COMPLETED"].includes(b.status)) continue;
    const d = new Date(b.createdAt).toISOString().slice(5, 10);
    byDayMap.set(d, (byDayMap.get(d) ?? 0) + b.total);
  }
  const byDay = [...byDayMap.entries()]
    .sort()
    .slice(-14)
    .map(([day, revenue]) => ({ day, revenue: Math.round(revenue / 1e6) }));

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="card-lux p-6">
        <p className="label-uppercase text-[10px] text-bronze">Booking theo trạng thái</p>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,22,22,.1)" />
              <XAxis dataKey="status" fontSize={10} />
              <YAxis fontSize={10} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8c6d46" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card-lux p-6">
        <p className="label-uppercase text-[10px] text-bronze">Doanh thu xác nhận (triệu ₫)</p>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,22,22,.1)" />
              <XAxis dataKey="day" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip formatter={(v) => [`${v} tr`, "Doanh thu"]} />
              <Area type="monotone" dataKey="revenue" stroke="#1f363d" fill="#c5a880" fillOpacity={0.45} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
