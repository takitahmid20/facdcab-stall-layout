import React from 'react';

export function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function Stall({ unit, onClick }) {
  const { id, label, nums, price, left, top, width, height, tier, status, holdRemaining } = unit;

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

  // Package tier tint for available stalls — translucent so it still reads as "open" at a glance
  const TIER_CLASSES = {
    premium: 'bg-[#8b5cf6]/[0.14] border-[#8b5cf6]/60 text-[#6d28d9] hover:bg-[#8b5cf6]/[0.24] hover:border-[#7c3aed] hover:scale-[1.04] hover:z-20 hover:shadow-[0_4px_12px_rgba(139,92,246,0.2)]',
    sponsor: 'bg-[#38bdf8]/[0.14] border-[#38bdf8]/60 text-[#0369a1] hover:bg-[#38bdf8]/[0.24] hover:border-[#0ea5e9] hover:scale-[1.04] hover:z-20 hover:shadow-[0_4px_12px_rgba(56,189,248,0.2)]',
    standard: 'bg-[#ec4899]/[0.12] border-[#ec4899]/55 text-[#be185d] hover:bg-[#ec4899]/[0.22] hover:border-[#db2777] hover:scale-[1.04] hover:z-20 hover:shadow-[0_4px_12px_rgba(236,72,153,0.2)]',
  };

  let statusClasses = '';
  if (status === 'available') {
    statusClasses = TIER_CLASSES[tier] || TIER_CLASSES.standard;
  } else if (status === 'held-mine') {
    statusClasses = 'bg-[#155dfc] border-[#155dfc] text-white shadow-[0_4px_14px_rgba(21,93,252,0.25)] scale-[1.04] z-20';
  } else if (status === 'held-other') {
    statusClasses = 'stripe-held-other border-[#f59e0b] text-[#b45309] font-bold cursor-not-allowed';
  } else if (status === 'booked') {
    statusClasses = 'stripe-booked border-[#94a3b8] text-[#475569] font-bold cursor-not-allowed';
  }

  if (nums.length > 1) {
    const isVertical = height > width;
    const priceHalf = price / 2;
    const dividerColor = status === 'held-mine' ? 'rgba(255,255,255,0.4)' : 'currentColor';
    const dividerStyle = isVertical
      ? { borderBottom: `1px dashed ${dividerColor}`, opacity: 0.9 }
      : { borderRight: `1px dashed ${dividerColor}`, opacity: 0.9 };
    return (
      <div
        className={`${baseClasses} ${statusClasses}`}
        style={style}
        title={getTooltip()}
        onClick={handleStallClick}
      >
        <div className="flex w-full h-full" style={{ flexDirection: isVertical ? 'column' : 'row' }}>
          <div className="flex-1 flex flex-col items-center justify-center" style={dividerStyle}>
            <div className="font-space-mono text-[11px] font-bold leading-none">{nums[0]}</div>
            <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(priceHalf)}</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="font-space-mono text-[11px] font-bold leading-none">{nums[1]}</div>
            <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(priceHalf)}</div>
            {status === 'held-other' && <div className="absolute bottom-0.5 right-1 font-space-mono text-[8px] font-bold text-amber-600">{holdRemaining}s</div>}
            {status === 'held-mine' && <div id="miniTimerMine" className="absolute bottom-0.5 right-1 font-space-mono text-[8px] font-bold text-white">{holdRemaining}s</div>}
          </div>
        </div>
      </div>
    );
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
