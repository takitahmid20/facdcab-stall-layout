import React from 'react';
import '../styles/Stall.css';

export function fmtBDT(n) {
  const s = String(n);
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
  return '৳' + (rest.length ? rest + ',' : '') + last3;
}

export default function Stall({ unit, onClick }) {
  const { id, label, nums, price, left, top, width, height, isCorner, status, holdRemaining } = unit;

  // Custom positioning styles
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

  // Determine split numbers orientation if corner/pair unit
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
  const flexDir = isVertical ? 'column' : 'row';
  const borderVar = status === 'held-mine' ? 'rgba(255,255,255,0.4)' : 'var(--line)';
  const inlineBorder = isVertical ? { borderBottom: `1px dashed ${borderVar}` } : { borderRight: `1px dashed ${borderVar}` };

  const handleStallClick = () => {
    if (status === 'available' || status === 'held-mine') {
      onClick(id);
    }
  };

  return (
    <div
      className={`stall ${status} ${nums.length > 1 ? 'corner' : ''}`}
      style={style}
      title={getTooltip()}
      onClick={handleStallClick}
    >
      {nums.length > 1 ? (
        <div className="corner-split" style={{ display: 'flex', flexDirection: flexDir, width: '100%', height: '100%' }}>
          <div className="corner-half" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...inlineBorder }}>
            <div className="num">{firstNum}</div>
            <div className="price">{fmtBDT(priceHalf)}</div>
          </div>
          <div className="corner-half" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div className="num">{secondNum}</div>
            <div className="price">{fmtBDT(priceHalf)}</div>
            {status === 'held-other' && <div className="mini-timer" style={{ position: 'absolute', bottom: '2px', right: '4px' }}>{holdRemaining}s</div>}
            {status === 'held-mine' && <div className="mini-timer" id="miniTimerMine" style={{ position: 'absolute', bottom: '2px', right: '4px', color: '#ffffff' }}>{holdRemaining}s</div>}
          </div>
        </div>
      ) : (
        <>
          <div className="num">{label}</div>
          <div className="price">{fmtBDT(price)}</div>
          {status === 'held-other' && <div className="mini-timer">{holdRemaining}s</div>}
          {status === 'held-mine' && <div className="mini-timer" id="miniTimerMine">{holdRemaining}s</div>}
        </>
      )}
    </div>
  );
}
