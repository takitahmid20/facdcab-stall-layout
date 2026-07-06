import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState(null);

  const tranId = searchParams.get('tran_id');
  const bankTranId = searchParams.get('bank_tran_id');
  const amountParam = searchParams.get('amount');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    const savedOrderStr = localStorage.getItem('pending_stall_order');
    if (savedOrderStr) {
      const parsed = JSON.parse(savedOrderStr);
      setOrderInfo(parsed);
      localStorage.removeItem('pending_stall_order');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 flex items-center justify-center font-montserrat">
      <div className="max-w-2xl w-full bg-white rounded-xl border border-slate-200 overflow-hidden print:border-none print:my-0">
        
        {/* Minimalist Top Status Section */}
        <div className="p-8 text-center border-b border-slate-100">
          <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[20px] font-bold text-slate-800 tracking-tight">Booking Confirmed</h1>
          <p className="text-slate-500 text-[13px] mt-1.5 font-medium">Your payment has been successfully processed.</p>
          <div className="text-[11px] text-slate-400 font-mono mt-2 uppercase tracking-wide">{currentDate}</div>
        </div>

        {/* Invoice Summary details */}
        <div className="p-8 flex flex-col gap-6">
          
          {/* Flat structured invoice details */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50/75 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoice Summary</span>
              <span className="text-[10px] font-bold text-[#10b981] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Paid</span>
            </div>

            <div className="divide-y divide-slate-100 text-[13px] text-slate-600">
              <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                <span className="text-slate-400 font-medium">Transaction ID</span>
                <span className="font-mono text-slate-800 text-right break-all">{tranId || 'N/A'}</span>
              </div>
              {bankTranId && (
                <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                  <span className="text-slate-400 font-medium">Bank Ref ID</span>
                  <span className="font-mono text-slate-800 text-right break-all">{bankTranId}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 px-5 py-3.5">
                <span className="text-slate-400 font-medium">Reserved Stall</span>
                <span className="font-bold text-slate-800 text-right">Stall {orderInfo?.stallLabel || 'N/A'}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 py-3.5 bg-slate-50/30">
                <span className="text-slate-700 font-semibold">Total Amount</span>
                <span className="font-bold text-[#10b981] text-right text-[15px]">{fmtBDT(amountParam || orderInfo?.amount || 0)}</span>
              </div>
            </div>
          </div>

          {/* Customer profile cards */}
          {orderInfo && (
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-3.5 text-[13px]">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Customer Details</h3>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-400 font-medium">Name</span>
                <span className="col-span-2 text-slate-800 font-semibold">{orderInfo.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-400 font-medium">Email</span>
                <span className="col-span-2 text-slate-800 font-medium break-all">{orderInfo.email}</span>
              </div>
              {orderInfo.phone && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="col-span-2 text-slate-800 font-medium">{orderInfo.phone}</span>
                </div>
              )}
            </div>
          )}

          {/* Flat Blue Notification Card */}
          <div className="bg-[#f0f7ff] border border-blue-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.8a2 2 0 012.22 0l8 4.8A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-blue-800">Check Your Email</h4>
              <p className="text-[12.5px] text-blue-600/90 mt-1 leading-relaxed font-medium">
                We have sent an confirmation email to <strong className="text-blue-800">{orderInfo?.email || 'your email address'}</strong>. 
                Please check your inbox (and spam/promotions folders) to retrieve your official booking token and guidelines for the exhibition stall setup.
              </p>
            </div>
          </div>

          {/* Action buttons (Flat design) */}
          <div className="flex gap-4 mt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600 text-[13px] flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 022-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
            <a
              href="/"
              className="flex-[2] py-3 px-4 rounded-lg bg-[#155dfc] text-white hover:bg-[#0c4fd4] transition-all font-bold text-[13px] flex items-center justify-center gap-1 cursor-pointer text-center"
            >
              Back to Home
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
