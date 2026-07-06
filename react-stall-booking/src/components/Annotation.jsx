import React from 'react';

export default function Annotation() {
  return (
    <>
      {/* Hall outline border */}
      <div style={{ position: 'absolute', inset: 0, border: '3px solid #94a3b8', borderRadius: '4px', pointerEvents: 'none', zIndex: 0 }} />

      {/* Washroom */}
      <div style={{ position: 'absolute', left: '744px', top: '78px', width: '126px', height: '184px' }}
           className="flex items-center justify-center bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-500 font-space-mono tracking-widest uppercase">
        Wash Room
      </div>

      {/* Service Door */}
      <div style={{ position: 'absolute', left: '744px', top: '330px', width: '126px', height: '63px' }}
           className="flex items-center justify-center bg-slate-50 border border-slate-300 rounded text-[10px] font-bold text-slate-500 font-space-mono tracking-widest uppercase text-center">
        Service<br />Door
      </div>

      {/* Entry bottom */}
      <div style={{ position: 'absolute', left: '58px', top: '956px', width: '315px', height: '40px' }}
           className="flex items-center justify-center bg-green-50 border border-green-300 rounded text-[11px] font-bold text-green-700 font-space-mono tracking-widest uppercase">
        Entry
      </div>

      {/* Exit top */}
      <div style={{ position: 'absolute', left: '123px', top: '20px', width: '250px', height: '40px' }}
           className="flex items-center justify-center bg-red-50 border border-red-300 rounded text-[11px] font-bold text-red-600 font-space-mono tracking-widest uppercase">
        Exit
      </div>

      {/* South label */}
      <div style={{ position: 'absolute', left: '744px', top: '706px', width: '126px', height: '58px' }}
           className="flex items-center justify-center bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-500 font-space-mono tracking-widest uppercase">
        South
      </div>

      {/* North label */}
      <div style={{ position: 'absolute', left: '744px', top: '830px', width: '126px', height: '120px' }}
           className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-500 font-space-mono tracking-widest uppercase text-center gap-1">
        <span>69'</span>
        <span>North</span>
      </div>

      {/* Entry/Exit pair row at right side */}
      <div style={{ position: 'absolute', left: '435px', top: '956px', width: '185px', height: '40px' }}
           className="flex items-center justify-around bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-500 font-space-mono tracking-widest uppercase">
        <span className="text-red-500">Exit</span>
        <span className="text-green-600">Entry</span>
      </div>
    </>
  );
}
