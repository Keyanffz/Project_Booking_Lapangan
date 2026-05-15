import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// Import komponen kalender yang sudah kita buat sebelumnya
// Sesuaikan alamat importnya dengan lokasi file komponen kalendermu
import ScheduleCalendar from "@/components/User/ScheduleCalendar";

export default async function BookingDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params;
    const idLapangan = resolvedParams.id;

    // Di sini nantinya kamu juga akan memanggil fungsi getDetailLapangan(idLapangan) dari API

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Tombol Kembali */}
            <Link
                href="/dashboard"
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#113222] mb-6 font-medium"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Detail Lapangan #{idLapangan}
                </h1>
                <p className="text-gray-500 mt-2">
                    Pilih tanggal dan jam ketersediaan di bawah ini untuk melanjutkan proses reservasi.
                </p>
            </div>

            {/* Memanggil Komponen Kalender Jadwal */}
            <ScheduleCalendar />

        </div>
    );
}