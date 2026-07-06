import React from 'react';
import { fmtBDT } from './Stall';
import '../styles/Legend.css';

export default function DescriptionCard({ selectedUnit, onBookClick, onReleaseClick }) {
  return (
    <div className="panel-box" style={{ borderLeft: selectedUnit ? '4px solid var(--brand-blue)' : '1px solid var(--line)' }}>
      <h3>Stall Summary</h3>
      
      {!selectedUnit ? (
        <div style={{ color: 'var(--text-faint)', fontSize: '12.5px', fontStyle: 'italic', padding: '12px 0', textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
          Select any stall on the floor plan to view live booking details and pricing.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px', fontFamily: "'Montserrat', sans-serif" }}>
          <div style={styles.row}>
            <span style={styles.label}>Stall Number:</span>
            <span style={{ ...styles.val, fontWeight: '700', color: '#1e293b' }}>Stall {selectedUnit.label}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Stall Size:</span>
            <span style={styles.val}>{selectedUnit.isCorner ? "16' × 8'" : "8' × 8'"}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Stall Type:</span>
            <span style={styles.val}>
              {selectedUnit.isCorner ? "Merged Corner Pair" : selectedUnit.isPairBlock ? "Double Commercial Pair" : "Standard Stall"}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Price:</span>
            <span style={{ ...styles.val, color: '#16a34a', fontWeight: '800' }}>{fmtBDT(selectedUnit.price)}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Status:</span>
            <span style={{
              ...styles.badge,
              ...(selectedUnit.status === 'available' ? styles.badgeAvail :
                 selectedUnit.status === 'booked' ? styles.badgeBooked :
                 selectedUnit.status === 'held-mine' ? styles.badgeMine : styles.badgeOther)
            }}>
              {selectedUnit.status === 'available' ? 'Available' :
               selectedUnit.status === 'booked' ? 'Booked' :
               selectedUnit.status === 'held-mine' ? `On Hold (Yours - ${selectedUnit.holdRemaining}s)` : 'On Hold (Other)'}
            </span>
          </div>

          {selectedUnit.status === 'held-mine' && (
            <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
              <button className="btn btn-ghost" style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: '700' }} onClick={onReleaseClick}>
                Release
              </button>
              <button className="btn btn-gold" style={{ flex: 2, padding: '10px', fontSize: '12px', fontWeight: '700' }} onClick={onBookClick}>
                Book Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
    paddingBottom: '8px',
  },
  label: {
    color: '#64748b',
    fontWeight: '500',
  },
  val: {
    color: '#334155',
    fontWeight: '600',
  },
  badge: {
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeAvail: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },
  badgeBooked: {
    background: '#f1f5f9',
    color: '#64748b',
    border: '1px solid #cbd5e1',
  },
  badgeMine: {
    background: '#fffbeb',
    color: '#d97706',
    border: '1px solid #fef08a',
  },
  badgeOther: {
    background: '#fff7ed',
    color: '#ea580c',
    border: '1px solid #fed7aa',
  },
};
