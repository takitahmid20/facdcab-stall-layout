import React from 'react';

export default function Legend() {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-montserrat">
      <h3 className="text-[13.5px] font-bold text-slate-700 tracking-wide uppercase mb-3">Legend</h3>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded bg-green-50 border border-green-400/40 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Available — tap to hold</span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded bg-gradient-to-br from-[#155dfc] to-[#4f39f6] border border-blue-400/30 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">On hold — 60s window</span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-8 h-5 rounded stripe-booked border border-slate-300 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Booked</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-5 rounded bg-green-50 border-2 border-dashed border-amber-400/60 flex-shrink-0"></div>
        <span className="text-[12.5px] text-slate-600 font-medium">Corner stall — sold as a pair</span>
      </div>

      <div className="text-[12px] text-slate-500 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200 leading-relaxed">
        Standard stall: <b className="text-slate-700">৳80,000</b><br />
        Merged corner stall: <b className="text-slate-700">৳1,60,000</b>
      </div>
    </div>
  );
}
