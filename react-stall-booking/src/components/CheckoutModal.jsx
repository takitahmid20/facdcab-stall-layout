import React, { useState, useEffect } from 'react';
import { fmtBDT } from './Stall';
import '../styles/Modal.css';

const MEMBERS = [
  {
    email: 'karim@bexport.com',
    phone: '01711000111',
    name: 'Md. Karim Uddin',
    company: 'Bengal Exporters Ltd.',
    history: [
      { label: 'Stall 45', event: 'Dhaka Trade Expo 2025', amount: 80000, date: '02 Nov 2025' },
      { label: 'Corner Stall 11-12', event: 'Leather Fair 2024', amount: 160000, date: '14 Aug 2024' }
    ]
  },
  {
    email: 'nusrat@apextex.com',
    phone: '01822334455',
    name: 'Nusrat Jahan',
    company: 'Apex Textiles',
    history: [
      { label: 'Stall 68', event: 'Textile Summit 2025', amount: 80000, date: '20 Mar 2025' }
    ]
  }
];

export default function CheckoutModal({ heldStalls, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [matchedMember, setMatchedMember] = useState(null);

  // Auto-fill fields if member email matches
  useEffect(() => {
    const member = MEMBERS.find((m) => m.email.toLowerCase() === email.trim().toLowerCase());
    if (member) {
      setMatchedMember(member);
      setName(member.name);
      setPhone(member.phone);
      setCompany(member.company);
    } else {
      setMatchedMember(null);
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }
    onSubmit({ name, email, phone, company });
  };

  if (!heldStalls || heldStalls.length === 0) return null;

  const totalAmount = heldStalls.reduce((sum, u) => sum + u.price, 0);
  const combinedLabels = heldStalls.map((u) => u.label).join(', ');
  const minHoldRemaining = Math.min(...heldStalls.map((u) => u.holdRemaining));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <div>
            <h2>Checkout</h2>
            <p>Reserving Stalls: {combinedLabels}</p>
          </div>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-timer">
            <span>Holds expire in:</span>
            <b>{minHoldRemaining}s</b>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            {matchedMember && (
              <div className="member-card">
                🎉 <b>FACD-CAB Registered Member Found</b>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Past Reservation</th>
                      <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedMember.history.map((h, i) => (
                      <tr key={i}>
                        <td>{h.label} ({h.event})</td>
                        <td>{fmtBDT(h.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="field">
              <label>Full name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Md. Karim Uddin"
              />
            </div>

            <div className="field">
              <label>Phone number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
              />
            </div>

            <div className="field">
              <label>Company name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Bengal Exporters Ltd."
              />
            </div>

            <div className="order-summary" style={{ flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
              {heldStalls.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid rgba(226, 232, 240, 0.4)', paddingBottom: '4px' }}>
                  <span>Stall {s.label} ({s.isCorner ? 'Corner Pair' : 'Standard'}):</span>
                  <span>{fmtBDT(s.price)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '15px', marginTop: '6px' }}>
                <span>Total Price:</span>
                <b style={{ color: 'var(--brand-blue)' }}>{fmtBDT(totalAmount)}</b>
              </div>
            </div>

            <div className="submit-row">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-gold">Confirm Booking</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
