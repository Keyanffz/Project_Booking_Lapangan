import React from "react";

export default function TransactionModal({
    item,
    onClose,
    formatRupiah
}: any) {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#0a140d]/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            ></div>
            <div className="relative w-full max-w-sm bg-[#FDFBF5] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 border border-gray-200 text-[#1B3627]">
                <div className="bg-[#1B3627] text-white p-6 text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white font-bold text-sm">✕</button>
                    <h3 className="text-base font-bold tracking-wide">Detail Transaksi</h3>
                    <p className="text-[9px] uppercase tracking-widest text-[#8CB954] mt-1">{item.id}</p>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">FASILITAS</p>
                        <p className="text-sm font-bold">{item.title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">TANGGAL</p>
                            <p className="text-xs font-bold">{item.date}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">WAKTU</p>
                            <p className="text-xs font-bold">{item.time}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200/60 pt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-gray-500">Status Pembayaran</span>
                            <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${item.status === 'SELESAI' ? 'bg-green-100 text-green-700' : item.status === 'DIBATALKAN' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                    <div className="border-t border-gray-200/60 pt-3 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">Total Biaya</span>
                        <span className="text-base font-black">Rp {formatRupiah(item.price)}</span>
                    </div>
                    <button onClick={onClose} className="w-full mt-2 py-2.5 bg-[#1B3627] text-white text-xs font-bold rounded hover:bg-[#132A1D] transition">Tutup</button>
                </div>
            </div>
        </div>
    );
}