import React, { useState } from 'react';
import Navbar from './Navbar';

export default function DummyTicket() {
  const [copied, setCopied] = useState(false);
  const [activeVariant, setActiveVariant] = useState('v1');

  const variant1Template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FACD-CAB Expo 2026 - Entry Pass</title>
  <style>
    /* Premium self-contained Landscape Ticket Styles matching official branding */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
    
    body {
      background-color: #f8fafc;
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    
    .ticket-card {
      width: 720px;
      height: 250px;
      background: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin: 0 auto;
    }
    
    /* Left Main Section */
    .ticket-main {
      flex: 1;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    
    /* Header brand row */
    .brand-row {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
    }
    
    .logo-img {
      height: 28px;
      display: block;
    }
    
    .brand-text-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .brand-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #004b95;
      margin: 0;
      line-height: 1.1;
    }
    
    .brand-subtitle {
      font-size: 6.5px;
      font-weight: 500;
      color: #64748b;
      margin: 2px 0 0 0;
      line-height: 1;
    }
    
    /* Expo main title section */
    .title-row {
      display: flex;
      align-items: center;
      margin: 10px 0 4px 0;
    }
    
    .badge-14th {
      background-color: #d31212;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 3.5px 7px;
      border-radius: 4px;
      margin-right: 8px;
      line-height: 1;
      display: inline-block;
      text-transform: uppercase;
    }
    
    .badge-14th sup {
      font-size: 8px;
      font-weight: 700;
    }
    
    .expo-main-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }
    
    .title-red {
      color: #d31212;
    }
    
    .title-blue {
      color: #004b95;
    }
    
    .tagline-text {
      font-size: 8px;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 2px 0 6px 0;
    }
    
    /* Attendee details area */
    .holder-row {
      margin: 6px 0;
      background: #fafbfc;
      border: 1px solid #f1f5f9;
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .holder-name-col {
      display: flex;
      flex-direction: column;
    }
    
    .holder-label {
      font-size: 8px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
    }
    
    .holder-name-val {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    
    .holder-contact-col {
      text-align: right;
    }
    
    .holder-contact-item {
      font-size: 11px;
      color: #475569;
      margin: 2px 0;
      font-weight: 500;
    }
    
    .holder-contact-item strong {
      color: #1e293b;
      font-weight: 600;
    }
    
    /* Bottom details grid */
    .details-row {
      display: flex;
      flex-direction: row;
      gap: 20px;
      margin-top: 6px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .icon-wrapper-red {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fef2f2;
      border: 1px solid #fee2e2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-wrapper-blue {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-svg-red {
      color: #d31212;
      width: 12px;
      height: 12px;
    }
    
    .icon-svg-blue {
      color: #004b95;
      width: 12px;
      height: 12px;
    }
    
    .detail-text-col {
      display: flex;
      flex-direction: column;
    }
    
    .detail-label {
      font-size: 8px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    
    .detail-val {
      font-size: 10.5px;
      color: #1e293b;
      font-weight: 800;
    }
    
    /* Right Stub Section */
    .ticket-stub {
      width: 220px;
      background-color: #004b95;
      border-left: 2px dashed #cbd5e1;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      position: relative;
    }
    
    /* Tear Circle Cuts */
    .tear-circle-top, .tear-circle-bottom {
      position: absolute;
      width: 18px;
      height: 18px;
      background-color: #f8fafc;
      border-radius: 50%;
      left: -10px;
    }
    .tear-circle-top {
      top: -10px;
      border-bottom: 2px solid #cbd5e1;
    }
    .tear-circle-bottom {
      bottom: -10px;
      border-top: 2px solid #cbd5e1;
    }
    
    .stub-header {
      width: 100%;
      text-align: center;
    }
    
    .pass-badge {
      background-color: #ffffff;
      color: #d31212;
      font-size: 9.5px;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-block;
    }
    
    .stub-middle {
      text-align: center;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    
    .ticket-id {
      font-family: 'Space Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      color: #ffffff;
      opacity: 0.85;
      margin: 0;
    }
    
    .ticket-id-val {
      font-weight: 800;
      color: #ffffff;
    }
    
    .qr-code-container {
      width: 64px;
      height: 64px;
      background: #ffffff;
      padding: 5px;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .qr-code-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .stub-footer {
      width: 100%;
      text-align: center;
    }
    
    .entry-tag {
      font-size: 9px;
      font-weight: 800;
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 3px 12px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: inline-block;
    }
  </style>
</head>
<body>

  <div class="ticket-card">
    <div class="ticket-main">
      <div class="brand-row">
        <img class="logo-img" src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo">
        <div class="brand-text-col">
          <h4 class="brand-title">FACD-CAB</h4>
          <p class="brand-subtitle">Foreign Admission & Career Development Consultants Association of Bangladesh</p>
        </div>
      </div>
      
      <div>
        <div class="title-row">
          <span class="badge-14th">14<sup>th</sup></span>
          <span class="expo-main-title">
            <span class="title-red">FACD-CAB</span> 
            <span class="title-blue">INTERNATIONAL EDUCATION EXPO 2026</span>
          </span>
        </div>
        <p class="tagline-text">Connecting Dreams, Creating Global Opportunities</p>
      </div>
      
      <div class="holder-row">
        <div class="holder-name-col">
          <span class="holder-label">Ticket Holder</span>
          <h2 class="holder-name-val">Shakib Al Hasan</h2>
        </div>
        <div class="holder-contact-col">
          <div class="holder-contact-item"><strong>Email:</strong> shakib@domain.com</div>
          <div class="holder-contact-item"><strong>Phone:</strong> +880 1712 345678</div>
        </div>
      </div>
      
      <div class="details-row">
        <div class="detail-item">
          <div class="icon-wrapper-red">
            <svg class="icon-svg-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <div class="detail-text-col">
            <span class="detail-label">Date & Day</span>
            <span class="detail-val">10 & 11 July 2026 (Fri & Sat)</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="icon-wrapper-blue">
            <svg class="icon-svg-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <div class="detail-text-col">
            <span class="detail-label">Venue</span>
            <span class="detail-val">Pan Pacific Sonargaon, Dhaka</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ticket-stub">
      <div class="tear-circle-top"></div>
      <div class="tear-circle-bottom"></div>
      
      <div class="stub-header">
        <span class="pass-badge">Student Pass</span>
      </div>
      
      <div class="stub-middle">
        <div class="ticket-id">Ticket ID: <span class="ticket-id-val">FACD-STU-845192</span></div>
        <div class="qr-code-container">
          <svg class="qr-code-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#ffffff" />
            <rect x="8" y="8" width="26" height="26" fill="#000000" />
            <rect x="12" y="12" width="18" height="18" fill="#ffffff" />
            <rect x="16" y="16" width="10" height="10" fill="#000000" />
            <rect x="66" y="8" width="26" height="26" fill="#000000" />
            <rect x="70" y="12" width="18" height="18" fill="#ffffff" />
            <rect x="74" y="16" width="10" height="10" fill="#000000" />
            <rect x="8" y="66" width="26" height="26" fill="#000000" />
            <rect x="12" y="70" width="18" height="18" fill="#ffffff" />
            <rect x="16" y="74" width="10" height="10" fill="#000000" />
            <rect x="40" y="12" width="6" height="6" fill="#000000" />
            <rect x="48" y="18" width="8" height="8" fill="#000000" />
            <rect x="16" y="40" width="8" height="8" fill="#000000" />
            <rect x="28" y="44" width="12" height="6" fill="#000000" />
            <rect x="44" y="40" width="14" height="14" fill="#000000" />
            <rect x="48" y="44" width="6" height="6" fill="#ffffff" />
            <rect x="68" y="40" width="8" height="8" fill="#000000" />
            <rect x="80" y="44" width="8" height="6" fill="#000000" />
            <rect x="40" y="68" width="6" height="12" fill="#000000" />
            <rect x="52" y="76" width="10" height="8" fill="#000000" />
            <rect x="68" y="68" width="12" height="12" fill="#000000" />
          </svg>
        </div>
      </div>
      
      <div class="stub-footer">
        <span class="entry-tag">FREE ENTRY PASS</span>
      </div>
    </div>
  </div>

</body>
</html>`;

  const variant2Template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FACD-CAB Expo 2026 - Entry Pass</title>
  <style>
    /* Premium self-contained Landscape Ticket Styles matching official branding */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
    
    body {
      background-color: #f8fafc;
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    
    .ticket-card {
      width: 720px;
      height: 250px;
      background: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      margin: 0 auto;
    }
    
    /* Left Main Section */
    .ticket-main {
      flex: 1;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    
    /* Header brand row */
    .brand-row {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
    }
    
    .logo-img {
      height: 28px;
      display: block;
    }
    
    .brand-text-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .brand-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #004b95;
      margin: 0;
      line-height: 1.1;
    }
    
    .brand-subtitle {
      font-size: 6.5px;
      font-weight: 500;
      color: #64748b;
      margin: 2px 0 0 0;
      line-height: 1;
    }
    
    /* Expo main title section */
    .title-row {
      display: flex;
      align-items: center;
      margin: 10px 0 4px 0;
    }
    
    .badge-14th {
      background-color: #d31212;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 3.5px 7px;
      border-radius: 4px;
      margin-right: 8px;
      line-height: 1;
      display: inline-block;
      text-transform: uppercase;
    }
    
    .badge-14th sup {
      font-size: 8px;
      font-weight: 700;
    }
    
    .expo-main-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }
    
    .title-red {
      color: #d31212;
    }
    
    .title-blue {
      color: #004b95;
    }
    
    .tagline-text {
      font-size: 8px;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 2px 0 6px 0;
    }
    
    /* Attendee details area */
    .holder-row {
      margin: 6px 0;
      background: #fafbfc;
      border: 1px solid #f1f5f9;
      border-radius: 8px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .holder-name-col {
      display: flex;
      flex-direction: column;
    }
    
    .holder-label {
      font-size: 8px;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
    }
    
    .holder-name-val {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    
    .holder-contact-col {
      text-align: right;
    }
    
    .holder-contact-item {
      font-size: 11px;
      color: #475569;
      margin: 2px 0;
      font-weight: 500;
    }
    
    .holder-contact-item strong {
      color: #1e293b;
      font-weight: 600;
    }
    
    /* Bottom details grid */
    .details-row {
      display: flex;
      flex-direction: row;
      gap: 20px;
      margin-top: 6px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .icon-wrapper-red {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fef2f2;
      border: 1px solid #fee2e2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-wrapper-blue {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .icon-svg-red {
      color: #d31212;
      width: 12px;
      height: 12px;
    }
    
    .icon-svg-blue {
      color: #004b95;
      width: 12px;
      height: 12px;
    }
    
    .detail-text-col {
      display: flex;
      flex-direction: column;
    }
    
    .detail-label {
      font-size: 8px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    
    .detail-val {
      font-size: 10.5px;
      color: #1e293b;
      font-weight: 800;
    }
    
    /* Right Stub Section */
    .ticket-stub {
      width: 220px;
      background-color: #004b95;
      border-left: 2px dashed #cbd5e1;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      position: relative;
    }
    
    /* Tear Circle Cuts */
    .tear-circle-top, .tear-circle-bottom {
      position: absolute;
      width: 18px;
      height: 18px;
      background-color: #f8fafc;
      border-radius: 50%;
      left: -10px;
    }
    .tear-circle-top {
      top: -10px;
      border-bottom: 2px solid #cbd5e1;
    }
    .tear-circle-bottom {
      bottom: -10px;
      border-top: 2px solid #cbd5e1;
    }
    
    .stub-header {
      width: 100%;
      text-align: center;
    }
    
    .pass-badge {
      background-color: #ffffff;
      color: #d31212;
      font-size: 9.5px;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-block;
    }
    
    .stub-middle {
      text-align: center;
      width: 100%;
      margin: 20px 0;
    }
    
    .ticket-id {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #ffffff;
      opacity: 0.85;
      margin: 0;
    }
    
    .ticket-id-val {
      font-weight: 800;
      color: #ffffff;
      font-size: 15px;
      margin-top: 6px;
    }
    
    .stub-footer {
      width: 100%;
      text-align: center;
    }
    
    .entry-tag {
      font-size: 9px;
      font-weight: 800;
      color: #ffffff;
      background-color: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 3px 12px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: inline-block;
    }
  </style>
</head>
<body>

  <div class="ticket-card">
    <div class="ticket-main">
      <div class="brand-row">
        <img class="logo-img" src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo">
        <div class="brand-text-col">
          <h4 class="brand-title">FACD-CAB</h4>
          <p class="brand-subtitle">Foreign Admission & Career Development Consultants Association of Bangladesh</p>
        </div>
      </div>
      
      <div>
        <div class="title-row">
          <span class="badge-14th">14<sup>th</sup></span>
          <span class="expo-main-title">
            <span class="title-red">FACD-CAB</span> 
            <span class="title-blue">INTERNATIONAL EDUCATION EXPO 2026</span>
          </span>
        </div>
        <p class="tagline-text">Connecting Dreams, Creating Global Opportunities</p>
      </div>
      
      <div class="holder-row">
        <div class="holder-name-col">
          <span class="holder-label">Ticket Holder</span>
          <h2 class="holder-name-val">Shakib Al Hasan</h2>
        </div>
        <div class="holder-contact-col">
          <div class="holder-contact-item"><strong>Email:</strong> shakib@domain.com</div>
          <div class="holder-contact-item"><strong>Phone:</strong> +880 1712 345678</div>
        </div>
      </div>
      
      <div class="details-row">
        <div class="detail-item">
          <div class="icon-wrapper-red">
            <svg class="icon-svg-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <div class="detail-text-col">
            <span class="detail-label">Date & Day</span>
            <span class="detail-val">10 & 11 July 2026 (Fri & Sat)</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="icon-wrapper-blue">
            <svg class="icon-svg-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <div class="detail-text-col">
            <span class="detail-label">Venue</span>
            <span class="detail-val">Pan Pacific Sonargaon, Dhaka</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ticket-stub">
      <div class="tear-circle-top"></div>
      <div class="tear-circle-bottom"></div>
      
      <div class="stub-header">
        <span class="pass-badge">Student Pass</span>
      </div>
      
      <div class="stub-middle">
        <div class="ticket-id">Ticket ID:</div>
        <div class="ticket-id-val">FACD-STU-845192</div>
      </div>
      
      <div class="stub-footer">
        <span class="entry-tag">FREE ENTRY PASS</span>
      </div>
    </div>
  </div>

</body>
</html>`;

  const activeTemplate = activeVariant === 'v1' ? variant1Template : variant2Template;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8">
        
        {/* Banner */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl mb-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded uppercase tracking-wider font-mono">Developer Handoff View</span>
            <h1 className="text-xl md:text-2xl font-black mt-2 tracking-tight">Dummy Ticket HTML/CSS Template</h1>
            <p className="text-slate-400 text-xs mt-1 font-medium">Self-contained landscape ticket layout matching official branding colors and style.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3.5 text-xs font-semibold">
              <a 
                href="/ticket-template.html" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#38bdf8] hover:text-[#7dd3fc] underline transition-colors flex items-center gap-1.5 no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open ticket-template.html (Variant 1)
              </a>
              <a 
                href="/ticket-template2.html" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#38bdf8] hover:text-[#7dd3fc] underline transition-colors flex items-center gap-1.5 no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open ticket-template2.html (Variant 2)
              </a>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Variant Selector Tabs */}
            <div className="flex bg-slate-900 border border-slate-700 rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveVariant('v1')}
                className={`px-4 py-2 rounded-lg font-bold text-xs cursor-pointer border-0 transition-all ${
                  activeVariant === 'v1' ? 'bg-[#155dfc] text-white' : 'bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                Variant 1 (QR Code)
              </button>
              <button
                onClick={() => setActiveVariant('v2')}
                className={`px-4 py-2 rounded-lg font-bold text-xs cursor-pointer border-0 transition-all ${
                  activeVariant === 'v2' ? 'bg-[#155dfc] text-white' : 'bg-transparent text-slate-400 hover:text-white'
                }`}
              >
                Variant 2 (No QR/Barcode)
              </button>
            </div>

            <button
              onClick={handleCopy}
              className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-0 flex items-center gap-2 ${
                copied ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white hover:opacity-90'
              }`}
            >
              {copied ? '✓ Copied!' : '📋 Copy Active HTML'}
            </button>
          </div>
        </div>

        {/* Full Width Visual Preview Pane */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
            Visual Preview ({activeVariant === 'v1' ? 'Variant 1: QR Code' : 'Variant 2: No Code'})
          </div>
          <div className="bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden flex items-center justify-center p-8 min-h-[380px]">
            <iframe
              key={activeVariant}
              title="Ticket Visual Preview"
              srcDoc={activeTemplate}
              className="w-full max-w-[760px] h-[290px] border-0 overflow-hidden bg-transparent"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
