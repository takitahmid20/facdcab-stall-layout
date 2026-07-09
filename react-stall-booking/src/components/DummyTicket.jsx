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
    /* Premium self-contained Landscape Ticket Styles for PDF/Email generation */
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
      width: 680px;
      height: 240px;
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
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }
    
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo-img {
      height: 22px;
    }
    
    .expo-tag {
      font-size: 11px;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .holder-details {
      margin: 12px 0;
    }
    
    .holder-name {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      letter-spacing: -0.02em;
    }
    
    .holder-meta {
      font-size: 12px;
      color: #475569;
      font-weight: 500;
    }
    
    .holder-meta span {
      display: inline-block;
    }
    
    .info-row {
      display: flex;
      flex-direction: row;
      border-top: 1px solid #f1f5f9;
      padding-top: 14px;
    }
    
    .info-col {
      display: flex;
      flex-direction: column;
    }
    
    .info-label {
      font-size: 9px;
      color: #94a3b8;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 3px;
    }
    
    .info-value {
      font-size: 11.5px;
      color: #1e293b;
      font-weight: 750;
    }
    
    /* Right Stub Section */
    .ticket-stub {
      width: 210px;
      background-color: #fafafa;
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
      background-color: rgba(21, 93, 252, 0.08);
      color: #155dfc;
      border: 1px solid rgba(21, 93, 252, 0.2);
      font-size: 9.5px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-block;
    }
    
    .stub-middle {
      text-align: center;
      width: 100%;
    }
    
    .ticket-id {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
    }
    
    .ticket-id-val {
      color: #0f172a;
      font-weight: 800;
    }
    
    .barcode-lines {
      height: 38px;
      display: inline-flex;
      justify-content: space-between;
      width: 150px;
      opacity: 0.9;
    }
    
    .barcode-bar {
      background-color: #1e293b;
      height: 100%;
    }
    
    .stub-footer {
      width: 100%;
      text-align: center;
    }
    
    .entry-tag {
      font-size: 9px;
      font-weight: 800;
      color: #10b981;
      background-color: #eefcf5;
      border: 1px solid rgba(16, 185, 129, 0.2);
      padding: 3px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>

  <div class="ticket-card">
    <div class="ticket-main">
      <div class="header-row">
        <img class="logo-img" src="https://www.facdcab.org/images/logo.svg" alt="FACD-CAB Logo">
        <span class="expo-tag">14th Expo 2026</span>
      </div>
      
      <div class="holder-details">
        <h1 class="holder-name">Shakib Al Hasan</h1>
        <div class="holder-meta">
          <span><strong>Email:</strong> shakib@domain.com</span>
          <span style="margin-left: 20px;"><strong>Phone:</strong> +880 1712 345678</span>
        </div>
      </div>
      
      <div class="info-row">
        <div class="info-col">
          <span class="info-label">Date & Time</span>
          <span class="info-value">August 7 & 8, 2026 (10 AM - 6 PM)</span>
        </div>
        <div class="info-col" style="margin-left: 32px;">
          <span class="info-label">Venue</span>
          <span class="info-value">Pan Pacific Sonargaon, Dhaka</span>
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
        <div class="ticket-id">ID: <span class="ticket-id-val">FACD-STU-845192</span></div>
        <div class="barcode-lines">
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px; opacity: 0.3;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
          <div class="barcode-bar" style="width: 2px;"></div>
          <div class="barcode-bar" style="width: 3px;"></div>
          <div class="barcode-bar" style="width: 1px;"></div>
        </div>
      </div>
      
      <div class="stub-footer">
        <span class="entry-tag">FREE ENTRY</span>
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
            <p className="text-slate-400 text-xs mt-1 font-medium">Self-contained landscape ticket layout (Internal CSS) ready for backend PDF/Email generation.</p>
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
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Visual Preview (Landscape Boarding Pass)</div>
            <div className="flex-1 min-h-[360px] bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden flex items-center justify-center p-6">
              <iframe
                title="Ticket Visual Preview"
                srcDoc={rawHtmlTemplate}
                className="w-full h-[280px] border-0 overflow-hidden bg-transparent"
              />
            </div>
          </div>

          {/* Right Pane: exportable code viewer */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Self-Contained Source Code</div>
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>ticket_template.html</span>
                <button
                  onClick={handleCopy}
                  className="bg-transparent border-0 hover:text-white cursor-pointer font-bold font-mono text-xs"
                >
                  {copied ? 'Copy Code' : 'Copy Code'}
                </button>
              </div>
              <textarea
                readOnly
                value={rawHtmlTemplate}
                className="flex-1 w-full p-5 bg-slate-950 text-slate-300 font-mono text-[12px] leading-relaxed border-0 outline-none resize-none overflow-y-auto"
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
