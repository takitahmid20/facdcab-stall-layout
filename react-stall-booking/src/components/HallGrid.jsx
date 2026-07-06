import React, { useEffect } from 'react';
import Stall from './Stall';
import Annotation from './Annotation';
import '../styles/HallGrid.css';

export default function HallGrid({ units, onStallClick }) {
  useEffect(() => {
    function adjustMapScale() {
      const card = document.querySelector('.plan-card');
      const frame = document.querySelector('.plan-frame');
      const viewport = document.querySelector('.plan-viewport');
      if (!card || !frame || !viewport) return;

      const targetWidth = 870;
      const style = window.getComputedStyle(card);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const availableWidth = card.clientWidth - paddingLeft - paddingRight;

      const scale = Math.min(1, availableWidth / targetWidth);

      frame.style.transform = `scale(${scale})`;
      frame.style.transformOrigin = 'top center';

      const baseHeight = 1080;
      viewport.style.height = `${baseHeight * scale}px`;
    }

    adjustMapScale();
    window.addEventListener('resize', adjustMapScale);
    // Timeout backup to ensure full DOM layout is complete
    const timeout = setTimeout(adjustMapScale, 100);

    return () => {
      window.removeEventListener('resize', adjustMapScale);
      clearTimeout(timeout);
    };
  }, [units]); // Recalculate on unit updates in case DOM changes

  return (
    <div className="plan-card">
      <div className="plan-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand-blue)', letterSpacing: '0.05em' }}>
          BOOK YOUR STALL
        </div>
        <div className="stall-size" style={{ margin: 0 }}>
          STALL SIZE: 8'×8'
        </div>
      </div>

      <div className="plan-viewport">
        <div className="plan-frame">
          <div className="side-label east"><b>East</b> · 118'</div>
          <div className="side-label rightdim">118'</div>
          <div className="hall-grid" id="hallGrid">
            <Annotation />
            {units.map((unit) => (
              <Stall key={unit.id} unit={unit} onClick={onStallClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
