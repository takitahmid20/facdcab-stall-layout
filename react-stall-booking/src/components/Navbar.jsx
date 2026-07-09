import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-5 pb-0">
      <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-full px-7 py-3 flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="https://www.facdcab.org/images/logo.svg" 
              alt="FACD-CAB Logo" 
              className="h-7 cursor-pointer"
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-7 items-center">
          <Link to="/" className="font-montserrat text-[13.5px] font-semibold text-slate-800 hover:text-brand-blue transition-colors duration-200 no-underline">Stall Booking</Link>
          <a href="#" className="font-montserrat text-[13.5px] font-semibold text-slate-800 flex items-center gap-1 hover:text-brand-blue transition-colors duration-200 no-underline">
            Members
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 stroke-[2.5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="#" className="font-montserrat text-[13.5px] font-semibold text-slate-800 flex items-center gap-1 hover:text-brand-blue transition-colors duration-200 no-underline">
            Committee
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 stroke-[2.5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <Link to="/register" className="font-montserrat text-[13.5px] font-semibold text-slate-800 hover:text-brand-blue transition-colors duration-200 no-underline">Expo Registration</Link>
          <a href="#" className="font-montserrat text-[13.5px] font-semibold text-slate-800 hover:text-brand-blue transition-colors duration-200 no-underline">News & Blogs</a>
        </div>
        <div className="flex gap-2 sm:gap-3.5 items-center">
          <Link 
            to="/register" 
            className="font-montserrat text-[11px] sm:text-[13.5px] font-bold bg-[#10b981] text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(16,185,129,0.25)] transition-all duration-200 no-underline shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            Register Now
          </Link>
          <a 
            href="https://member.facdcab.org" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden sm:flex font-montserrat text-[13.5px] font-bold bg-brand-blue-grad text-white px-5 py-2.5 rounded-full items-center gap-2 shadow-[0_4px_12px_rgba(21,93,252,0.15)] hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(21,93,252,0.25)] transition-all duration-200 no-underline shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5 stroke-[2.5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Member Login
          </a>
        </div>
      </div>
    </div>
  );
}
