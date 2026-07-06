import React, { useEffect } from 'react';
import StallV2 from './StallV2';
import Annotation from './Annotation';

export default function HallGridV2({
  units,
  onStallClick,
  isEditorMode = false,
  activeDragId = null,
  mergeCandidateId = null,
  onStallDragStart = () => {},
  onDrop = null
}) {
  useEffect(() => {
    function adjustMapScale() {
      const card = document.querySelector('.plan-card');
      const frame = document.querySelector('.plan-frame');
      const viewport = document.querySelector('.plan-viewport');
      if (!card || !frame || !viewport) return;

      const targetWidth = 797;
      const style = window.getComputedStyle(card);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const availableWidth = card.clientWidth - paddingLeft - paddingRight;

      const scale = Math.min(1, availableWidth / targetWidth);

      frame.style.transform = `scale(${scale})`;
      frame.style.transformOrigin = 'top center';

      const baseHeight = 1100;
      viewport.style.height = `${baseHeight * scale}px`;
    }

    adjustMapScale();
    window.addEventListener('resize', adjustMapScale);
    const timeout = setTimeout(adjustMapScale, 100);

    return () => {
      window.removeEventListener('resize', adjustMapScale);
      clearTimeout(timeout);
    };
  }, [units]);

  return (
    <div className="plan-card relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-7 px-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] grid-lines-bg">
      <div className="relative flex items-center justify-between w-full mb-6 font-space-mono text-[11px] text-slate-500 tracking-[0.03em] leading-relaxed">
        <div className="text-[18px] font-extrabold text-brand-blue tracking-[0.05em] font-montserrat">
          BOOK YOUR STALL
        </div>
        <div className="text-slate-400 font-space-mono text-[11px] tracking-widest uppercase">
          STALL SIZE: 8'×8'
        </div>
      </div>

      <div className="plan-viewport w-full overflow-hidden relative flex justify-center">
        <div className="plan-frame relative inline-block" style={{ transformOrigin: 'top center', transition: 'transform 0.15s ease' }}>
          <div className="side-label east absolute font-space-mono text-[11px] text-slate-400 tracking-[0.08em] whitespace-nowrap"
               style={{ left: '-55px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}>
            <b className="text-slate-600 font-bold">East</b> · 118'
          </div>
          <div className="side-label rightdim absolute font-space-mono text-[11px] text-slate-400 tracking-[0.08em] whitespace-nowrap"
               style={{ right: '-50px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}>
            118'
          </div>
          <div
            className="hall-grid relative"
            id="hallGrid"
            style={{ width: '797px', height: '1060px', margin: '20px auto' }}
            onDragOver={(e) => { if (isEditorMode) e.preventDefault(); }}
            onDrop={(e) => { if (isEditorMode && onDrop) onDrop(e); }}
          >
            {isEditorMode && (
              <div style={{
                position: 'absolute',
                left: '-2px',
                top: '76px',
                width: '801px',
                height: '876px',
                border: '2px dashed #22c55e',
                background: 'rgba(34, 197, 94, 0.02)',
                pointerEvents: 'none',
                zIndex: 1,
                borderRadius: '6px',
              }}>
                <div className="absolute top-2 right-2 font-space-mono text-[8px] font-extrabold text-[#15803d] bg-[#eefcf5] px-2 py-0.5 rounded border border-[#22c55e]/20 uppercase tracking-wider">
                  Safe Placement Zone
                </div>
              </div>
            )}
            {units.map((unit) => (
              <StallV2
                key={unit.id}
                unit={unit}
                onClick={onStallClick}
                isEditorMode={isEditorMode}
                isBeingDragged={activeDragId === unit.id}
                isMergeTarget={mergeCandidateId === unit.id}
                onDragStart={(e) => onStallDragStart(e, unit.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
