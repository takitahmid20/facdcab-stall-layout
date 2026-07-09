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
        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider">{label}</label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full pl-4 pr-10 py-3.5 bg-white border-2 rounded-xl text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
              error
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-100 bg-rose-50/10'
                : isValid
                ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                : 'border-slate-200 focus:border-[#004b95] focus:ring-2 focus:ring-[#004b95]/10'
            }`}
          />
          {isValid && !error && (
            <div className="absolute right-3.5 top-[50%] -translate-y-[50%] text-emerald-500 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        {error && <p className="text-rose-600 text-[11px] font-bold mt-0.5">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* Branding Event Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#004b95] text-white p-6 md:p-10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <span className="bg-white/10 border border-white/20 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Education Expo 2026</span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-3.5 leading-tight tracking-tight">
              FACD-CAB 14th International Education Expo 2026
            </h1>
            <p className="text-white/70 text-[13px] font-medium mt-2 max-w-xl leading-relaxed">
              Connecting dreams, creating global opportunities. Meet global university consultants, explore scholarship choices, and build your career path.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 text-center w-full md:w-auto md:min-w-[210px] shrink-0">
            <div className="text-[9.5px] uppercase font-bold text-white/60 tracking-widest">Registration Ticket Cost</div>
            <div className="text-[22px] font-black text-white mt-1">100% FREE</div>
            <div className="text-[11px] text-white/80 mt-1 font-semibold">July 10 & 11, 2026</div>
          </div>
        </div>

        {/* Redesigned Student Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          
          {/* Header Row styled with RED 14th badge signature */}
          <div className="p-5 md:p-8 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#d31212] text-white font-extrabold text-[13px] px-2.5 py-1.5 rounded uppercase tracking-wide shrink-0">
                14<sup>th</sup>
              </span>
              <div>
                <h2 className="text-[18px] font-black text-slate-800 tracking-tight leading-tight">Student Registration Form</h2>
                <p className="text-slate-500 text-[12px] mt-0.5 font-medium">Please provide accurate attendee details to generate free expo tickets.</p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[9.5px] font-bold text-amber-700 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono shrink-0">
              Free Pass Assigned
            </span>
          </div>

          <div className="p-5 md:p-8 flex flex-col gap-6">
            
            {/* Primary Attendee Block - Accordion Section */}
            <div className="py-1">
              
              {/* Accordion Header bar */}
              <button
                type="button"
                onClick={() => setPrimaryExpanded(!primaryExpanded)}
                className="w-full flex items-center justify-between py-3.5 text-left border-b border-slate-200 bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative flex h-2.5 w-2.5">
                    {/* Glowing pulse rings for active status check */}
                    {formData.fullName.trim() && formData.email.trim() && formData.phone.trim() ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </>
                    ) : (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </>
                    )}
                  </div>
                  <span className="text-[14px] font-black text-slate-800 uppercase tracking-wide">
                    Attendee #1{formData.fullName.trim() ? ` — ${formData.fullName.trim()}` : ''}
                  </span>
                  <span className="text-[9px] font-extrabold bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Primary
                  </span>
                  {formData.fullName.trim() && formData.email.trim() && formData.phone.trim() ? (
                    <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      ✓ Ready
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      ⚠ Pending
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {!primaryExpanded && formData.fullName.trim() && (
                    <span className="text-[11px] font-semibold text-slate-400 font-mono hidden sm:inline">
                      Collapsed
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${primaryExpanded ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Accordion inputs wrapper */}
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

            {/* Additional Attendees Section */}
            {additionalAttendees.map((guest, idx) => {
              const isCollapsed = !!collapsedAttendees[guest.id];
              const hasErrors = errors.guests?.[guest.id];
              const isGuestReady = guest.fullName.trim() && guest.email.trim() && guest.phone.trim();
              
              return (
                <div key={guest.id} className="py-2 border-t border-slate-100">
                  
                  {/* Accordion header bar */}
                  <div
                    onClick={() => toggleAttendeeCollapse(guest.id)}
                    className="w-full flex items-center justify-between py-3.5 text-left bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="relative flex h-2.5 w-2.5">
                        {isGuestReady ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </>
                        ) : (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                          </>
                        )}
                      </div>
                      <span className="text-[14px] font-black text-slate-800 uppercase tracking-wide">
                        Attendee #{idx + 2}{guest.fullName.trim() ? ` — ${guest.fullName.trim()}` : ''}
                      </span>
                      <span className="text-[9px] font-extrabold bg-[#004b95]/5 text-[#004b95] border border-[#004b95]/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {guest.relationship}
                      </span>
                      {isGuestReady ? (
                        <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          ✓ Ready
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          ⚠ Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {hasErrors && (
                        <span className="text-[9px] font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono animate-pulse">
                          Fix Errors
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAttendee(guest.id);
                        }}
                        className="text-rose-500 hover:text-[#d31212] text-[11px] font-extrabold bg-transparent border-0 cursor-pointer flex items-center gap-0.5 transition-colors"
                      >
                        ✕ Remove
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${!isCollapsed ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Accordion Inputs wrapper */}
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

                      {/* Interactive relation pills replaces select list */}
                      <div className="flex flex-col gap-1.5">
                        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider">Relationship</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {relationOptions.map((rel) => {
                            const isRelActive = guest.relationship === rel;
                            return (
                              <button
                                key={rel}
                                type="button"
                                onClick={() => handleUpdateAttendee(guest.id, 'relationship', rel)}
                                className={`px-4 py-2.5 text-[12px] font-extrabold rounded-xl border-2 transition-all cursor-pointer border-box ${
                                  isRelActive
                                    ? 'border-[#004b95] bg-[#004b95]/5 text-[#004b95]'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
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

            {/* Add Attendee Trigger button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAddAttendee}
                className="w-full py-4 border-2 border-dashed border-slate-200 hover:border-[#004b95] text-slate-500 hover:text-[#004b95] font-black text-[12.5px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Another Attendee
              </button>
            </div>

          </div>

          {/* Form Actions Footer */}
          <div className="bg-slate-50 px-6 md:p-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[12.5px] font-semibold text-slate-500 text-center sm:text-left">
              Your free passes will be issued instantly. Bring digital or printed copy.
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-[#004b95] hover:bg-[#003972] text-white font-extrabold text-[13.5px] rounded-full transition-all cursor-pointer border-0 uppercase tracking-wider"
            >
              Get {totalPerson} Free {totalPerson === 1 ? 'ticket' : 'tickets'}
            </button>
          </div>
        </form>
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
