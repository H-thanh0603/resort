"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const r = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "admin@aura.resort", password: "Aura@123", phone: "" });
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const j = await res.json();
    if (!res.ok) { setError(j.error); return; }
    r.push(j.role === "ADMIN" || j.role === "MANAGER" || j.role === "RECEPTIONIST" ? "/admin" : "/booking");
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <p className="label-uppercase text-[11px] text-[#8c6d46]">Aura Club</p>
      <h1 className="font-display text-4xl mt-2">{mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</h1>
      <div className="card-lux p-8 mt-6 space-y-4">
        {mode === "register" && (
          <>
            <input placeholder="Họ tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-lux" />
            <input placeholder="Điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-lux" />
          </>
        )}
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-lux" />
        <input placeholder="Mật khẩu" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-lux" />
        {error && <p className="text-sm text-red-700 bg-red-50 p-3 border border-red-200">{error}</p>}
        <button onClick={submit} className="btn-lux rounded-lg w-full">{mode === "login" ? "Đăng nhập" : "Đăng ký"}</button>
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-sm underline">
          {mode === "login" ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
        </button>
        <p className="text-xs text-[#444748]">Seed admin: admin@aura.resort / Aura@123</p>
      </div>
    </div>
  );
}
