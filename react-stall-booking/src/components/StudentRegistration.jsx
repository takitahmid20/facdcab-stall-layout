import React, { useState } from 'react';
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

    // Redirect to separate success page
    navigate('/register-success', { state: { registeredList: list } });
  };

  const totalPerson = 1 + additionalAttendees.length;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white p-6 md:p-10 -[0_12px_40px_rgba(21,93,252,0.15)] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <span className="bg-white/20 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Education Expo 2026</span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-3 leading-tight tracking-tight">
              FACD-CAB 14th International Education Expo 2026
            </h1>
            <p className="text-white/80 text-[13px] font-medium mt-2 max-w-xl">
              Connecting dreams, creating opportunities. Meet top global university representatives and explore careers.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-center w-full md:w-auto md:min-w-[200px]">
            <div className="text-[10px] uppercase font-bold text-white/70 tracking-widest">Registration Status</div>
            <div className="text-[22px] font-black text-white mt-1">FREE ENTRY</div>
            <div className="text-[11px] text-white/80 mt-1 font-semibold">August 7 & 8, 2026</div>
          </div>
        </div>

        {/* Form View - Clean Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-300 -[0_12px_36px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-black text-slate-800 tracking-tight">Student Registration Form</h2>
              <p className="text-slate-500 text-[12.5px] mt-1 font-medium">Please provide accurate details to generate free admission tickets.</p>
            </div>
            <span className="self-start sm:self-auto text-[9.5px] font-bold text-amber-700 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono shrink-0">
              100% Free Pass
            </span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6">
            
            {/* Primary Attendee Block - Flat Section */}
            <div className="py-2">
              
              {/* Collapsible Header */}
              <button
                type="button"
                onClick={() => setPrimaryExpanded(!primaryExpanded)}
                className="w-full flex items-center justify-between py-3 text-left border-b border-slate-200 bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#155dfc]"></div>
                  <span className="text-[14px] font-black text-slate-800 uppercase tracking-wide">
                    Attendee #1{formData.fullName.trim() ? ` — ${formData.fullName.trim()}` : ''}
                  </span>
                  <span className="text-[9px] font-extrabold bg-[#155dfc]/10 text-[#155dfc] border border-[#155dfc]/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Primary
                  </span>
                  {formData.fullName.trim() && formData.email.trim() && formData.phone.trim() ? (
                    <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-250 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      ✓ Ready
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-250 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono animate-pulse">
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

              {/* Collapsible Content */}
              {primaryExpanded && (
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.fullName ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                      placeholder="e.g. Shakib Al Hasan"
                    />
                    {errors.fullName && <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.email ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                      placeholder="e.g. name@domain.com"
                    />
                    {errors.email && <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.phone ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                      placeholder="e.g. +880 17XX XXXXXX"
                    />
                    {errors.phone && <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.phone}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Attendees Section - Collapsible Flat Sections */}
            {additionalAttendees.map((guest, idx) => {
              const isCollapsed = !!collapsedAttendees[guest.id];
              const hasErrors = errors.guests?.[guest.id];
              
              return (
                <div key={guest.id} className="py-2 border-t border-slate-200">
                  
                  {/* Collapsible Header */}
                  <div
                    onClick={() => toggleAttendeeCollapse(guest.id)}
                    className="w-full flex items-center justify-between py-3 text-left bg-transparent cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      <span className="text-[14px] font-black text-slate-800 uppercase tracking-wide">
                        Attendee #{idx + 2}{guest.fullName.trim() ? ` — ${guest.fullName.trim()}` : ''}
                      </span>
                      <span className="text-[9px] font-extrabold bg-indigo-55 bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {guest.relationship}
                      </span>
                      {guest.fullName.trim() && guest.email.trim() && guest.phone.trim() ? (
                        <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-250 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          ✓ Ready
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-250 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono animate-pulse">
                          ⚠ Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {hasErrors && (
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          Errors
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAttendee(guest.id);
                        }}
                        className="text-rose-500 hover:text-rose-700 text-[11px] font-extrabold bg-transparent border-0 cursor-pointer flex items-center gap-0.5 hover:scale-105 transition-transform"
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

                  {/* Collapsible Content */}
                  {!isCollapsed && (
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Full Name</label>
                        <input
                          type="text"
                          value={guest.fullName}
                          onChange={(e) => handleUpdateAttendee(guest.id, 'fullName', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.guests?.[guest.id]?.fullName ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                          placeholder="e.g. Mushfiqur Rahim"
                        />
                        {errors.guests?.[guest.id]?.fullName && (
                          <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.guests[guest.id].fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          value={guest.email}
                          onChange={(e) => handleUpdateAttendee(guest.id, 'email', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.guests?.[guest.id]?.email ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                          placeholder="e.g. companion@domain.com"
                        />
                        {errors.guests?.[guest.id]?.email && (
                          <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.guests[guest.id].email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Mobile Number</label>
                        <input
                          type="tel"
                          value={guest.phone}
                          onChange={(e) => handleUpdateAttendee(guest.id, 'phone', e.target.value)}
                          className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${ errors.guests?.[guest.id]?.phone ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10' }`}
                          placeholder="e.g. +880 18XX XXXXXX"
                        />
                        {errors.guests?.[guest.id]?.phone && (
                          <p className="text-rose-600 text-[11px] font-bold mt-1.5">{errors.guests[guest.id].phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11.5px] font-extrabold text-slate-800 uppercase tracking-wider mb-2">Relationship</label>
                        <select
                          value={guest.relationship}
                          onChange={(e) => handleUpdateAttendee(guest.id, 'relationship', e.target.value)}
                          className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-[13.5px] font-semibold text-slate-800 focus:outline-none focus:border-[#155dfc] focus:ring-2 focus:ring-[#155dfc]/10 transition-all cursor-pointer"
                        >
                          <option value="Friend">Friend</option>
                          <option value="Family Member">Family Member</option>
                          <option value="Parent">Parent</option>
                          <option value="Classmate">Classmate</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Attendee Trigger - Clean Flat Style */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleAddAttendee}
                className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-[#155dfc] text-slate-600 hover:text-[#155dfc] font-black text-[12.5px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Another Attendee
              </button>
            </div>

          </div>

          <div className="bg-slate-50 px-6 md:p-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[12.5px] font-semibold text-slate-500 text-center sm:text-left">
              Your entry passes will be issued instantly. Bring digital or printed copy.
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#155dfc] to-[#4f39f6] text-white font-extrabold text-[13.5px] rounded-full -[0_6px_20px_rgba(21,93,252,0.25)] hover:scale-[1.02] -[0_8px_24px_rgba(21,93,252,0.35)] transition-all cursor-pointer border-0 uppercase tracking-wider"
            >
              Get {totalPerson} Free {totalPerson === 1 ? 'ticket' : 'tickets'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
