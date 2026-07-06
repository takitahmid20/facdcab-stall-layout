import React from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <img src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo" onClick={() => window.open('https://www.facdcab.org', '_blank')} />
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link">About Us</a>
          <a href="#" className="navbar-link">
            Members{' '}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="#" className="navbar-link">
            Committee{' '}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="#" className="navbar-link">Events</a>
          <a href="#" className="navbar-link">News & Blogs</a>
        </div>
        <a href="https://member.facdcab.org" target="_blank" rel="noreferrer" className="navbar-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Member Login
        </a>
      </div>
    </div>
  );
}
