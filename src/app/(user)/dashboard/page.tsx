"use client";

import React, { useState } from "react";
import { Search, MapPin, Users, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
    // 1. DATA DUMMY (Kita buat 15 data agar pagination-nya kelihatan berfungsi)
    const allLapangan = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        nama: i % 2 === 0 ? "Lapangan Futsal Internasional" : "Arena Basket Indoor B",
        lokasi: i % 2 === 0 ? "Gedung Olahraga Utama" : "Student Center Lt. 3",
        kapasitas: i % 2 === 0 ? "12 Orang" : "20 Orang",
        status: i % 5 === 0 ? "Maintenance" : "Tersedia",
        harga: i % 2 === 0 ? "75.000" : "60.000",
        tag: "SAF",
    }));

    // 2. LOGIKA PAGINATION (Batas 9 item per halaman)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(allLapangan.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allLapangan.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full pb-20 font-sans">
            {/* HERO SECTION */}
            <section className="relative w-full h-[300px] bg-[#1B3627] flex flex-col justify-center items-center text-white rounded-b-3xl md:rounded-none overflow-hidden">
                {/* Ornamen Daun (Sama seperti di Auth) */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="absolute -bottom-16 -left-16 w-96 h-96 text-[#8CB954] opacity-20 pointer-events-none"
                >
                    <path d="M12 2C6 2 2 8 2 14c0 4.5 4 8 10 8s10-3.5 10-8c0-6-4-12-10-12z" />
                    <path d="M12 2v20" />
                    <path d="M12 14c-4-2-7-1-8 0" />
                    <path d="M12 10c4-2 7-1 8 0" />
                </svg>

                <div className="z-10 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        BOOKING FASILITAS
                        <br />
                        GOR UDINUS
                    </h1>
                    <button className="bg-[#E5C3A6] hover:bg-[#d5b090] text-[#1B3627] font-semibold py-2 px-6 rounded-md transition-colors">
                        Cari Fasilitas Sekarang
                    </button>
                </div>
            </section>

            {/* FILTER & PENCARIAN */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-24px] relative z-20">
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari nama fasilitas..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EAD0B3]"
                        />
                    </div>
                    <div className="w-full md:w-auto flex gap-4">
                        <select className="w-full md:w-48 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EAD0B3] bg-white text-gray-600">
                            <option value="">Pilih Kategori</option>
                            <option value="futsal">Futsal</option>
                            <option value="basket">Basket</option>
                            <option value="bulutangkis">Bulutangkis</option>
                        </select>
                        <button className="bg-[#1B3627] hover:bg-[#132A1D] text-white px-6 py-2 rounded-md transition-colors">
                            Cari
                        </button>
                    </div>
                </div>
            </section>

            {/* GRID KATALOG LAPANGAN (Hanya render currentItems, maks 9) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Image Placeholder */}
                            <div className="h-48 bg-[#F5F2E9] relative flex items-center justify-center">
                                <span className="text-gray-400 font-medium">Image Area</span>
                                <div className="absolute top-3 right-3 bg-[#E5C3A6] text-[#1B3627] text-xs font-bold px-3 py-1 rounded">
                                    {item.tag}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-[#1B3627] mb-3">
                                    {item.nama}
                                </h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-[#8CB954]" />
                                        {item.lokasi}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="w-4 h-4 mr-2 text-[#8CB954]" />
                                        Kapasitas {item.kapasitas}
                                    </div>
                                    <div
                                        className={`flex items-center text-sm font-medium ${item.status === "Tersedia"
                                            ? "text-green-600"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {item.status === "Tersedia" ? (
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                        ) : (
                                            <XCircle className="w-4 h-4 mr-2" />
                                        )}
                                        {item.status}
                                    </div>
                                </div>

                                {/* Footer Card */}
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Mulai</p>
                                        <p className="font-bold text-sm text-[#1B3627]">
                                            Rp {item.harga} <span className="font-normal text-gray-500">/jam</span>
                                        </p>
                                    </div>
                                    <Link
                                        href={`/booking/${item.id}`}
                                        className="text-sm font-bold text-[#1B3627] hover:text-[#E5C3A6] transition-colors flex items-center"
                                    >
                                        Detail &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KOMPONEN PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-white transition"
                        >
                            <ChevronLeft className="w-4 h-4 text-[#1B3627]" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-md text-sm font-bold transition ${currentPage === i + 1
                                    ? "bg-[#1B3627] text-white shadow-lg"
                                    : "bg-white text-gray-400 border border-gray-100 hover:border-[#E5C3A6] hover:text-[#1B3627]"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-white transition"
                        >
                            <ChevronRight className="w-4 h-4 text-[#1B3627]" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}