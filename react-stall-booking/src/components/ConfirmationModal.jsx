import React from 'react';
import { fmtBDT } from './Stall';

export default function ConfirmationModal({ data, onClose }) {
  const { stallLabel, email, amount, name } = data;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[500] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl -[0_25px_50px_rgba(0,0,0,0.12)] w-full max-w-md border border-slate-200">

        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-montserrat text-[20px] font-extrabold text-slate-800 m-0">Booking Confirmed</h2>
            <p className="font-montserrat text-[12.5px] text-slate-500 mt-1 m-0">Stall reservation successful.</p>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer border-0 bg-transparent text-[16px]"
            onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#155dfc] to-[#4f39f6] flex items-center justify-center -[0_8px_20px_rgba(21,93,252,0.3)]">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>

          <div>
            <div className="font-montserrat text-[18px] font-bold text-slate-800 mb-1">
              Stall {stallLabel} — is yours
            </div>
            <div className="font-montserrat text-[13px] text-slate-500">
              Booking amount: <b className="text-slate-700">{fmtBDT(amount)}</b>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl text-[13px] font-bold font-montserrat text-white bg-gradient-to-r from-[#155dfc] to-[#4f39f6] -[0_4px_12px_rgba(21,93,252,0.2)] -[0_6px_18px_rgba(21,93,252,0.35)] hover:scale-[1.01] transition-all cursor-pointer border-0 mt-2"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
