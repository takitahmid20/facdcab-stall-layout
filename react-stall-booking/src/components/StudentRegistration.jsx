import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function StudentRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [additionalAttendees, setAdditionalAttendees] = useState([]);
  const [errors, setErrors] = useState({});

  // Accordion / Collapse States
  const [primaryExpanded, setPrimaryExpanded] = useState(true);
  const [collapsedAttendees, setCollapsedAttendees] = useState({});

  // Full-screen secure generator loader states
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loaderTexts = [
    'Verifying expo entry availability...',
    'Generating secure vector QR codes...',
    'Finalizing digital admission passes...'
  ];

  // Toggle Collapse
  const toggleAttendeeCollapse = (id) => {
    setCollapsedAttendees(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Add guest template (automatically expanded)
  const handleAddAttendee = () => {
    const newId = Date.now() + Math.random();
    setAdditionalAttendees([
      ...additionalAttendees,
      {
        id: newId,
        fullName: '',
        email: '',
        phone: '',
        relationship: 'Friend',
      },
    ]);
    
    // Auto-collapse others to clean view, expand the new one
    setPrimaryExpanded(false);
    const updatedCollapsed = { ...collapsedAttendees };
    additionalAttendees.forEach(guest => {
      updatedCollapsed[guest.id] = true;
    });
    updatedCollapsed[newId] = false;
    setCollapsedAttendees(updatedCollapsed);
  };

  // Remove guest
  const handleRemoveAttendee = (id) => {
    setAdditionalAttendees(additionalAttendees.filter((item) => item.id !== id));
    const updatedCollapsed = { ...collapsedAttendees };
    delete updatedCollapsed[id];
    setCollapsedAttendees(updatedCollapsed);
  };

  // Update additional attendee fields
  const handleUpdateAttendee = (id, field, value) => {
    setAdditionalAttendees(
      additionalAttendees.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Validate form before submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';

    const guestErrors = {};
    additionalAttendees.forEach((guest) => {
      const gErr = {};
      if (!guest.fullName.trim()) gErr.fullName = 'Full name is required';
      if (!guest.email.trim()) {
        gErr.email = 'Email is required';
      } else if (!isValidEmail(guest.email)) {
        gErr.email = 'Enter a valid email address';
      }
      if (!guest.phone.trim()) gErr.phone = 'Mobile number is required';
      if (Object.keys(gErr).length > 0) {
        guestErrors[guest.id] = gErr;
      }
    });

    if (Object.keys(guestErrors).length > 0) {
      newErrors.guests = guestErrors;
      const updatedCollapsed = { ...collapsedAttendees };
      additionalAttendees.forEach(guest => {
        if (guestErrors[guest.id]) {
          updatedCollapsed[guest.id] = false;
        }
      });
      setCollapsedAttendees(updatedCollapsed);
    }
    
    if (newErrors.fullName || newErrors.email || newErrors.phone) {
      setPrimaryExpanded(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const list = [
      {
        id: 'primary-' + Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        type: 'Student Pass',
        ticketId: `FACD-STU-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      ...additionalAttendees.map((guest) => ({
        id: guest.id,
        fullName: guest.fullName,
        email: guest.email,
        phone: guest.phone,
        type: `${guest.relationship} Pass`,
        ticketId: `FACD-GST-${Math.floor(100000 + Math.random() * 900000)}`,
      })),
    ];

    // Trigger loader state
    setIsGenerating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step % 3);
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      navigate('/register-success', { state: { registeredList: list } });
    }, 1600);
  };

  const totalPerson = 1 + additionalAttendees.length;
  const relationOptions = ['Friend', 'Family Member', 'Parent', 'Classmate'];

  // Input Field Redesign with Inline Checks
  const renderInputField = ({ label, type, value, onChange, placeholder, error, isValid }) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">{label}</label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full pl-4 pr-10 py-3 bg-white border-2 rounded-xl text-[13px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
              error
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 bg-rose-50/10'
                : isValid
                ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                : 'border-slate-200 focus:border-[#004b95] focus:ring-2 focus:ring-[#004b95]/10'
            }`}
          />
          {isValid && !error && (
            <div className="absolute right-3.5 top-[50%] -translate-y-[50%] text-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {error && <p className="text-rose-600 text-[10.5px] font-bold mt-0.5">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Dynamic Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Expo Branding, Title, Tagline, Date/Venue, and Benefits (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Circular Association Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="https://www.facdcab.org/images/logo.svg" 
                alt="FACD-CAB Logo" 
                className="h-14"
              />
              <div className="flex flex-col">
                <h4 className="text-[13px] font-black text-[#004b95] leading-tight tracking-tight m-0">FACD-CAB</h4>
                <p className="text-[8.5px] font-semibold text-slate-500 max-w-[280px] leading-tight m-0 mt-1">Foreign Admission & Career Development Consultants Association of Bangladesh</p>
              </div>
            </div>

            {/* Expo Large Branded Heading */}
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#d31212] text-white font-extrabold text-[15px] px-3 py-1.5 rounded uppercase tracking-wide shrink-0">
                  14<sup>th</sup>
                </span>
                <span className="text-[13px] font-extrabold text-[#d31212] uppercase tracking-wider">International Event</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mt-3">
                <span className="text-[#d31212] block">FACD-CAB</span>
                <span className="text-[#004b95] block mt-1">INTERNATIONAL EDUCATION EXPO 2026</span>
              </h1>
              <p className="text-[12.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-3.5 mb-0 leading-relaxed border-l-4 border-l-[#d31212] pl-3">
                Connecting Dreams, Creating Global Opportunities
              </p>
            </div>

            {/* Date & Venue Info Cards */}
            <div className="flex flex-col gap-3 mt-2">
              {/* Date Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#d31212]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider mb-0.5">Expo Date & Days</span>
                  <span className="text-[12px] text-slate-800 font-extrabold leading-tight">10 & 11 July 2026 (Friday & Saturday)</span>
                </div>
              </div>

              {/* Venue Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider mb-0.5">Venue Location</span>
                  <span className="text-[12px] text-slate-800 font-extrabold leading-tight">Pan Pacific Sonargaon Hotel, Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Expo Exclusives Grid (Matching the bottom icons of the official banner) */}
            <div className="mt-4">
              <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest block mb-3.5">Expo Exclusives</span>
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Stall Booking */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                  <svg className="w-5 h-5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                  </svg>
                  <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Online Stall Booking</span>
                </div>

                {/* Digital Payments */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                  <svg className="w-5 h-5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9" />
                  </svg>
                  <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Digital Payment Support</span>
                </div>

                {/* Technical Support */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                  <svg className="w-5 h-5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25z" />
                  </svg>
                  <span className="text-[10px] font-extrabold text-slate-700 leading-tight">IT & Technical Support</span>
                </div>

                {/* Global Minds */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
                  <svg className="w-5 h-5 text-[#004b95]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                  <span className="text-[10px] font-extrabold text-slate-700 leading-tight">Connecting Global Minds</span>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The Clean Registration Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border-t-4 border-t-[#004b95] border border-slate-200 overflow-hidden">
              
              <div className="p-5 md:p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-black text-slate-800 tracking-tight leading-none">Register For Free Entry</h3>
                  <p className="text-[11.5px] text-slate-400 font-medium mt-1.5">Free passes will be sent instantly as digital Expo passes.</p>
                </div>
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full uppercase tracking-wider font-mono shrink-0">
                  Approved Seat
                </span>
              </div>

              {/* Form container */}
              <div className="p-5 md:p-8 flex flex-col gap-6">
                
                {/* Primary Student Block */}
                <div>
                  <button
                    type="button"
                    onClick={() => setPrimaryExpanded(!primaryExpanded)}
                    className="w-full flex items-center justify-between py-3.5 text-left border-b border-slate-200 bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="relative flex h-2 w-2">
                        {formData.fullName.trim() && formData.email.trim() && formData.phone.trim() ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </>
                        ) : (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </>
                        )}
                      </div>
                      <span className="text-[13.5px] font-black text-slate-800 uppercase tracking-wide">
                        Attendee #1{formData.fullName.trim() ? ` — ${formData.fullName.trim()}` : ''}
                      </span>
                      <span className="text-[9px] font-extrabold bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        Primary
                      </span>
                      {formData.fullName.trim() && formData.email.trim() && formData.phone.trim() ? (
                        <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          Ready
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          Pending
                        </span>
                      )}
                    </div>
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${primaryExpanded ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {primaryExpanded && (
                    <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                      {renderInputField({
                        label: 'Full Name',
                        type: 'text',
                        value: formData.fullName,
                        onChange: (e) => setFormData({ ...formData, fullName: e.target.value }),
                        placeholder: 'e.g. Shakib Al Hasan',
                        error: errors.fullName,
                        isValid: formData.fullName.trim().length > 2
                      })}

                      {renderInputField({
                        label: 'Email Address',
                        type: 'email',
                        value: formData.email,
                        onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                        placeholder: 'e.g. name@domain.com',
                        error: errors.email,
                        isValid: isValidEmail(formData.email)
                      })}

                      <div className="md:col-span-2">
                        {renderInputField({
                          label: 'Mobile Number',
                          type: 'tel',
                          value: formData.phone,
                          onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                          placeholder: 'e.g. +880 1712 345678',
                          error: errors.phone,
                          isValid: formData.phone.trim().length > 7
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Attendees Accordion Section */}
                {additionalAttendees.map((guest, idx) => {
                  const isCollapsed = !!collapsedAttendees[guest.id];
                  const hasErrors = errors.guests?.[guest.id];
                  const isGuestReady = guest.fullName.trim() && guest.email.trim() && guest.phone.trim();
                  
                  return (
                    <div key={guest.id} className="py-1 border-t border-slate-100">
                      
                      <div
                        onClick={() => toggleAttendeeCollapse(guest.id)}
                        className="w-full flex items-center justify-between py-3.5 text-left bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
                      >
                        <div className="flex flex-wrap items-center gap-2.5">
                          <div className="relative flex h-2 w-2">
                            {isGuestReady ? (
                              <>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </>
                            ) : (
                              <>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                              </>
                            )}
                          </div>
                          <span className="text-[13.5px] font-black text-slate-800 uppercase tracking-wide">
                            Attendee #{idx + 2}{guest.fullName.trim() ? ` — ${guest.fullName.trim()}` : ''}
                          </span>
                          <span className="text-[9px] font-extrabold bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold">
                            {guest.relationship}
                          </span>
                          {isGuestReady ? (
                            <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                              Ready
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                              Pending
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {hasErrors && (
                            <span className="text-[9px] font-bold text-[#d31212] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              Errors
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAttendee(guest.id);
                            }}
                            className="text-rose-500 hover:text-[#d31212] text-[10.5px] font-extrabold bg-transparent border-0 cursor-pointer flex items-center gap-0.5 transition-colors"
                          >
                            Remove
                          </button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="currentColor"
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${!isCollapsed ? 'rotate-180' : ''}`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>

                      {!isCollapsed && (
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                          {renderInputField({
                            label: 'Full Name',
                            type: 'text',
                            value: guest.fullName,
                            onChange: (e) => handleUpdateAttendee(guest.id, 'fullName', e.target.value),
                            placeholder: 'e.g. Mushfiqur Rahim',
                            error: errors.guests?.[guest.id]?.fullName,
                            isValid: guest.fullName.trim().length > 2
                          })}

                          {renderInputField({
                            label: 'Email Address',
                            type: 'email',
                            value: guest.email,
                            onChange: (e) => handleUpdateAttendee(guest.id, 'email', e.target.value),
                            placeholder: 'e.g. companion@domain.com',
                            error: errors.guests?.[guest.id]?.email,
                            isValid: isValidEmail(guest.email)
                          })}

                          {renderInputField({
                            label: 'Mobile Number',
                            type: 'tel',
                            value: guest.phone,
                            onChange: (e) => handleUpdateAttendee(guest.id, 'phone', e.target.value),
                            placeholder: 'e.g. +880 1812 345678',
                            error: errors.guests?.[guest.id]?.phone,
                            isValid: guest.phone.trim().length > 7
                          })}

                          {/* Interactive Relationship Selector pills */}
                          <div className="flex flex-col gap-1.5">
                            <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Relationship</label>
                            <div className="flex flex-wrap gap-2 mt-0.5">
                              {relationOptions.map((rel) => {
                                const isRelActive = guest.relationship === rel;
                                return (
                                  <button
                                    key={rel}
                                    type="button"
                                    onClick={() => handleUpdateAttendee(guest.id, 'relationship', rel)}
                                    className={`px-3 py-2 text-[11px] font-extrabold rounded-lg border-2 transition-all cursor-pointer ${
                                      isRelActive
                                        ? 'border-[#004b95] bg-[#004b95]/5 text-[#004b95]'
                                        : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
                                    }`}
                                  >
                                    {rel}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add Attendee Trigger */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleAddAttendee}
                    className="w-full py-3.5 border-2 border-dashed border-slate-200 hover:border-[#004b95] text-slate-500 hover:text-[#004b95] font-black text-[12px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Another Attendee
                  </button>
                </div>

              </div>

              {/* Submit panel footer */}
              <div className="bg-slate-50/80 px-6 py-5 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[12px] font-semibold text-slate-500 text-center sm:text-left leading-relaxed">
                  Admission is 100% free. Digital badges will be generated immediately.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#004b95] hover:bg-[#003972] text-white font-extrabold text-[13px] rounded-xl transition-all cursor-pointer border-0 uppercase tracking-wider"
                >
                  Get {totalPerson} Free {totalPerson === 1 ? 'ticket' : 'tickets'}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Full screen animated loader backdrop */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center text-white font-montserrat">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
          <div className="bg-white/10 px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] mb-3">
            Processing Entry Request
          </div>
          <p className="text-lg font-bold tracking-tight animate-pulse min-h-[28px]">
            {loaderTexts[loadingStep]}
          </p>
        </div>
      )}
    </div>
  );
}
