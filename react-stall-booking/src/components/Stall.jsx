import React from 'react';

export function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function Stall({ unit, onClick }) {
  const { id, label, nums, price, left, top, width, height, isCorner, status, holdRemaining } = unit;

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
    return `Stall ${label} — available, ${fmtBDT(price)}${nums.length > 1 ? ' (combined pair)' : ''}`;
  };

  // Determine correct display order for number pairs
  let firstNum = nums[0];
  let secondNum = nums[1] || nums[0];
  if (isCorner) {
    if (id === 'u51-52') { firstNum = 52; secondNum = 51; }
    else if (id === 'u41-42') { firstNum = 42; secondNum = 41; }
    else if (id === 'u13-14') { firstNum = 14; secondNum = 13; }
    else if (id === 'u1-2') { firstNum = 2; secondNum = 1; }
    else if (id === 'u10-11') { firstNum = 11; secondNum = 10; }
    else if (id === 'u15-16') { firstNum = 16; secondNum = 15; }
    else if (id === 'u22-23') { firstNum = 23; secondNum = 22; }
    else if (id === 'u49-50') { firstNum = 50; secondNum = 49; }
    else if (id === 'u35-36') { firstNum = 36; secondNum = 35; }
    else if (id === 'u44-45') { firstNum = 45; secondNum = 44; }
    else if (id === 'u24-25') { firstNum = 24; secondNum = 25; }
    else if (id === 'u32-33') { firstNum = 32; secondNum = 33; }
    // Top row pairs
    else if (id === 'u57-58') { firstNum = 57; secondNum = 58; }
    else if (id === 'u61-62') { firstNum = 61; secondNum = 62; }
    // Cluster pairs
    else if (id === 'u65-66') { firstNum = 66; secondNum = 65; }
    else if (id === 'u63-64') { firstNum = 64; secondNum = 63; }
    else if (id === 'u67-68') { firstNum = 67; secondNum = 68; }
    else if (id === 'u69-70') { firstNum = 69; secondNum = 70; }
    else if (id === 'u71-72') { firstNum = 71; secondNum = 72; }
    else if (id === 'u73-74') { firstNum = 73; secondNum = 74; }
    else if (id === 'u75-76') { firstNum = 75; secondNum = 76; }
    else if (id === 'u77-78') { firstNum = 77; secondNum = 78; }
    else if (id === 'u81-82') { firstNum = 82; secondNum = 81; }
    else if (id === 'u79-80') { firstNum = 80; secondNum = 79; }
    else if (id === 'u83-84') { firstNum = 83; secondNum = 84; }
    else if (id === 'u85-86') { firstNum = 85; secondNum = 86; }
    else if (id === 'u89-90') { firstNum = 90; secondNum = 89; }
    else if (id === 'u87-88') { firstNum = 88; secondNum = 87; }
    else if (id === 'u91-92') { firstNum = 91; secondNum = 92; }
    else if (id === 'u93-94') { firstNum = 93; secondNum = 94; }
  }

  const isVertical = height > width;
  const priceHalf = price / 2;
  const splitDivider = status === 'held-mine'
    ? (isVertical ? { borderBottom: '1px dashed rgba(255,255,255,0.4)' } : { borderRight: '1px dashed rgba(255,255,255,0.4)' })
    : (isVertical ? { borderBottom: '1px dashed #e2e8f0' } : { borderRight: '1px dashed #e2e8f0' });

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

  if (id === 'u12-13-14') {
    return (
      <div
        className="absolute select-none pointer-events-none z-10"
        style={style}
        title={getTooltip()}
      >
        {/* Stall 14 (Left - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '58px',
            height: '58px',
            borderRight: 'none',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 bottom-0 right-0 border-r border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">14</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {/* Stall 13 (Aisle 2 Right Corner - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '58px',
            top: '0px',
            width: '58px',
            height: '58px',
            borderLeft: 'none',
            borderBottom: 'none',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="font-space-mono text-[11px] font-bold leading-none">13</div>
          <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
        </div>

        {/* Stall 12 (Right Column Top - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '58px',
            top: '58px',
            width: '58px',
            height: '58px',
            borderTop: 'none',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 right-0 border-t border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">12</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {status === 'held-other' && (
          <div className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-amber-600 z-30 pointer-events-none bg-white px-1 py-0.5 rounded border border-amber-300">
            {holdRemaining}s
          </div>
        )}
        {status === 'held-mine' && (
          <div id="miniTimerMine" className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-white z-30 pointer-events-none bg-blue-600 px-1 py-0.5 rounded">
            {holdRemaining}s
          </div>
        )}
      </div>
    );
  }

  if (id === 'u41-42-43') {
    return (
      <div
        className="absolute select-none pointer-events-none z-10"
        style={style}
        title={getTooltip()}
      >
        {/* Stall 43 (Top - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '58px',
            height: '58px',
            borderBottom: 'none',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="font-space-mono text-[11px] font-bold leading-none">43</div>
          <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
        </div>

        {/* Stall 42 (Corner - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '0px',
            top: '58px',
            width: '58px',
            height: '58px',
            borderTop: 'none',
            borderRight: 'none',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 right-0 border-t border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">42</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {/* Stall 41 (Right - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '58px',
            top: '58px',
            width: '58px',
            height: '58px',
            borderLeft: 'none',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 bottom-0 left-0 border-l border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">41</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {status === 'held-other' && (
          <div className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-amber-600 z-30 pointer-events-none bg-white px-1 py-0.5 rounded border border-amber-300">
            {holdRemaining}s
          </div>
        )}
        {status === 'held-mine' && (
          <div id="miniTimerMine" className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-white z-30 pointer-events-none bg-blue-600 px-1 py-0.5 rounded">
            {holdRemaining}s
          </div>
        )}
      </div>
    );
  }

  if (id === 'u54-55-56') {
    return (
      <div
        className="absolute select-none pointer-events-none z-10"
        style={style}
        title={getTooltip()}
      >
        {/* Stall 55 (Corner - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '58px',
            height: '58px',
            borderBottom: 'none',
            borderRight: 'none',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="font-space-mono text-[11px] font-bold leading-none">55</div>
          <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
        </div>

        {/* Stall 54 (Bottom - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '0px',
            top: '58px',
            width: '58px',
            height: '58px',
            borderTop: 'none',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 right-0 border-t border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">54</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {/* Stall 56 (Right - Square Box) */}
        <div
          className={`${baseClasses} ${statusClasses} pointer-events-auto`}
          style={{
            position: 'absolute',
            left: '58px',
            top: '0px',
            width: '58px',
            height: '58px',
            borderLeft: 'none',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px'
          }}
          onClick={handleStallClick}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 bottom-0 left-0 border-l border-dashed border-current/30"></div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-space-mono text-[11px] font-bold leading-none">56</div>
              <div className="font-montserrat text-[8.5px] font-semibold mt-0.5 opacity-70">{fmtBDT(80000)}</div>
            </div>
          </div>
        </div>

        {status === 'held-other' && (
          <div className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-amber-600 z-30 pointer-events-none bg-white px-1 py-0.5 rounded border border-amber-300">
            {holdRemaining}s
          </div>
        )}
        {status === 'held-mine' && (
          <div id="miniTimerMine" className="absolute top-[8px] right-[8px] font-space-mono text-[8px] font-bold text-white z-30 pointer-events-none bg-blue-600 px-1 py-0.5 rounded">
            {holdRemaining}s
          </div>
        )}
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
