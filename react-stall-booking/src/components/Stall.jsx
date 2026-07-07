import React from 'react';

export function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function Stall({ unit, onClick }) {
  const { id, label, price, left, top, width, height, status, holdRemaining } = unit;

  // Pixel-precise absolute positioning must remain as inline styles
  const style = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const getTooltip = () => {
    if (status === 'booked') return `Stall ${label} — already booked`;
    if (status === 'held-other') return `Stall ${label} — on hold by another visitor (${holdRemaining}s left)`;
    if (status === 'held-mine') return `Stall ${label} — held by you (${holdRemaining}s left)`;
    return `Stall ${label} — available, ${fmtBDT(price)}`;
  };

  const handleStallClick = () => {
    if (status === 'available' || status === 'held-mine') {
      onClick(id);
    }
  };

  // Build className based on status
  const baseClasses = 'absolute flex flex-col items-center justify-center text-center cursor-pointer rounded-[4px] border transition-all duration-150 select-none overflow-hidden z-10';
  
  let statusClasses = '';
  if (status === 'available') {
    statusClasses = 'bg-[#eefcf5] border-[#22c55e] text-[#15803d] hover:bg-[#dcfce7] hover:border-[#16a34a] hover:scale-[1.04] hover:z-20 hover:shadow-[0_4px_12px_rgba(34,197,94,0.15)]';
  } else if (status === 'held-mine') {
    statusClasses = 'bg-[#155dfc] border-[#155dfc] text-white shadow-[0_4px_14px_rgba(21,93,252,0.25)] scale-[1.04] z-20';
  } else if (status === 'held-other') {
    statusClasses = 'stripe-held-other border-[#f59e0b] text-[#b45309] font-bold cursor-not-allowed';
  } else if (status === 'booked') {
    statusClasses = 'stripe-booked border-[#94a3b8] text-[#475569] font-bold cursor-not-allowed';
  }

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={style}
      title={getTooltip()}
      onClick={handleStallClick}
    >
      <div className="font-space-mono text-[11px] font-bold leading-none">{label}</div>
      <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(price)}</div>
      {status === 'held-other' && <div className="font-space-mono text-[8px] font-bold text-amber-600 mt-0.5">{holdRemaining}s</div>}
      {status === 'held-mine' && <div id="miniTimerMine" className="font-space-mono text-[8px] font-bold text-white mt-0.5">{holdRemaining}s</div>}
    </div>
  );
}
