import React from "react";
import Link from "next/link"; // Ini yang tadi terlewat, bro
import { Leaf, Mail, MapPin } from "lucide-react";

export default function FooterUser() {
    return (
        <footer className="bg-[#1B3627] text-white pt-10 pb-6 font-sans border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

                    {/* Kolom 1: Brand & Slogan */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-[#8CB954]" />
                            <span className="font-bold text-lg tracking-wide">MyUGO</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs">
                            Sistem informasi pemesanan lapangan olahraga GOR UDINUS yang terintegrasi dan real-time untuk kemudahan berolahraga.
                        </p>
                    </div>

                    {/* Kolom 2: Navigasi */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#E5C3A6]">Navigasi</h4>
                        <ul className="space-y-2 text-[11px] text-gray-400">
                            <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                            <li><Link href="/user/riwayat" className="hover:text-white transition">Riwayat Booking</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Informasi GOR</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Fasilitas */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#E5C3A6]">Fasilitas</h4>
                        <ul className="space-y-2 text-[11px] text-gray-400">
                            <li><span className="cursor-default">Lapangan Futsal</span></li>
                            <li><span className="cursor-default">Arena Basket</span></li>
                            <li><span className="cursor-default">Hall Bulutangkis</span></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#E5C3A6]">Kontak Kami</h4>
                        <ul className="space-y-3 text-[11px] text-gray-400">
                            <li className="flex gap-2">
                                <MapPin className="w-4 h-4 text-[#8CB954] shrink-0" />
                                <span>Gedung GOR UDINUS, Semarang</span>
                            </li>
                            <li className="flex gap-2">
                                <Mail className="w-4 h-4 text-[#8CB954] shrink-0" />
                                <span>sarpras@dinus.ac.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Garis Bawah & Copyright */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-[9px] uppercase font-bold tracking-[0.15em] text-gray-500">
                        © 2026 MyUGO — NURALIFMAULANASYAFRUDIN • UNIVERSITAS DIAN NUSWANTORO
                    </p>
                    <div className="flex gap-6 text-[9px] font-bold text-gray-500 uppercase">
                        <Link href="#" className="hover:text-white transition">Ketentuan</Link>
                        <Link href="#" className="hover:text-white transition">Privasi</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}