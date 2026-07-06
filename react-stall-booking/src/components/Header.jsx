import React from 'react';
import '../styles/Header.css';

export default function Header({ stats }) {
  return (
    <header>
      <div className="header-banner">
        <h1>FACD-CAB 14th International Education Expo 2026</h1>
        
        <div className="header-row">
          <div className="meta-badge-grid">
            <div className="meta-badge location">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '16px', height: '16px', strokeWidth: '2.5' }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              <div className="meta-badge-content">
                <span className="badge-title">Pan Pacific Sonargaon Hotel Dhaka</span>
                <span className="badge-sub">Grand Ball Room</span>
              </div>
            </div>
            
            <div className="meta-badge date">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '16px', height: '16px', strokeWidth: '2.5' }}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>
              <div className="meta-badge-content">
                <span className="badge-title">July 10 - July 11, 2026</span>
                <span className="badge-sub">Expo Duration: 2 Days</span>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card available">
              <b>{stats.available}</b>
              <span>Available</span>
            </div>
            <div className="stat-card onhold">
              <b>{stats.onHold}</b>
              <span>On Hold</span>
            </div>
            <div className="stat-card booked">
              <b>{stats.booked}</b>
              <span>Booked</span>
            </div>
          </div>
        </div>

        <div className="header-description">
          Interactive floor plan — 90 stalls, 8'×8' each. Click any available green stall to hold it for 60 seconds while you check out.
        </div>
      </div>
    </header>
  );
}
