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
          <div className="bg-white p-8 rounded-2xl border border-slate-350 shadow-lg">
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-[17px] font-black text-slate-800 tracking-tight">No Active Registrations Found</h2>
            <p className="text-slate-500 text-[13px] mt-2 font-medium">Please fill out the registration form first to receive your tickets.</p>
            <Link
              to="/register"
              className="mt-6 inline-block w-full py-3 bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white font-extrabold text-[12px] rounded-lg shadow-md hover:scale-[1.02] transition-all no-underline"
            >
              Go to Registration Form
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* Success Notice Container */}
        <div className="text-center animate-fade-in py-6">
          <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_6px_20px_rgba(16,185,129,0.25)]">
            <svg className="w-8 h-8 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Registration Confirmed!</h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] font-medium mt-2.5 max-w-md mx-auto leading-relaxed">
            You are ready! Your free tickets have been successfully generated for the 14th FACD-CAB International Expo.
          </p>

          {/* Attendee Pass List - Clean Card */}
          <div className="mt-10 border border-slate-200 rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.02)] bg-white">
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
                    <span className="inline-block mt-2 text-[10px] font-extrabold bg-[#155dfc]/5 text-[#155dfc] border border-[#155dfc]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {attendee.type}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(attendee)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white font-bold text-[12px] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-0 flex items-center justify-center gap-1.5"
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

          {/* Action Trigger Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer bg-white"
            >
              Register More Students
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg text-[13px] font-bold hover:bg-slate-900 transition-all cursor-pointer border-0"
            >
              Print All Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Pass Modal Overlay */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 font-montserrat animate-fade-in print:bg-white print:p-0 print:absolute print:inset-0">
          
          <div className="bg-white max-w-[360px] sm:max-w-md w-full rounded-2xl border border-slate-350 overflow-hidden shadow-2xl relative flex flex-col items-center justify-between print:shadow-none print:border-none print:my-0">
            
            {/* Modal Header */}
            <div className="w-full bg-slate-800 text-white p-5 text-center flex flex-col items-center gap-1.5 print:bg-transparent print:text-slate-800 print:p-2">
              <button 
                onClick={() => setSelectedTicket(null)} 
                className="absolute top-4 right-4 text-white/60 hover:text-white border-0 bg-transparent cursor-pointer font-bold text-sm print:hidden"
              >
                ✕
              </button>
              
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center mb-1 print:hidden">
                <img 
                  src="https://www.facdcab.org/images/logo.svg" 
                  alt="FACD-CAB" 
                  className="h-5" 
                />
              </div>
              
              <h3 className="text-[13.5px] font-black tracking-wide uppercase">FACD-CAB Education Expo</h3>
              <p className="text-[10px] text-white/70 font-semibold tracking-wider uppercase font-mono print:text-slate-500">Free Entry Ticket</p>
            </div>

            {/* Ticket Card Body */}
            <div className="p-6 w-full flex flex-col items-center gap-6">
              
              {/* Event Badge Details */}
              <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-5 flex flex-col items-center text-center relative print:border-solid print:border">
                
                {/* Simulated Ticket Tear Lines */}
                <div className="absolute top-1/2 -left-3.5 w-6 h-6 bg-[#f8fafc] border-r border-slate-300 rounded-full -translate-y-1/2 print:hidden"></div>
                <div className="absolute top-1/2 -right-3.5 w-6 h-6 bg-[#f8fafc] border-l border-slate-300 rounded-full -translate-y-1/2 print:hidden"></div>

                <span className="bg-[#155dfc]/10 text-[#155dfc] font-black text-[9.5px] px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#155dfc]/15">
                  {selectedTicket.type}
                </span>

                <div className="mt-4 font-black text-[19px] text-slate-800 tracking-tight">
                  {selectedTicket.fullName}
                </div>
                <div className="text-[12.5px] text-slate-650 font-semibold mt-1">
                  {selectedTicket.email}
                </div>
                <div className="text-[12px] text-slate-500 font-semibold font-mono mt-0.5">
                  {selectedTicket.phone}
                </div>

                <div className="w-full border-t border-dashed border-slate-300 my-4"></div>

                <div className="grid grid-cols-2 w-full text-left gap-4 text-[11.5px] font-bold text-slate-600">
                  <div>
                    <span className="text-[9.5px] uppercase tracking-wide font-black text-slate-400">Date</span>
                    <p className="font-extrabold text-slate-800 mt-0.5">Aug 7 & 8, 2026</p>
                  </div>
                  <div>
                    <span className="text-[9.5px] uppercase tracking-wide font-black text-slate-400">Venue</span>
                    <p className="font-extrabold text-slate-800 mt-0.5 max-w-[130px] leading-tight">Pan Pacific Sonargaon, Dhaka</p>
                  </div>
                </div>
              </div>

              {/* Barcode & Ticket ID */}
              <div className="flex flex-col items-center gap-2">
                <div className="font-mono text-[10.5px] font-bold text-slate-450 uppercase tracking-widest">
                  Ticket ID: <span className="text-slate-800 font-black">{selectedTicket.ticketId}</span>
                </div>
                
                {/* SVG Barcode Graphics */}
                <div className="h-10 w-44 flex items-center justify-between opacity-90 mt-1 select-none">
                  {Array.from({ length: 32 }, (_, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-850 h-full"
                      style={{
                        width: Math.random() > 0.4 ? '2px' : '4.5px',
                        opacity: Math.random() > 0.15 ? 1 : 0.25
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Print Action Bottom */}
            <div className="w-full p-5 border-t border-slate-200 flex gap-2.5 print:hidden bg-slate-50">
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex-1 py-2.5 bg-white hover:bg-slate-100 text-slate-600 font-bold text-[12px] rounded-lg border border-slate-300 transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[12px] rounded-lg transition-all cursor-pointer border-0"
              >
                Print Ticket
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
