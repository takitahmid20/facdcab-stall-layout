import React, { useState, useEffect } from 'react';
import { fmtBDT } from './Stall';

const MEMBERS = [
  {
    email: 'karim@bexport.com',
    phone: '01711000111',
    name: 'Md. Karim Uddin',
    company: 'Bengal Exporters Ltd.',
    history: [
      { label: 'Stall 45', event: 'Dhaka Trade Expo 2025', amount: 80000, date: '02 Nov 2025' },
      { label: 'Corner Stall 11-12', event: 'Leather Fair 2024', amount: 160000, date: '14 Aug 2024' }
    ]
  },
  {
    email: 'nusrat@apextex.com',
    phone: '01822334455',
    name: 'Nusrat Jahan',
    company: 'Apex Textiles',
    history: [
      { label: 'Stall 68', event: 'Textile Summit 2025', amount: 80000, date: '20 Mar 2025' }
    ]
  }
];

export default function CheckoutModal({ heldStalls, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [matchedMember, setMatchedMember] = useState(null);

  useEffect(() => {
    const member = MEMBERS.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
    if (member) {
      setMatchedMember(member);
      setName(member.name);
      setPhone(member.phone);
      setCompany(member.company);
    } else {
      setMatchedMember(null);
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }
    onSubmit({ name, email, phone, company });
  };

  if (!heldStalls || heldStalls.length === 0) return null;

  const totalAmount = heldStalls.reduce((sum, u) => sum + u.price, 0);
  const combinedLabels = heldStalls.map((u) => u.label).join(', ');
  const minHoldRemaining = Math.min(...heldStalls.map((u) => u.holdRemaining));

  const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-montserrat outline-none transition-all duration-150 focus:border-[#155dfc] focus:shadow-[0_0_0_3px_rgba(21,93,252,0.1)] bg-white text-slate-800";
  const labelClass = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-montserrat";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[500] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.12)] w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">

        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-montserrat text-[20px] font-extrabold text-slate-800 m-0">Checkout</h2>
            <p className="font-montserrat text-[12.5px] text-slate-500 mt-1 m-0">Reserving Stalls: {combinedLabels}</p>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer border-0 bg-transparent text-[16px]" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Timer */}
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 font-montserrat">
            <span className="text-[12.5px] font-semibold text-amber-700">Holds expire in:</span>
            <b className="font-space-mono text-[18px] font-bold text-amber-600">{minHoldRemaining}s</b>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className={labelClass}>Email address *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputClass} />
            </div>

            {/* Member Match Card */}
            {matchedMember && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 font-montserrat">
                <div className="text-[12.5px] font-bold text-blue-700 mb-2">🎉 FACD-CAB Registered Member Found</div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-1.5 text-slate-600 font-semibold">Past Reservation</th>
                      <th className="text-right py-1.5 text-slate-600 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedMember.history.map((h, i) => (
                      <tr key={i} className="border-b border-blue-100 last:border-0">
                        <td className="py-1.5 text-slate-700">{h.label} ({h.event})</td>
                        <td className="py-1.5 text-right font-semibold text-slate-700">{fmtBDT(h.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className={labelClass}>Full name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Md. Karim Uddin" className={inputClass} />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone number *</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="017XXXXXXXX" className={inputClass} />
            </div>

            {/* Company */}
            <div>
              <label className={labelClass}>Company name</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Bengal Exporters Ltd." className={inputClass} />
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col gap-2">
              {heldStalls.map((s, idx) => (
                <div key={idx} className="flex justify-between text-[13px] border-b border-slate-200/40 pb-1 last:border-0 last:pb-0 font-montserrat">
                  <span className="text-slate-600">Stall {s.label} ({s.isCorner ? 'Corner Pair' : s.nums?.length > 1 ? 'Combined Pair' : 'Standard'}):</span>
                  <span className="font-semibold text-slate-700">{fmtBDT(s.price)}</span>
                </div>
              ))}
              <div className="flex justify-between font-extrabold text-[15px] mt-2 font-montserrat">
                <span className="text-slate-700">Total Price:</span>
                <b className="text-[#155dfc]">{fmtBDT(totalAmount)}</b>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button type="button"
                className="flex-1 py-3 rounded-xl text-[13px] font-bold font-montserrat border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-all cursor-pointer"
                onClick={onClose}>Cancel</button>
              <button type="submit"
                className="flex-[2] py-3 rounded-xl text-[13px] font-bold font-montserrat text-white bg-gradient-to-r from-[#155dfc] to-[#4f39f6] shadow-[0_4px_12px_rgba(21,93,252,0.2)] hover:shadow-[0_6px_18px_rgba(21,93,252,0.35)] hover:scale-[1.01] transition-all cursor-pointer border-0">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
