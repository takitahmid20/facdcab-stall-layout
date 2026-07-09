import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function RegistrationSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const registeredList = state.registeredList || [];
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (registeredList.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
        <Navbar />
        <div className="max-w-md mx-auto px-4 mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-[17px] font-black text-slate-800 tracking-tight">No Active Registrations Found</h2>
            <p className="text-slate-500 text-[13px] mt-2 font-medium">Please fill out the registration form first to receive your tickets.</p>
            <Link
              to="/register"
              className="mt-6 inline-block w-full py-3 bg-[#004b95] text-white font-extrabold text-[12px] rounded-lg transition-all no-underline"
            >
              Go to Registration Form
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Visual Landscape Ticket Card Component
  const TicketCard = ({ attendee, onPrint }) => {
    return (
      <div className="w-full max-w-[720px] mx-auto bg-white border-2 border-slate-200 rounded-2xl flex flex-col sm:flex-row overflow-hidden text-left mb-8 relative group print:border-0 print:m-0 print:w-[720px] print:h-[250px] print:page-break-after-always">
        
        {/* Ticket Left Main Part */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4 print:p-4">
          
          {/* Header Row */}
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
            <img 
              className="h-7 display-block" 
              src="https://www.facdcab.org/images/logo.svg" 
              alt="FACD-CAB Logo" 
            />
            <div className="flex flex-col">
              <h4 className="text-[11px] font-extrabold text-[#004b95] m-0 leading-none">FACD-CAB</h4>
              <p className="text-[6.5px] font-semibold text-slate-500 m-0 mt-0.5 leading-none">Foreign Admission & Career Development Consultants Association of Bangladesh</p>
            </div>
          </div>

          {/* Expo Title */}
          <div>
            <div className="flex items-center title-row">
              <span className="bg-[#d31212] text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded mr-2 uppercase tracking-wider shrink-0 leading-none">
                14<sup>th</sup>
              </span>
              <span className="text-[12.5px] font-black tracking-tight leading-tight uppercase">
                <span className="text-[#d31212]">FACD-CAB</span>{' '}
                <span className="text-[#004b95]">International Education Expo 2026</span>
              </span>
            </div>
            <p className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest mt-1 mb-0">
              Connecting Dreams, Creating Global Opportunities
            </p>
          </div>

          {/* Attendee Details Row */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Ticket Holder</span>
              <h2 className="text-[15px] font-black text-slate-800 m-0 leading-tight">{attendee.fullName}</h2>
            </div>
            <div className="text-right flex flex-col gap-0.5">
              <div className="text-[10px] text-slate-500 font-medium"><strong>Email:</strong> {attendee.email}</div>
              <div className="text-[10px] text-slate-500 font-medium"><strong>Phone:</strong> {attendee.phone}</div>
            </div>
          </div>

          {/* Date & Venue details */}
          <div className="flex flex-row gap-6 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#d31212]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-0.5">Date & Day</span>
                <span className="text-[9.5px] text-slate-800 font-black leading-none">10 & 11 July 2026 (Fri & Sat)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-0.5">Venue</span>
                <span className="text-[9.5px] text-slate-800 font-black leading-none">Pan Pacific Sonargaon, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Right Stub Part */}
        <div className="w-full sm:w-[200px] bg-slate-50 border-t sm:border-t-0 sm:border-l-2 border-dashed border-slate-300 p-5 flex flex-row sm:flex-col justify-between items-center box-border relative shrink-0 print:border-l-2 print:border-t-0 print:w-[200px] print:h-full print:p-4">
          
          {/* Tear circles overlap layout */}
          <div className="hidden sm:block absolute w-4 h-4 bg-[#f8fafc] rounded-full border-b border-slate-200 -left-2.5 -top-2.5 print:bg-white print:border-slate-200"></div>
          <div className="hidden sm:block absolute w-4 h-4 bg-[#f8fafc] rounded-full border-t border-slate-200 -left-2.5 -bottom-2.5 print:bg-white print:border-slate-200"></div>

          <div className="stub-header text-center w-full">
            <span className="bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/20 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {attendee.type.replace(' Pass', '')} Pass
            </span>
          </div>

          <div className="stub-middle text-center w-full flex flex-col items-center gap-1.5 py-2">
            <div className="font-mono text-[9px] font-bold text-slate-500">
              ID: <span className="text-slate-800 font-extrabold">{attendee.ticketId}</span>
            </div>
            <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
              {/* Vector SVG Mock QR Code */}
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="8" y="8" width="26" height="26" fill="#000000" />
                <rect x="12" y="12" width="18" height="18" fill="#ffffff" />
                <rect x="16" y="16" width="10" height="10" fill="#000000" />
                <rect x="66" y="8" width="26" height="26" fill="#000000" />
                <rect x="70" y="12" width="18" height="18" fill="#ffffff" />
                <rect x="74" y="16" width="10" height="10" fill="#000000" />
                <rect x="8" y="66" width="26" height="26" fill="#000000" />
                <rect x="12" y="70" width="18" height="18" fill="#ffffff" />
                <rect x="16" y="74" width="10" height="10" fill="#000000" />
                <rect x="40" y="12" width="6" height="6" fill="#000000" />
                <rect x="48" y="18" width="8" height="8" fill="#000000" />
                <rect x="16" y="40" width="8" height="8" fill="#000000" />
                <rect x="28" y="44" width="12" height="6" fill="#000000" />
                <rect x="44" y="40" width="14" height="14" fill="#000000" />
                <rect x="48" y="44" width="6" height="6" fill="#ffffff" />
                <rect x="68" y="40" width="8" height="8" fill="#000000" />
                <rect x="80" y="44" width="8" height="6" fill="#000000" />
                <rect x="40" y="68" width="6" height="12" fill="#000000" />
                <rect x="52" y="76" width="10" height="8" fill="#000000" />
                <rect x="68" y="68" width="12" height="12" fill="#000000" />
              </svg>
            </div>
          </div>

          <div className="stub-footer text-center w-full">
            <span className="text-[8px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded uppercase tracking-wider leading-none">
              FREE ENTRY
            </span>
          </div>

          {/* Quick-action overlay icons (shown on hover) */}
          <div className="absolute inset-0 bg-[#004b95]/90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 print:hidden">
            <button
              onClick={() => onPrint(attendee)}
              className="px-4 py-2 bg-white text-[#004b95] font-extrabold text-[11px] rounded-lg hover:scale-105 transition-all cursor-pointer border-0 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.82l-.24-.24c-1.2-1.2-1.2-3.12 0-4.32l2.01-2.01m8.02 0l2.01 2.01c1.2 1.2 1.2 3.12 0 4.32l-2.01 2.01m-6.01-6.01l6.01 6.01m-6.01 0H9m3 0V18m0-12v.008M12 21a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              View Pass
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handlePrintSingle = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20 print:bg-white print:pb-0">
      
      {/* Navbar hidden in printing */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 print:mt-0 print:p-0">
        
        {/* Success Notice Header block */}
        <div className="text-center animate-fade-in py-6 print:hidden">
          <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Registration Confirmed!</h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] font-medium mt-2.5 max-w-md mx-auto leading-relaxed">
            You are ready! Your free entry tickets have been successfully generated for the 14th FACD-CAB International Expo.
          </p>
        </div>

        {/* Screen-Only Compact Attendee List */}
        <div className="mt-10 border border-slate-200 rounded-2xl overflow-hidden max-w-2xl mx-auto bg-white print:hidden">
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center text-left">
            <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">Attendee Passes ({registeredList.length})</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-wider font-mono">Approved</span>
          </div>
          <div className="divide-y divide-slate-100">
            {registeredList.map((attendee) => (
              <div key={attendee.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 text-left hover:bg-slate-50/30 transition-colors">
                <div>
                  <div className="font-extrabold text-slate-800 text-[15px]">{attendee.fullName}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5 font-medium">{attendee.email}</div>
                  <span className="inline-block mt-2 text-[10px] font-extrabold bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {attendee.type}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTicket(attendee)}
                  className="px-5 py-2.5 bg-[#004b95] hover:bg-[#003972] text-white font-bold text-[12px] rounded-lg transition-all cursor-pointer border-0 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                  </svg>
                  View Ticket
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Print-Only Sequential Tickets Render */}
        <div className="hidden print:block">
          {registeredList.map((attendee) => (
            <TicketCard 
              key={attendee.id} 
              attendee={attendee} 
              onPrint={handlePrintSingle} 
            />
          ))}
        </div>

        {/* Page Footer Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5 print:hidden">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3.5 border border-slate-300 rounded-xl text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            Register More Students
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[13px] font-bold transition-all cursor-pointer border-0"
          >
            Print All Tickets
          </button>
        </div>

      </div>

      {/* Interactive Wallet modal pass viewer */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 font-montserrat animate-fade-in print:hidden">
          <div className="bg-white max-w-[760px] w-full rounded-2xl border border-slate-200 overflow-hidden relative flex flex-col">
            
            {/* Modal Header */}
            <div className="w-full bg-slate-800 text-white p-5 text-center flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded uppercase tracking-wider font-mono">Digital Ticket Pass</span>
              <h3 className="text-[15px] font-black tracking-tight mt-1">{selectedTicket.fullName} — Entry Ticket</h3>
            </div>
            
            {/* Ticket Card render inside modal */}
            <div className="p-6 md:p-10 bg-slate-50 flex items-center justify-center">
              <div className="w-full max-w-[720px] bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row overflow-hidden text-left relative">
                
                {/* Main Portion */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                    <img className="h-7" src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo" />
                    <div className="flex flex-col">
                      <h4 className="text-[11px] font-extrabold text-[#004b95] m-0 leading-none">FACD-CAB</h4>
                      <p className="text-[6.5px] font-semibold text-slate-500 m-0 mt-0.5 leading-none">Foreign Admission & Career Development Consultants Association of Bangladesh</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#d31212] text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded mr-2 uppercase tracking-wider shrink-0 leading-none">14<sup>th</sup></span>
                      <span className="text-[12.5px] font-black uppercase"><span className="text-[#d31212]">FACD-CAB</span> <span className="text-[#004b95]">International Expo 2026</span></span>
                    </div>
                    <p className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest mt-1 mb-0">Connecting Dreams, Creating Global Opportunities</p>
                  </div>
                  
                  <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Ticket Holder</span>
                      <h2 className="text-[15px] font-black text-slate-800 m-0 leading-tight">{selectedTicket.fullName}</h2>
                    </div>
                    <div className="text-right flex flex-col gap-0.5">
                      <div className="text-[10px] text-slate-500 font-medium"><strong>Email:</strong> {selectedTicket.email}</div>
                      <div className="text-[10px] text-slate-500 font-medium"><strong>Phone:</strong> {selectedTicket.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row gap-6 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#d31212]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-0.5">Date & Day</span>
                        <span className="text-[9.5px] text-slate-800 font-black leading-none">10 & 11 July 2026 (Fri & Sat)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-0.5">Venue</span>
                        <span className="text-[9.5px] text-slate-800 font-black leading-none">Pan Pacific Sonargaon, Dhaka</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stub Portion */}
                <div className="w-full sm:w-[200px] bg-slate-50 border-t sm:border-t-0 sm:border-l-2 border-dashed border-slate-300 p-5 flex flex-row sm:flex-col justify-between items-center box-border relative shrink-0">
                  <div className="hidden sm:block absolute w-4 h-4 bg-[#f8fafc] rounded-full border-b border-slate-200 -left-2.5 -top-2.5"></div>
                  <div className="hidden sm:block absolute w-4 h-4 bg-[#f8fafc] rounded-full border-t border-slate-200 -left-2.5 -bottom-2.5"></div>
                  
                  <div className="stub-header text-center w-full">
                    <span className="bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/20 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                      {selectedTicket.type.replace(' Pass', '')} Pass
                    </span>
                  </div>
                  
                  <div className="stub-middle text-center w-full flex flex-col items-center gap-1.5 py-2">
                    <div className="font-mono text-[9px] font-bold text-slate-500">ID: <span className="text-slate-800 font-extrabold">{selectedTicket.ticketId}</span></div>
                    <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="#ffffff" />
                        <rect x="8" y="8" width="26" height="26" fill="#000000" />
                        <rect x="12" y="12" width="18" height="18" fill="#ffffff" />
                        <rect x="16" y="16" width="10" height="10" fill="#000000" />
                        <rect x="66" y="8" width="26" height="26" fill="#000000" />
                        <rect x="70" y="12" width="18" height="18" fill="#ffffff" />
                        <rect x="74" y="16" width="10" height="10" fill="#000000" />
                        <rect x="8" y="66" width="26" height="26" fill="#000000" />
                        <rect x="12" y="70" width="18" height="18" fill="#ffffff" />
                        <rect x="16" y="74" width="10" height="10" fill="#000000" />
                        <rect x="40" y="12" width="6" height="6" fill="#000000" />
                        <rect x="48" y="18" width="8" height="8" fill="#000000" />
                        <rect x="16" y="40" width="8" height="8" fill="#000000" />
                        <rect x="28" y="44" width="12" height="6" fill="#000000" />
                        <rect x="44" y="40" width="14" height="14" fill="#000000" />
                        <rect x="48" y="44" width="6" height="6" fill="#ffffff" />
                        <rect x="68" y="40" width="8" height="8" fill="#000000" />
                        <rect x="80" y="44" width="8" height="6" fill="#000000" />
                        <rect x="40" y="68" width="6" height="12" fill="#000000" />
                        <rect x="52" y="76" width="10" height="8" fill="#000000" />
                        <rect x="68" y="68" width="12" height="12" fill="#000000" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="stub-footer text-center w-full">
                    <span className="text-[8px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 rounded uppercase tracking-wider leading-none">FREE ENTRY</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Actions Footer */}
            <div className="w-full border-t border-slate-200 p-5 bg-slate-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2.5 border border-slate-350 rounded-lg text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer bg-white"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-all cursor-pointer border-0"
              >
                Print Pass
              </button>
            </div>
            
          </div>
        </div>
      )}
      
      {/* Print-only CSS layout to strip headers and stack landscape passes for paper printing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, html {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .ticket-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            margin: 30px auto !important;
            page-break-inside: avoid !important;
          }
        }
      `}} />
    </div>
  );
}
