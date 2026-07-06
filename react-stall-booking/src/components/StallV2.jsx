import React from 'react';

export function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function StallV2({
  unit,
  onClick,
  isEditorMode = false,
  isBeingDragged = false,
  isMergeTarget = false,
  onDragStart = () => {}
}) {
  const { id, label, nums, price, left, top, width, height, isCorner, status, holdRemaining } = unit;

  const style = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const getTooltip = () => {
    if (isEditorMode) return `Stall ${label} — drag to reposition, drop on another to merge`;
    if (status === 'booked') return `Stall ${label} — already booked`;
    if (status === 'held-other') return `Stall ${label} — on hold by another visitor (${holdRemaining}s left)`;
    if (status === 'held-mine') return `Stall ${label} — held by you (${holdRemaining}s left)`;
    return `Stall ${label} — available, ${fmtBDT(price)}${nums.length > 1 ? ' (combined pair)' : ''}`;
  };

  let firstNum = nums[0];
  let secondNum = nums[1] || nums[0];
  if (isCorner) {
    if (id === 'u51-52') { firstNum = 52; secondNum = 51; }
    else if (id === 'u41-42') { firstNum = 42; secondNum = 41; }
    else if (id === 'u13-14') { firstNum = 14; secondNum = 13; }
    else if (id === 'u1-2') { firstNum = 2; secondNum = 1; }
    else if (id === 'u11-12') { firstNum = 12; secondNum = 11; }
    else if (id === 'u15-16') { firstNum = 16; secondNum = 15; }
    else if (id === 'u22-23') { firstNum = 23; secondNum = 22; }
    else if (id === 'u49-50') { firstNum = 50; secondNum = 49; }
    else if (id === 'u39-40') { firstNum = 40; secondNum = 39; }
    else if (id === 'u34-35') { firstNum = 35; secondNum = 34; }
    else if (id === 'u24-25') { firstNum = 24; secondNum = 25; }
    else if (id === 'u32-33') { firstNum = 32; secondNum = 33; }
  }

  const isVertical = height > width;
  const priceHalf = price / 2;
  const splitDivider = status === 'held-mine'
    ? (isVertical ? { borderBottom: '1px dashed rgba(255,255,255,0.4)' } : { borderRight: '1px dashed rgba(255,255,255,0.4)' })
    : (isVertical ? { borderBottom: '1px dashed #e2e8f0' } : { borderRight: '1px dashed #e2e8f0' });

  const handleStallClick = () => {
    onClick(id);
  };

  let baseClasses = 'absolute flex flex-col items-center justify-center text-center rounded-[4px] border transition-all duration-150 select-none overflow-hidden z-10';
  
  if (isEditorMode) {
    baseClasses += isBeingDragged ? ' cursor-grabbing' : ' cursor-grab';
  } else {
    baseClasses += ' cursor-pointer';
  }
  
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

  if (isEditorMode) {
    if (isBeingDragged) {
      statusClasses = 'bg-amber-50 border-2 border-dashed border-amber-500 text-amber-800 scale-[1.03] opacity-80 z-50';
    } else if (isMergeTarget) {
      statusClasses = 'bg-indigo-100 border-2 border-solid border-indigo-600 text-indigo-900 scale-[1.05] animate-pulse z-50';
    }
  }

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={style}
      title={getTooltip()}
      onClick={handleStallClick}
      onMouseDown={(e) => onDragStart(e)}
    >
      {nums.length > 1 ? (
        <div className="flex w-full h-full" style={{ flexDirection: isVertical ? 'column' : 'row' }}>
          <div className="flex-1 flex flex-col items-center justify-center" style={splitDivider}>
            <div className="font-space-mono text-[11px] font-bold leading-none">{firstNum}</div>
            <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(priceHalf)}</div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="font-space-mono text-[11px] font-bold leading-none">{secondNum}</div>
            <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(priceHalf)}</div>
            {status === 'held-other' && <div className="absolute bottom-0.5 right-1 font-space-mono text-[8px] font-bold text-amber-600">{holdRemaining}s</div>}
            {status === 'held-mine' && <div id="miniTimerMine" className="absolute bottom-0.5 right-1 font-space-mono text-[8px] font-bold text-white">{holdRemaining}s</div>}
          </div>
        </div>
      ) : (
        <>
          <div className="font-space-mono text-[11px] font-bold leading-none">{label}</div>
          <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(price)}</div>
          {status === 'held-other' && <div className="font-space-mono text-[8px] font-bold text-amber-600 mt-0.5">{holdRemaining}s</div>}
          {status === 'held-mine' && <div id="miniTimerMine" className="font-space-mono text-[8px] font-bold text-white mt-0.5">{holdRemaining}s</div>}
        </>
      )}
    </div>
  );
}
