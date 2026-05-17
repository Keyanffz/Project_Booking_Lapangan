"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Download, Info, ShieldCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function InvoiceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalParam = searchParams.get("total") || "250000";
    const totalHarga = parseInt(totalParam);

    const [timeLeft, setTimeLeft] = useState(600);
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        const cachedId = localStorage.getItem("current_transaction_id");
        const cachedExpiry = localStorage.getItem("current_transaction_expiry");
        const now = Date.now();

        if (cachedId && cachedExpiry) {
            const expiryTime = parseInt(cachedExpiry);
            if (expiryTime > now) {
                setTransactionId(cachedId);
                setTimeLeft(Math.max(0, Math.floor((expiryTime - now) / 1000)));
            } else {
                const newId = "#UGO-" + Math.floor(1000000 + Math.random() * 9000000);
                const newExpiry = now + 600 * 1000;
                localStorage.setItem("current_transaction_id", newId);
                localStorage.setItem("current_transaction_expiry", newExpiry.toString());
                setTransactionId(newId);
                setTimeLeft(600);
            }
        } else {
            const newId = "#UGO-" + Math.floor(1000000 + Math.random() * 9000000);
            const newExpiry = now + 600 * 1000;
            localStorage.setItem("current_transaction_id", newId);
            localStorage.setItem("current_transaction_expiry", newExpiry.toString());
            setTransactionId(newId);
            setTimeLeft(600);
        }
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            localStorage.removeItem("current_transaction_id");
            localStorage.removeItem("current_transaction_expiry");
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    localStorage.removeItem("current_transaction_id");
                    localStorage.removeItem("current_transaction_expiry");
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(angka);
    };

    const handleCancelOrder = () => {
        localStorage.removeItem("current_transaction_id");
        localStorage.removeItem("current_transaction_expiry");

        const savedHistory = localStorage.getItem("booking_history");
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            const pendingIndex = history.findIndex((item: any) => item.status === "TERTUNDA");
            if (pendingIndex !== -1) {
                history[pendingIndex].status = "DIBATALKAN";
                history[pendingIndex].note = "*Pemesanan telah dibatalkan oleh pengguna.";
                localStorage.setItem("booking_history", JSON.stringify(history));
            }
        }

        router.push("/riwayat");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-7 space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase text-[#1B3627] mb-4">
                        SELESAIKAN<br />TRANSAKSI ANDA
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                        Silakan pindai kode QR di samping menggunakan aplikasi perbankan atau e-wallet pilihan Anda untuk mengonfirmasi pesanan MyUGO Anda.
                    </p>
                </div>

                <div className="bg-[#F5F2E9]/80 p-8 rounded-2xl border border-[#E5C3A6]/30 space-y-6 shadow-sm">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ID TRANSAKSI</span>
                        <span className="text-sm font-black text-[#1B3627]">{transactionId || "Loading..."}</span>
                    </div>

                    <div className="flex justify-between items-center pb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">TOTAL TAGIHAN</span>
                        <span className="text-2xl font-black text-[#1B3627]">Rp {formatRupiah(totalHarga)}</span>
                    </div>

                    <div className="bg-[#E5C3A6]/20 p-4 rounded-xl flex gap-3 items-start border border-[#E5C3A6]/40">
                        <Info className="w-5 h-5 text-[#8b5a2b] shrink-0 mt-0.5" />
                        <p className="text-xs font-medium text-[#8b5a2b] leading-relaxed">
                            Pemesanan akan otomatis dibatalkan jika pembayaran tidak diselesaikan dalam 10 menit.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 bg-[#8b5a2b] hover:bg-[#724a23] text-white py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#8b5a2b]/20 flex justify-center items-center gap-2">
                        <Download className="w-4 h-4" /> Unduh QR Code
                    </button>
                    <Link href="/dashboard" className="flex-1 bg-white hover:bg-gray-50 text-[#1B3627] border border-gray-200 py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex justify-center items-center text-center">
                        Kembali Ke Dashboard
                    </Link>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleCancelOrder}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex justify-center items-center gap-2 shadow-sm"
                    >
                        <XCircle className="w-4 h-4" /> Batalkan Pesanan
                    </button>
                </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">SELESAIKAN PEMBAYARAN DALAM</p>
                    <h2 className={`text-4xl font-black mb-8 transition-colors duration-300 ${timeLeft < 60 ? "text-red-500 animate-pulse" : "text-[#8b5a2b]"}`}>
                        {minutes}:{seconds}
                    </h2>

                    <div className="bg-[#1B3627] p-6 rounded-3xl shadow-inner mb-8 w-full max-w-[280px] aspect-square flex flex-col items-center justify-center relative">
                        <div className="absolute top-4 text-[10px] text-gray-400 font-medium tracking-widest uppercase">Payment Gateway</div>
                        <div className="bg-white p-3 rounded-xl w-3/4 aspect-square mt-4 relative shadow-lg">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full h-full object-contain opacity-90" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white p-1 rounded-md shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-[#8CB954]" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 text-[10px] text-gray-400 font-medium tracking-widest uppercase">Safe Network</div>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-4 py-2 rounded-full bg-gray-50">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> DPN SECURED
                    </div>
                </div>

                <div className="w-full h-32 rounded-3xl overflow-hidden shadow-md opacity-90">
                    <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000" alt="Leaves" className="w-full h-full object-cover" />
                </div>
            </div>

        </div>
    );
}

export default function InvoicePage() {
    return (
        <div className="w-full pb-20 font-sans min-h-screen bg-[#FDFBF5] text-[#1B3627]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="mb-12">
                    <p className="text-xs font-bold text-[#c29867] uppercase tracking-widest mb-2">SECURE BOOKING</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">Pilih<br />Pembayaran</h1>
                </div>
                <Suspense fallback={<div className="text-center py-20 font-bold text-gray-500">Memuat Tagihan...</div>}>
                    <InvoiceContent />
                </Suspense>
            </div>
        </div>
    );
}