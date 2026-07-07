import React from 'react';

export default function Legend() {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-montserrat">
      <h3 className="text-[13.5px] font-bold text-slate-700 tracking-wide uppercase mb-3">Legend</h3>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded bg-[#8b5cf6]/[0.14] border border-[#8b5cf6]/60 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Premium stall</span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded bg-[#38bdf8]/[0.14] border border-[#38bdf8]/60 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Sponsor stall</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-5 rounded bg-[#ec4899]/[0.12] border border-[#ec4899]/55 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Standard stall</span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded bg-gradient-to-br from-[#155dfc] to-[#4f39f6] border border-blue-400/30 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">On hold — 60s window</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-5 rounded stripe-booked border border-slate-300 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Booked</span>
      </div>

      <div className="text-[12px] text-slate-500 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200 leading-relaxed">
        All stalls (8'×8'): <b className="text-slate-700">৳80,000</b>
      </div>
    </div>
  );
}
