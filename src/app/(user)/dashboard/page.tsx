"use client";

import React, { useState } from "react";
import { Search, MapPin, Users, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
    // 1. STATE UNTUK PENCARIAN
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // 2. DATA DUMMY
    const allLapangan = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        nama: i % 2 === 0 ? "Lapangan Futsal Internasional" : "Arena Basket Indoor B",
        lokasi: i % 2 === 0 ? "Gedung Olahraga Utama" : "Student Center Lt. 3",
        kapasitas: i % 2 === 0 ? "12 Orang" : "20 Orang",
        status: i % 5 === 0 ? "Maintenance" : "Tersedia",
        harga: i % 2 === 0 ? "75.000" : "60.000",
        tag: "SAF",
    }));

    // 3. LOGIKA PENYARINGAN DATA (Search)
    const filteredLapangan = allLapangan.filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 4. LOGIKA PAGINATION
    const totalPages = Math.ceil(filteredLapangan.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredLapangan.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 saat mulai mencari
    };

    return (
        <div className="w-full pb-20 font-sans bg-[#FDFBF5] min-h-screen">

            {/* HERO SECTION DENGAN BACKGROUND GAMBAR */}
            <section className="relative w-full h-[400px] flex flex-col justify-center items-center text-white overflow-hidden">
                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-[#0a140d]/70 z-10"></div>

                {/* Gambar Latar Belakang (Menggunakan placeholder Unsplash lapangan indoor) */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop')" }}
                ></div>

                <div className="z-20 text-center px-4 mt-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        BOOKING FASILITAS<br />GOR UDINUS
                    </h1>
                    <button className="bg-[#E5C3A6] hover:bg-[#d5b090] text-[#1B3627] font-bold py-3.5 px-8 rounded-xl transition-colors">
                        Cari Fasilitas Sekarang
                    </button>
                </div>
            </section>

            {/* SEARCH BAR (Sesuai Desain Baru) */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-36px] relative z-30">
                <div className="bg-white rounded-[20px] shadow-xl shadow-gray-200/50 p-2 flex flex-col sm:flex-row items-center gap-3 border border-gray-100">

                    {/* Input Area */}
                    <div className="flex-grow flex items-center bg-[#F5F2E9] rounded-xl px-4 py-1 w-full">
                        <Search className="text-gray-400 w-5 h-5 shrink-0" />
                        <input
                            type="text"
                            placeholder="Cari nama fasilitas"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full bg-transparent border-none focus:ring-0 text-[#1B3627] outline-none placeholder:text-gray-400 font-medium text-sm md:text-base px-3 py-3"
                        />
                    </div>

                    {/* Tombol Cari */}
                    <button className="bg-[#1B3627] hover:bg-[#132A1D] text-white px-10 py-4 rounded-xl font-bold transition-all w-full sm:w-auto shrink-0">
                        Cari
                    </button>

                </div>
            </section>

            {/* GRID KATALOG LAPANGAN */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {filteredLapangan.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1B3627]">Fasilitas tidak ditemukan</h3>
                        <p className="text-gray-500 mt-2 text-sm">Coba gunakan kata kunci pencarian lain.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentItems.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                                <div className="h-48 bg-[#F5F2E9] relative flex items-center justify-center overflow-hidden">
                                    <span className="text-gray-400 font-medium">Image Area</span>
                                    <div className="absolute top-4 right-4 bg-[#E5C3A6] text-[#1B3627] text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                                        {item.tag}
                                    </div>
                                    <div className="absolute inset-0 bg-[#1B3627]/0 group-hover:bg-[#1B3627]/5 transition-colors duration-300"></div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-lg text-[#1B3627] mb-4 group-hover:text-[#8CB954] transition-colors">{item.nama}</h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 shrink-0">
                                                <MapPin className="w-4 h-4 text-[#8CB954]" />
                                            </div>
                                            {item.lokasi}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 shrink-0">
                                                <Users className="w-4 h-4 text-[#8CB954]" />
                                            </div>
                                            Kapasitas {item.kapasitas}
                                        </div>
                                        <div className={`flex items-center text-sm font-medium ${item.status === "Tersedia" ? "text-green-600" : "text-red-500"}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 ${item.status === "Tersedia" ? "bg-green-50" : "bg-red-50"}`}>
                                                {item.status === "Tersedia" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                            </div>
                                            {item.status}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Harga Sewa</p>
                                            <p className="font-bold text-lg text-[#1B3627]">
                                                Rp {item.harga} <span className="font-medium text-sm text-gray-400">/jam</span>
                                            </p>
                                        </div>
                                        <Link href={`/booking/${item.id}`} className="bg-[#E5C3A6] hover:bg-[#d5b090] text-[#1B3627] text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
                                            Booking
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* KOMPONEN PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-14 gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#1B3627]" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                                        ? "bg-[#1B3627] text-white shadow-md shadow-green-900/20"
                                        : "bg-white text-gray-500 border border-gray-200 hover:border-[#8CB954] hover:text-[#1B3627]"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-xl border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-[#1B3627]" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}