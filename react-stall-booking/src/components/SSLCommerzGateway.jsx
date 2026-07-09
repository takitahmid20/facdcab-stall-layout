import React, { useState } from 'react';
import { fmtBDT } from './Stall';

export default function SSLCommerzGateway({ amount, orderId, storeId, onSuccess, onFailure }) {
  const [method, setMethod] = useState('card');
  const [subMethod, setSubMethod] = useState('visa');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!otpStep) {
      if (!mobileNumber) return;
      setOtpStep(true);
    } else {
      if (!otp || !pin) return;
      onSuccess();
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) return;
    onSuccess();
  };

  const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded-md text-[13.5px] outline-none transition-all duration-150 focus:border-[#155dfc] focus:-[0_0_0_2px_rgba(21,93,252,0.1)] bg-white text-slate-800 font-[Inter,sans-serif]";
  const labelClass = "block text-[11px] font-semibold text-slate-500 mb-1.5 tracking-wide";

  const sideTab = (id, icon, label) => (
    <div
      className={`px-5 py-3.5 text-[13px] font-semibold cursor-pointer transition-all duration-150 select-none ${method === id ? 'bg-white text-[#155dfc] border-l-4 border-[#155dfc] pl-[16px]' : 'text-slate-500 hover:text-slate-700 hover:bg-white/60 border-l-4 border-transparent'}`}
      onClick={() => {
        setMethod(id);
        if (id === 'card') setSubMethod('visa');
        if (id === 'mobile') { setSubMethod('bkash'); setOtpStep(false); }
        if (id === 'net') setSubMethod('islami');
      }}
    >
      {icon} {label}
    </div>
  );

  const logoBtn = (id, label, active) => (
    <div
      key={id}
      className={`px-3.5 py-2 border rounded-lg text-[11px] font-bold cursor-pointer transition-all duration-150 select-none ${active ? 'border-[#155dfc] bg-blue-50 text-[#155dfc] -[0_0_0_2px_rgba(21,93,252,0.15)]' : 'border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400'}`}
      onClick={() => { if (method === 'mobile') { setSubMethod(id); setOtpStep(false); } else setSubMethod(id); }}
    >
      {label}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#eef2f6] z-[9999] flex items-center justify-center p-6 font-[Inter,sans-serif]">
      <div className="w-full max-w-[750px] bg-white rounded-2xl -[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-200 flex flex-col">

        {/* Warning bar */}
        <div className="bg-orange-600 text-white text-[11px] font-bold text-center py-1.5 px-3 tracking-[0.05em]">
          ⚠️ SSLCOMMERZ SANDBOX GATEWAY (TEST ENVIRONMENT)
        </div>

        {/* Info bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="text-[16px] font-bold text-slate-800">FACD-CAB International Expo 2026</div>
            <div className="text-[12px] text-slate-500 mt-0.5">Merchant Store ID: <b className="text-slate-700">{storeId}</b></div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase font-semibold text-slate-500 tracking-[0.05em]">Amount to Pay</div>
            <div className="text-[22px] font-extrabold text-[#155dfc]">{fmtBDT(amount)}</div>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid min-h-[360px]" style={{ gridTemplateColumns: '220px 1fr' }}>

          {/* Sidebar */}
          <div className="bg-slate-100 border-r border-slate-200 flex flex-col py-4">
            {sideTab('card', '💳', 'Cards (Credit/Debit)')}
            {sideTab('mobile', '📱', 'Mobile Banking')}
            {sideTab('net', '🏦', 'Internet Banking')}
            <div className="mt-auto px-5 py-4 text-[11px] font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors" onClick={onFailure}>
              ← Cancel & Return to merchant
            </div>
          </div>

          {/* Form pane */}
          <div className="px-8 py-6">

            {/* CARD FORM */}
            {method === 'card' && (
              <div>
                <div className="text-[13px] font-semibold text-slate-700 mb-3">Select your card type:</div>
                <div className="flex gap-2.5 mb-6">
                  {[['visa','VISA'],['mastercard','MASTERCARD'],['amex','AMEX']].map(([id, lbl]) => logoBtn(id, lbl, subMethod === id))}
                </div>
                <form onSubmit={handleCardSubmit} className="flex flex-col gap-3.5">
                  <div><label className={labelClass}>Card Number</label>
                    <input type="text" required placeholder="4111 2222 3333 4444" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={inputClass} /></div>
                  <div className="flex gap-3">
                    <div className="flex-1"><label className={labelClass}>Expiration Date</label>
                      <input type="text" required placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className={inputClass} /></div>
                    <div className="flex-1"><label className={labelClass}>CVV/CVC</label>
                      <input type="password" required placeholder="123" maxLength="4" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Cardholder Name</label>
                    <input type="text" required placeholder="e.g. Md. Karim Uddin" value={cardName} onChange={(e) => setCardName(e.target.value)} className={inputClass} /></div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={onFailure} className="flex-1 py-3 rounded-lg text-[13px] font-bold border border-red-400 text-red-500 bg-white hover:bg-red-50 transition-all cursor-pointer">Simulate Failure</button>
                    <button type="submit" className="flex-[2] py-3 rounded-lg text-[13px] font-bold text-white bg-[#155dfc] -[0_4px_10px_rgba(21,93,252,0.15)] hover:bg-[#1047d4] transition-all cursor-pointer border-0">Pay {fmtBDT(amount)}</button>
                  </div>
                </form>
              </div>
            )}

            {/* MOBILE BANKING FORM */}
            {method === 'mobile' && (
              <div>
                <div className="text-[13px] font-semibold text-slate-700 mb-3">Select mobile wallet:</div>
                <div className="flex gap-2.5 mb-6">
                  {[['bkash','bKash'],['nagad','Nagad'],['rocket','Rocket']].map(([id, lbl]) => logoBtn(id, lbl, subMethod === id))}
                </div>
                <form onSubmit={handleMobileSubmit} className="flex flex-col gap-3.5">
                  {!otpStep ? (
                    <div>
                      <label className={labelClass}>Enter your {subMethod} Mobile Number</label>
                      <input type="tel" required placeholder="01XXXXXXXXX" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className={inputClass} />
                      <small className="text-[11px] text-slate-400 mt-1 block">We will send a 6-digit OTP code to this number.</small>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[12.5px] text-teal-700 bg-teal-50 border border-teal-200 px-3 py-2 rounded-lg mb-3">OTP code has been sent to <b>{mobileNumber}</b></div>
                      <div className="flex gap-3">
                        <div className="flex-1"><label className={labelClass}>Enter 6-Digit OTP</label>
                          <input type="text" required placeholder="123456" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className={inputClass} /></div>
                        <div className="flex-1"><label className={labelClass}>Wallet PIN</label>
                          <input type="password" required placeholder="••••" maxLength="5" value={pin} onChange={(e) => setPin(e.target.value)} className={inputClass} /></div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={onFailure} className="flex-1 py-3 rounded-lg text-[13px] font-bold border border-red-400 text-red-500 bg-white hover:bg-red-50 transition-all cursor-pointer">Simulate Failure</button>
                    <button type="submit" className="flex-[2] py-3 rounded-lg text-[13px] font-bold text-white bg-[#155dfc] -[0_4px_10px_rgba(21,93,252,0.15)] hover:bg-[#1047d4] transition-all cursor-pointer border-0">
                      {!otpStep ? 'Next (Receive OTP)' : `Confirm Payment of ${fmtBDT(amount)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* NET BANKING FORM */}
            {method === 'net' && (
              <div>
                <div className="text-[13px] font-semibold text-slate-700 mb-3">Select internet bank:</div>
                <div className="flex gap-2.5 mb-6">
                  {[['islami','Islami Bank'],['city','City Touch'],['dbbl','DBBL Net']].map(([id, lbl]) => logoBtn(id, lbl, subMethod === id))}
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                  Clicking continue will redirect to the mock secure portal of <b className="text-slate-700">{subMethod === 'islami' ? 'Islami Bank Bangladesh PLC' : subMethod === 'city' ? 'City Touch Portal' : 'Dutch-Bangla Bank NetBanking'}</b> to authorize this transaction of <b className="text-slate-700">{fmtBDT(amount)}</b>.
                </p>
                <div className="flex gap-3">
                  <button onClick={onFailure} className="flex-1 py-3 rounded-lg text-[13px] font-bold border border-red-400 text-red-500 bg-white hover:bg-red-50 transition-all cursor-pointer">Cancel</button>
                  <button onClick={onSuccess} className="flex-[2] py-3 rounded-lg text-[13px] font-bold text-white bg-[#155dfc] -[0_4px_10px_rgba(21,93,252,0.15)] hover:bg-[#1047d4] transition-all cursor-pointer border-0">Process Checkout</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 text-[11px] text-slate-400 text-center">
          Secure Transaction Processing by <b className="text-slate-600">SSLCOMMERZ</b>. Sandbox active under merchant credentials.
        </div>
      </div>
    </div>
  );
}
