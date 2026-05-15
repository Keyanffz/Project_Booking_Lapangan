"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Leaf } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // State untuk form
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Ambil data user yang sudah ada di localStorage (jika ada)
    const existingUsers = JSON.parse(localStorage.getItem("local_users") || "[]");

    // 2. Buat objek user baru (Role default: Umum sesuai SRS [cite: 165])
    const newUser = {
      nama,
      email,
      phone: "+62" + phone,
      password,
      role: "Umum", // User baru didaftarkan sebagai Umum
      nim: null
    };

    // 3. Simpan ke array dan masukkan kembali ke localStorage
    existingUsers.push(newUser);
    localStorage.setItem("local_users", JSON.stringify(existingUsers));

    alert("Registrasi Berhasil! Silakan Login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex w-full font-sans">
      {/* KIRI: Branding (Tetap Sama) */}
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-b from-[#2B2317] to-[#132A1D] text-white p-12 flex-col justify-between relative overflow-hidden">
        <Link href="/" className="flex items-center gap-2 z-10 hover:opacity-80 transition w-fit">
          <Leaf className="w-5 h-5 text-[#8CB954]" />
          <span className="font-bold text-lg tracking-wide">MyUGO</span>
        </Link>
        <div className="z-10 mt-12 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-6">Bergabung <br /> dengan MyUGO</h1>
          <p className="text-sm text-gray-300 leading-relaxed mb-10 max-w-sm">Masuki galeri botani fasilitas olahraga premium UDINUS.</p>
        </div>
      </div>

      {/* KANAN: Form Register */}
      <div className="w-full md:w-7/12 bg-[#FDFBF5] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-md w-full mx-auto relative z-10">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1B3627] mb-2">Buat Akun Baru</h2>
            <p className="text-sm text-gray-500">Sudah memiliki akun? <Link href="/login" className="text-[#1B3627] font-semibold hover:underline">Masuk di sini</Link></p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="John Doe" required className="w-full bg-[#F5F2E9] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#EAD0B3] outline-none text-[#1B3627]" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Alamat Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required className="w-full bg-[#F5F2E9] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#EAD0B3] outline-none text-[#1B3627]" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">No. HP</label>
              <div className="flex bg-[#F5F2E9] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#EAD0B3]">
                <span className="flex items-center justify-center px-4 border-r border-gray-200/50 text-sm text-gray-600">+62</span>
                <input
                  type="text"
                  value={phone}
                  onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')} // Hanya angka
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="81234567890"
                  required
                  className="w-full bg-transparent border-none px-4 py-3 text-sm outline-none text-[#1B3627]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative flex items-center">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-[#F5F2E9] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#EAD0B3] outline-none text-[#1B3627]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#E5C3A6] hover:bg-[#d5b090] text-[#1B3627] font-semibold py-3.5 rounded-md transition duration-200 mt-4">Buat Akun</button>
          </form>
        </div>
      </div>
    </div>
  );
}