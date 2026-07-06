import React from 'react';
import { fmtBDT } from './Stall';
import '../styles/Modal.css';

export default function ConfirmationModal({ data, onClose }) {
  const { stallLabel, email, amount, name } = data;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <div>
            <h2>Booking Confirmed</h2>
            <p>Stall reservation successful.</p>
          </div>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ textAlign: 'center' }}>
          <div className="confirm-icon">✓</div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '18px', marginBottom: '8px', fontWeight: '700' }}>
            Stall {stallLabel} — is yours
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '18px' }}>
            Booking amount: {fmtBDT(amount)}
          </div>

          <div className="submit-row">
            <button className="btn btn-gold" style={{ flex: 1 }} onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );
}
