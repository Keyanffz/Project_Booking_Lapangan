"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Building2, QrCode, Calendar, Clock, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function PembayaranContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const idParam = searchParams.get("id") || "1";
    const dateParam = searchParams.get("date") || "Senin, 11 Nov 2026";
    const timeParam = searchParams.get("time") || "";

    const idLapangan = parseInt(idParam) || 1;
    const isOdd = idLapangan % 2 !== 0;

    const namaLapangan = isOdd ? "Lapangan Futsal Internasional" : "Arena Basket Indoor B";
    const lokasiLapangan = isOdd ? "Gedung Olahraga Utama, Semarang" : "Student Center Lt. 3, Semarang";
    const hargaPerJam = isOdd ? 75000 : 60000;
    const imageLapangan = isOdd
        ? "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1000"
        : "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000";

    const selectedTimesArray = timeParam ? timeParam.split(",") : [];
    const jumlahJam = selectedTimesArray.length || 1;
    const totalHarga = hargaPerJam * jumlahJam;

    const [paymentMethod, setPaymentMethod] = useState<"bank" | "qris">("qris");
    const [formData, setFormData] = useState({ nama: "", phone: "", email: "" });

    useEffect(() => {
        const session = localStorage.getItem("user_session");
        if (session) {
            const user = JSON.parse(session);
            setFormData({
                nama: user.nama || "NURALIFMAULANASYAFRUDIN",
                phone: user.phone || "+62 812 3456 7890",
                email: user.email || "alif@dinus.ac.id"
            });
        } else {
            setFormData({
                nama: "NURALIFMAULANASYAFRUDIN",
                phone: "+62 812 3456 7890",
                email: "alif@dinus.ac.id"
            });
        }
    }, []);

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(angka);
    };

    const handleBayar = () => {
        // 1. Ambil riwayat lama dari memori browser
        const existingHistory = JSON.parse(localStorage.getItem('booking_history') || '[]');

        // 2. Buat objek data pesanan baru
        const newBooking = {
            id: "BK-" + Math.floor(1000 + Math.random() * 9000),
            title: namaLapangan,
            category: isOdd ? "Futsal" : "Basket",
            price: totalHarga,
            date: dateParam,
            time: selectedTimesArray.join(", ") + ` (${jumlahJam} Jam)`,
            status: "TERTUNDA",
            image: imageLapangan,
            note: "Menunggu pembayaran",
            createdAt: new Date().getTime() // Waktu pesanan dibuat
        };

        // 3. Simpan gabungan data lama + data baru
        localStorage.setItem('booking_history', JSON.stringify([newBooking, ...existingHistory]));

        // 4. Lanjut ke halaman Invoice
        router.push(`/invoice?total=${totalHarga}`);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-6 bg-gray-300"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">Biodata Pemesan</h3>
                    </div>
                    <div className="bg-[#F5F2E9]/60 p-6 sm:p-8 rounded-2xl border border-[#E5C3A6]/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nama Lengkap</label>
                            <input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full bg-[#EAE7DF] border-none rounded-lg px-4 py-3.5 text-sm font-bold text-[#1B3627] focus:ring-2 focus:ring-[#c29867] outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nomor Handphone</label>
                            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#EAE7DF] border-none rounded-lg px-4 py-3.5 text-sm font-bold text-[#1B3627] focus:ring-2 focus:ring-[#c29867] outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#EAE7DF] border-none rounded-lg px-4 py-3.5 text-sm font-bold text-[#1B3627] focus:ring-2 focus:ring-[#c29867] outline-none transition-all" />
                            <p className="text-[9px] text-gray-400 font-medium mt-1 italic">* We'll send your e-ticket here</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-6 bg-gray-300"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">Metode Pembayaran</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div onClick={() => setPaymentMethod("bank")} className={`relative bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "bank" ? "border-[#8CB954] shadow-md" : "border-transparent hover:border-gray-200 shadow-sm"}`}>
                            <div className="absolute top-6 right-6">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank" ? "border-[#8CB954]" : "border-gray-300"}`}>
                                    {paymentMethod === "bank" && <div className="w-2 h-2 rounded-full bg-[#8CB954]"></div>}
                                </div>
                            </div>
                            <Building2 className="w-6 h-6 text-[#1B3627] mb-4" />
                            <h4 className="font-black text-sm mb-2">Transfer Bank</h4>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed mb-4">Verifikasi manual via Virtual Account.</p>
                            <div className="flex gap-2">
                                <span className="text-[8px] font-bold bg-gray-100 px-2 py-1 rounded">BCA</span>
                                <span className="text-[8px] font-bold bg-gray-100 px-2 py-1 rounded">MANDIRI</span>
                                <span className="text-[8px] font-bold bg-gray-100 px-2 py-1 rounded">BNI</span>
                            </div>
                        </div>

                        <div onClick={() => setPaymentMethod("qris")} className={`relative bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === "qris" ? "border-[#8CB954] shadow-md" : "border-transparent hover:border-gray-200 shadow-sm"}`}>
                            <div className="absolute top-6 right-6">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "qris" ? "border-[#8CB954]" : "border-gray-300"}`}>
                                    {paymentMethod === "qris" && <div className="w-2 h-2 rounded-full bg-[#8CB954]"></div>}
                                </div>
                            </div>
                            <QrCode className="w-6 h-6 text-[#1B3627] mb-4" />
                            <h4 className="font-black text-sm mb-2">QRIS</h4>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed mb-4">Scan with GoPay, OVO, or Mobile Banking.</p>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-4 object-contain opacity-80" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-[#1B3627] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col mb-4">
                    <svg className="absolute -top-10 -right-10 w-48 h-48 text-white opacity-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 2C6 2 2 8 2 14c0 4.5 4 8 10 8s10-3.5 10-8c0-6-4-12-10-12z" />
                        <path d="M12 2v20" />
                    </svg>

                    <p className="text-[9px] font-bold text-[#8CB954] uppercase tracking-widest mb-6 relative z-10">RINGKASAN PESANAN</p>
                    <h2 className="text-2xl font-black mb-6 leading-tight relative z-10">{namaLapangan}</h2>

                    <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span className="text-[11px] font-medium">{dateParam}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span className="text-[11px] font-medium">{selectedTimesArray.join(", ") || "Belum dipilih"} ({jumlahJam} Jam)</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="text-[11px] font-medium">{lokasiLapangan}</span>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-3 mb-6 relative z-10">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Subtotal ({jumlahJam} Jam)</span>
                            <span className="font-bold">Rp {formatRupiah(totalHarga)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Tax (11%)</span>
                            <span className="font-bold">Included</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-8 relative z-10">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">TOTAL PAYABLE</span>
                        <span className="text-3xl font-black text-white">Rp {formatRupiah(totalHarga)}</span>
                    </div>

                    <button onClick={handleBayar} className="w-full bg-[#8b5a2b] hover:bg-[#724a23] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#8b5a2b]/20 flex justify-center items-center gap-2 relative z-10">
                        Bayar Sekarang <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[7px] text-center text-gray-400 mt-4 tracking-widest uppercase flex items-center justify-center gap-1.5 relative z-10">
                        <ShieldCheck className="w-3 h-3" /> Secure 256-bit SSL Encrypted Payment
                    </p>
                </div>

                <div className="w-full h-24 rounded-2xl overflow-hidden relative shadow-md">
                    <img src={imageLapangan} alt="Venue Experience" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                        <p className="text-[9px] font-bold text-white uppercase tracking-widest">VENUE EXPERIENCE: BOTANICAL ATHLETIC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PembayaranPage() {
    return (
        <div className="w-full pb-20 font-sans min-h-screen bg-[#FDFBF5] text-[#1B3627]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="mb-12">
                    <p className="text-xs font-bold text-[#c29867] uppercase tracking-widest mb-2">SECURE BOOKING</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Pilih<br />Pembayaran</h1>
                </div>
                <Suspense fallback={<div className="text-center py-20 text-gray-500 font-bold">Loading Payment Details...</div>}>
                    <PembayaranContent />
                </Suspense>
            </div>
        </div>
    );
}