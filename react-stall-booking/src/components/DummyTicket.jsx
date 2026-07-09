import React, { useState } from 'react';
import Navbar from './Navbar';

export default function DummyTicket() {
  const [copied, setCopied] = useState(false);

  const rawHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FACD-CAB Expo 2026 - Entry Pass</title>
  <style>
    /* Premium self-contained Ticket Styles for PDF/Email generation */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&family=Space+Mono:wght@400;700&display=swap');
    
    body {
      background-color: #f8fafc;
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .ticket-card {
      width: 360px;
      background: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      margin: 0 auto;
    }
    
    .ticket-header {
      background-color: #1e293b;
      color: #ffffff;
      padding: 24px 20px;
      text-align: center;
    }
    
    .logo-container {
      margin-bottom: 10px;
    }
    
    .logo-img {
      height: 24px;
    }
    
    .expo-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }
    
    .pass-tagline {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 4px 0 0 0;
      font-family: 'Space Mono', monospace;
    }
    
    .ticket-body {
      padding: 24px 20px;
      text-align: center;
    }
    
    .badge-wrapper {
      margin-bottom: 16px;
    }
    
    .pass-badge {
      background-color: rgba(21, 93, 252, 0.08);
      color: #155dfc;
      border: 1px solid rgba(21, 93, 252, 0.2);
      font-size: 10px;
      font-weight: 800;
      padding: 5px 14px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-block;
    }
    
    .holder-name {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      letter-spacing: -0.02em;
    }
    
    .holder-email {
      font-size: 12.5px;
      color: #475569;
      font-weight: 500;
      margin: 0 0 2px 0;
    }
    
    .holder-phone {
      font-size: 12px;
      color: #64748b;
      font-family: 'Space Mono', monospace;
      margin: 0;
    }
    
    .divider-line {
      border-top: 2px dashed #cbd5e1;
      margin: 20px 0;
      position: relative;
    }
    
    /* Tear Circle Cuts */
    .divider-line::before, .divider-line::after {
      content: '';
      position: absolute;
      top: -9px;
      width: 16px;
      height: 16px;
      background-color: #f8fafc;
      border-radius: 50%;
    }
    .divider-line::before {
      left: -29px;
      border-right: 2px solid #e2e8f0;
    }
    .divider-line::after {
      right: -29px;
      border-left: 2px solid #e2e8f0;
    }
    
    .info-grid {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 16px;
      text-align: left;
      margin-bottom: 20px;
    }
    
    .info-label {
      font-size: 9.5px;
      color: #94a3b8;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 2px;
    }
    
    .info-value {
      font-size: 11.5px;
      color: #1e293b;
      font-weight: 800;
      margin: 0;
      line-height: 1.3;
    }
    
    .barcode-section {
      text-align: center;
      margin-top: 10px;
    }
    
    .ticket-id {
      font-family: 'Space Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    
    .ticket-id-val {
      color: #0f172a;
      font-weight: 800;
    }
    
    .barcode-lines {
      height: 40px;
      display: inline-flex;
      justify-content: space-between;
      width: 176px;
    }
    
    .barcode-bar {
      background-color: #1e293b;
      height: 100%;
    }
  </style>
</head>
<body>

  <div class="ticket-card">
    <div class="ticket-header">
      <div class="logo-container">
        <img class="logo-img" src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo">
      </div>
      <h3 class="expo-title">FACD-CAB Expo 2026</h3>
      <p class="pass-tagline">Free Entry Ticket</p>
    </div>
    
    <div class="ticket-body">
      <div class="badge-wrapper">
        <span class="pass-badge">Student Pass</span>
      </div>
      
      <h1 class="holder-name">Shakib Al Hasan</h1>
      <p class="holder-email">shakib@domain.com</p>
      <p class="holder-phone">+880 1712 345678</p>
      
      <div class="divider-line"></div>
      
      <div class="info-grid">
        <div>
          <span class="info-label">Date</span>
          <p class="info-value">Aug 7 & 8, 2026</p>
        </div>
        <div>
          <span class="info-label">Venue</span>
          <p class="info-value">Pan Pacific Sonargaon, Dhaka</p>
        </div>
      </div>
      
      <div class="barcode-section">
        <div class="ticket-id">Ticket ID: <span class="ticket-id-val">FACD-STU-845192</span></div>
        <div class="barcode-lines">
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 4px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHtmlTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8">
        
        {/* Banner */}
        <div className="bg-slate-800 text-white p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded uppercase tracking-wider font-mono">Developer Handoff View</span>
            <h1 className="text-xl md:text-2xl font-black mt-2 tracking-tight">Dummy Ticket HTML/CSS Template</h1>
            <p className="text-slate-400 text-xs mt-1 font-medium">Self-contained ticket layout (Internal CSS) ready for backend PDF/Email generation.</p>
          </div>
          <button
            onClick={handleCopy}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-0 flex items-center gap-2 ${
              copied ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white hover:opacity-90'
            }`}
          >
            {copied ? '✓ Copied Template!' : '📋 Copy HTML Template'}
          </button>
        </div>

        {/* Dynamic Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Pane: isolated iframe render */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Visual Preview</div>
            <div className="flex-1 min-h-[580px] bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden flex items-center justify-center p-6">
              <iframe
                title="Ticket Visual Preview"
                srcDoc={rawHtmlTemplate}
                className="w-full h-[580px] border-0 overflow-hidden bg-transparent"
              />
            </div>
          </div>

          {/* Right Pane: exportable code viewer */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Self-Contained Source Code</div>
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>ticket_template.html</span>
                <button
                  onClick={handleCopy}
                  className="bg-transparent border-0 hover:text-white cursor-pointer font-bold font-mono text-xs"
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <textarea
                readOnly
                value={rawHtmlTemplate}
                className="flex-1 w-full p-5 bg-slate-950 text-slate-300 font-mono text-[12px] leading-relaxed border-0 outline-none resize-none overflow-y-auto"
                style={{ minHeight: '520px' }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
