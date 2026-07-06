import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div id="toastWrap" className="fixed top-6 left-1/2 -translate-x-1/2 z-[600] flex flex-col gap-2 items-center">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-slate-800 text-white text-[13px] font-semibold font-montserrat px-4 py-3 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] max-w-[320px] animate-[fadeInUp_0.3s_ease]"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
}
