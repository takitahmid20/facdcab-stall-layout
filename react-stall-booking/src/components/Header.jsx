import React from 'react';

export default function Header({ stats }) {
  return (
    <header className="max-w-[1600px] mx-auto px-6 py-0">
      <div className="flex flex-col gap-4 py-5 w-full relative">
        <h1 className="font-montserrat font-extrabold text-[26px] tracking-tight text-slate-800 m-0 leading-snug">
          FACD-CAB 14th International Education Expo 2026
        </h1>
        
        <div className="flex flex-wrap justify-between items-center gap-6 w-full">
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="bg-white/45 backdrop-blur-md border border-white/55 rounded-xl px-5 flex items-center gap-3 flex-1 min-w-[280px] h-[76px] box-border -[0_8px_32px_rgba(31,38,135,0.04)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-brand-blue flex-shrink-0 w-4 h-4 stroke-[2.5]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-montserrat text-[13px] font-bold text-brand-blue leading-normal">Pan Pacific Sonargaon Hotel Dhaka</span>
                <span className="font-montserrat text-[11.5px] font-semibold text-slate-600 mt-0.5 leading-normal">Grand Ball Room</span>
              </div>
            </div>
            
            <div className="bg-white/45 backdrop-blur-md border border-white/55 rounded-xl px-5 flex items-center gap-3 flex-1 min-w-[280px] h-[76px] box-border -[0_8px_32px_rgba(31,38,135,0.04)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-brand-blue flex-shrink-0 w-4 h-4 stroke-[2.5]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-montserrat text-[13px] font-bold text-brand-blue leading-normal">July 10 - July 11, 2026</span>
                <span className="font-montserrat text-[11.5px] font-semibold text-slate-600 mt-0.5 leading-normal">Expo Duration: 2 Days</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3.5">
            <div className="border border-green-500/35 bg-green-500/5 bg-white/45 backdrop-blur-md rounded-xl px-5 h-[76px] box-border min-w-[105px] flex flex-col justify-center items-center relative cursor-default -[0_8px_32px_rgba(31,38,135,0.04)] hover:-translate-y-1 -[0_12px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-250">
              <b className="block font-space-mono text-2xl font-bold leading-none text-green-600">{stats.available}</b>
              <span className="block font-montserrat text-[9.5px] font-bold tracking-wider uppercase mt-1.5 text-slate-600">Available</span>
            </div>
            <div className="border border-amber-500/35 bg-amber-500/5 bg-white/45 backdrop-blur-md rounded-xl px-5 h-[76px] box-border min-w-[105px] flex flex-col justify-center items-center relative cursor-default -[0_8px_32px_rgba(31,38,135,0.04)] hover:-translate-y-1 -[0_12px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-250">
              <b className="block font-space-mono text-2xl font-bold leading-none text-amber-600">{stats.onHold}</b>
              <span className="block font-montserrat text-[9.5px] font-bold tracking-wider uppercase mt-1.5 text-slate-600">On Hold</span>
            </div>
            <div className="border border-slate-500/35 bg-slate-500/5 bg-white/45 backdrop-blur-md rounded-xl px-5 h-[76px] box-border min-w-[105px] flex flex-col justify-center items-center relative cursor-default -[0_8px_32px_rgba(31,38,135,0.04)] hover:-translate-y-1 -[0_12px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-250">
              <b className="block font-space-mono text-2xl font-bold leading-none text-slate-500">{stats.booked}</b>
              <span className="block font-montserrat text-[9.5px] font-bold tracking-wider uppercase mt-1.5 text-slate-600">Booked</span>
            </div>
          </div>
        </div>

        <div className="font-montserrat text-[12.5px] text-slate-800 font-semibold mt-1.5 max-w-[780px] leading-relaxed">
          Interactive floor plan — 90 stalls, 8'×8' each. Click any available green stall to hold it for 60 seconds while you check out.
        </div>
      </div>
    </header>
  );
}
