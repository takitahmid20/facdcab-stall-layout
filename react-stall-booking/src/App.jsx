import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import HallGrid from './components/HallGrid';
import Legend from './components/Legend';
import DescriptionCard from './components/DescriptionCard';
import CheckoutModal from './components/CheckoutModal';
import ConfirmationModal from './components/ConfirmationModal';
import Toast from './components/Toast';
import './styles/index.css';
import './styles/Modal.css';

// Seed booking config
const BOOKED_SEED = [6, 7, 8, 20, 44, 61, 62, 63, 64, 69, 70, 71, 72, 77, 78, 79, 80, 85, 86, 87, 88];
const HELD_OTHER_SEED = [68, 30];

// Helper to construct all unit objects matching coordinates engine
function buildInitialUnits() {
  const units = [];
  const localBooked = JSON.parse(localStorage.getItem('booked_stalls_store') || '[]');

  function addUnit(nums, left, top, width, height, isCorner) {
    const price = nums.length > 1 ? 160000 : 80000;
    const label = nums.length > 1 ? nums.slice().sort((a, b) => a - b).join(' · ') : String(nums[0]);
    const id = 'u' + nums.slice().sort((a, b) => a - b).join('-');

    let status = 'available';
    let holdRemaining = 0;

    // Seed state initialization
    if (nums.some(n => BOOKED_SEED.includes(n)) || localBooked.includes(id) || id === 'u41-42') {
      status = 'booked';
    } else if (nums.some(n => HELD_OTHER_SEED.includes(n))) {
      status = 'held-other';
      holdRemaining = 20 + Math.floor(Math.random() * 30);
    }

    units.push({
      id,
      nums,
      label,
      price,
      left,
      top,
      width,
      height,
      isCorner,
      status,
      holdRemaining,
    });
  }

  // left column (col 0): x = 0px
  addUnit([52, 51], 0, 78, 58, 121, true);
  addUnit([49, 50], 0, 267, 58, 121, true);
  addUnit([48], 0, 393, 58, 58, false);
  addUnit([47], 0, 456, 58, 58, false);
  addUnit([46], 0, 519, 58, 58, false);
  addUnit([45], 0, 582, 58, 58, false);
  addUnit([44], 0, 645, 58, 58, false);
  addUnit([43], 0, 708, 58, 58, false);
  addUnit([42, 41], 0, 771, 58, 121, true);

  // top horizontal row: y = 78px
  addUnit([53, 54], 123, 78, 121, 58, true);
  addUnit([55], 249, 78, 58, 58, false);
  addUnit([56], 312, 78, 58, 58, false);
  addUnit([57, 58], 375, 78, 121, 58, true);

  // middle clusters (combined horizontal pairs: 59-60, 61-62, etc. each taking 121px width)
  const clusterRows = [
    { top: 204, bottom: 267, nums: [59, 60, 61, 62, 63, 64, 65, 66] },
    { top: 350, bottom: 413, nums: [67, 68, 69, 70, 71, 72, 73, 74] },
    { top: 496, bottom: 559, nums: [75, 76, 77, 78, 79, 80, 81, 82] },
    { top: 642, bottom: 705, nums: [83, 84, 85, 86, 87, 88, 89, 90] }
  ];
  clusterRows.forEach(c => {
    addUnit([c.nums[0], c.nums[1]], 123, c.top, 121, 58, false);
    addUnit([c.nums[2], c.nums[3]], 249, c.top, 121, 58, false);
    addUnit([c.nums[4], c.nums[5]], 123, c.bottom, 121, 58, false);
    addUnit([c.nums[6], c.nums[7]], 249, c.bottom, 121, 58, false);
  });

  // bottom horizontal row: y = 892px (diagonal point contact with 41, starts at x = 58px)
  addUnit([39, 40], 58, 892, 121, 58, true);
  addUnit([38], 184, 892, 58, 58, false);
  addUnit([37], 247, 892, 58, 58, false);
  addUnit([36], 310, 892, 58, 58, false);
  addUnit([34, 35], 373, 892, 121, 58, true);

  // Aisle 1 column (x = 435px)
  addUnit([24, 25], 435, 204, 58, 121, true);
  [26, 27, 28, 29, 30, 31].forEach((n, i) => {
    addUnit([n], 435, 330 + i * 63, 58, 58, false);
  });
  addUnit([32, 33], 435, 708, 58, 121, true);

  // Aisle 2 Top Corner: y = 78px
  addUnit([14, 13], 558, 78, 181, 58, true);

  // Aisle 2 Stalls (x = 558px)
  addUnit([22, 23], 558, 204, 58, 121, true);
  [21, 20, 19, 18, 17].forEach((n, i) => {
    addUnit([n], 558, 330 + i * 63, 58, 58, false);
  });
  addUnit([15, 16], 558, 645, 58, 121, true);

  // Rightmost column (x = 739px)
  addUnit([11, 12], 739, 136, 58, 121.5, true);
  [10, 9, 8, 7, 6, 5, 4, 3].forEach((n, i) => {
    addUnit([n], 739, 263 + i * 63.5, 58, 58, false);
  });
  addUnit([2, 1], 739, 771, 58, 121, true);

  return units;
}

export default function App() {
  const [units, setUnits] = useState(buildInitialUnits);
  const [heldUnitIds, setHeldUnitIds] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Handle payment response redirection parameters on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const payStatus = urlParams.get('payment_status');
    const tranId = urlParams.get('tran_id');

    if (payStatus) {
      const savedOrderStr = localStorage.getItem('pending_stall_order');
      if (savedOrderStr) {
        const order = JSON.parse(savedOrderStr);
        if (payStatus === 'success') {
          // Permanently book units locally
          const localBooked = JSON.parse(localStorage.getItem('booked_stalls_store') || '[]');
          const updatedBooked = [...new Set([...localBooked, ...order.stallIds])];
          localStorage.setItem('booked_stalls_store', JSON.stringify(updatedBooked));

          // Set units state immediately
          setUnits((prev) =>
            prev.map((u) => (order.stallIds.includes(u.id) ? { ...u, status: 'booked', holdRemaining: 0 } : u))
          );
          
          setConfirmData({
            stallLabel: order.stallLabel,
            email: order.email,
            amount: order.amount,
            name: order.name,
          });
          setConfirmOpen(true);
          addToast(`Stalls ${order.stallLabel} booked successfully!`);
        } else if (payStatus === 'fail') {
          addToast(`Payment failed for Stalls ${order.stallLabel}. Please try again.`);
        } else if (payStatus === 'cancel') {
          addToast(`Payment cancelled for Stalls ${order.stallLabel}.`);
        }
        localStorage.removeItem('pending_stall_order');
      }
      // Clean query params from URL without refreshing page
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Stats calculation
  const stats = {
    available: units.filter((u) => u.status === 'available').length,
    onHold: units.filter((u) => u.status === 'held-mine' || u.status === 'held-other').length,
    booked: units.filter((u) => u.status === 'booked').length,
  };

  // Toast helper
  const addToast = (text) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Hold Timer Effect — ticks every second for held-mine and held-other stalls
  useEffect(() => {
    const timer = setInterval(() => {
      setUnits((prevUnits) => {
        const expiredMineIds = [];
        const nextUnits = prevUnits.map((u) => {
          if (u.status === 'held-mine' || u.status === 'held-other') {
            const nextVal = u.holdRemaining - 1;
            if (nextVal <= 0) {
              if (u.status === 'held-mine') {
                expiredMineIds.push(u.id);
              }
              return { ...u, status: 'available', holdRemaining: 0 };
            }
            return { ...u, holdRemaining: nextVal };
          }
          return u;
        });

        if (expiredMineIds.length > 0) {
          setHeldUnitIds((prev) => prev.filter((id) => !expiredMineIds.includes(id)));
          expiredMineIds.forEach((id) => {
            const label = prevUnits.find((u) => u.id === id)?.label;
            if (label) addToast(`Hold expired for Stall ${label}`);
          });
        }
        return nextUnits;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Extend hold timers to 5 minutes when checkout opens; revert cap to 60s when it closes
  useEffect(() => {
    if (checkoutOpen) {
      // Boost all held-mine stalls to 300s (5 minutes)
      setUnits((prev) =>
        prev.map((u) =>
          u.status === 'held-mine' ? { ...u, holdRemaining: 300 } : u
        )
      );
    } else {
      // If checkout closed without booking, cap remaining time back to max 60s
      setUnits((prev) =>
        prev.map((u) =>
          u.status === 'held-mine' && u.holdRemaining > 60
            ? { ...u, holdRemaining: 60 }
            : u
        )
      );
    }
  }, [checkoutOpen]);


  const handleStallClick = (id) => {
    const unit = units.find((u) => u.id === id);
    if (!unit) return;

    setSelectedUnitId(id);

    if (unit.status === 'available') {
      // Hold this unit
      setUnits((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: 'held-mine', holdRemaining: 60 } : u))
      );
      setHeldUnitIds((prev) => [...prev, id]);
      addToast(`Stall ${unit.label} placed on hold for 60s.`);
    } else if (unit.status === 'held-mine') {
      // Release this unit
      setUnits((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: 'available', holdRemaining: 0 } : u))
      );
      setHeldUnitIds((prev) => prev.filter((heldId) => heldId !== id));
      addToast(`Released hold on Stall ${unit.label}.`);
    }
  };

  const handleCancelHold = () => {
    if (heldUnitIds.length === 0) return;
    setUnits((prev) =>
      prev.map((u) => (heldUnitIds.includes(u.id) ? { ...u, status: 'available', holdRemaining: 0 } : u))
    );
    setHeldUnitIds([]);
    setSelectedUnitId(null);
    setCheckoutOpen(false);
    addToast('Released hold on all selected stalls.');
  };

  const handleCheckoutSubmit = async (formData) => {
    if (heldUnitIds.length === 0) return;
    const heldStallsList = units.filter((u) => heldUnitIds.includes(u.id));
    const totalAmount = heldStallsList.reduce((sum, u) => sum + u.price, 0);
    const combinedLabels = heldStallsList.map((u) => u.label).join(', ');
    const orderId = `EXPO-MULTI-${Date.now()}`;

    // Store in localStorage to recover after redirect
    const pendingOrder = {
      stallIds: [...heldUnitIds],
      stallLabel: combinedLabels,
      email: formData.email,
      amount: totalAmount,
      name: formData.name,
      phone: formData.phone,
      orderId,
    };
    localStorage.setItem('pending_stall_order', JSON.stringify(pendingOrder));

    addToast('Redirecting to SSLCommerz Secure Payment Gateway...');

    try {
      const params = new URLSearchParams();
      params.append('store_id', import.meta.env.VITE_SSLCOMMERZ_STORE_ID || 'asdas6971c45b4de59');
      params.append('store_passwd', import.meta.env.VITE_SSLCOMMERZ_STORE_PASSWORD || 'asdas6971c45b4de59@ssl');
      params.append('total_amount', String(totalAmount));
      params.append('currency', 'BDT');
      params.append('tran_id', orderId);
      params.append('success_url', `${window.location.origin}/payment-success`);
      params.append('fail_url', `${window.location.origin}/payment-fail`);
      params.append('cancel_url', `${window.location.origin}/payment-cancel`);
      
      params.append('cus_name', formData.name);
      params.append('cus_email', formData.email);
      params.append('cus_phone', formData.phone);
      params.append('cus_add1', 'Dhaka');
      params.append('cus_city', 'Dhaka');
      params.append('cus_country', 'Bangladesh');
      params.append('shipping_method', 'NO');
      params.append('product_name', combinedLabels);
      params.append('product_category', 'Stall');
      params.append('product_profile', 'general');

      const response = await fetch('/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();
      if (data.status === 'SUCCESS' && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        addToast(`Gateway initiation failed: ${data.failedreason || 'Unknown error'}`);
        localStorage.removeItem('pending_stall_order');
      }
    } catch (err) {
      console.error(err);
      addToast('Error contacting SSLCommerz gateway. Please try again.');
      localStorage.removeItem('pending_stall_order');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset the map back to default demo state?')) {
      localStorage.removeItem('booked_stalls_store');
      localStorage.removeItem('pending_stall_order');
      setUnits(buildInitialUnits());
      setHeldUnitIds([]);
      setSelectedUnitId(null);
      setCheckoutOpen(false);
      setConfirmOpen(false);
      addToast('Prototype reset successfully.');
    }
  };

  const heldStalls = units.filter((u) => heldUnitIds.includes(u.id));
  const selectedUnit = units.find((u) => u.id === selectedUnitId);

  const minHoldRemaining = heldStalls.length > 0 ? Math.min(...heldStalls.map((u) => u.holdRemaining)) : 0;
  const combinedLabels = heldStalls.map((u) => u.label).join(', ');
  const totalHeldPrice = heldStalls.reduce((sum, u) => sum + u.price, 0);

  // Format currency helpers for panel BDT formatting
  const fmtBDTLocal = (n) => {
    const s = String(n);
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
    return '৳' + (rest.length ? rest + ',' : '') + last3;
  };

  return (
    <>
      <Navbar />
      <Header stats={stats} />

      <div className="max-w-[1600px] mx-auto grid gap-7 px-6 py-6 items-start" style={{ gridTemplateColumns: '1fr 310px' }}>
        <HallGrid units={units} onStallClick={handleStallClick} />

        <div className="flex flex-col gap-5">
          <Legend />
          <DescriptionCard
            selectedUnit={selectedUnit}
            onBookClick={() => setCheckoutOpen(true)}
            onReleaseClick={handleCancelHold}
          />
        </div>
      </div>

      {/* Floating Hold Panel */}
      {heldStalls.length > 0 && !checkoutOpen && (
        <div className="fixed bottom-5 right-5 z-[400] w-[320px] bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 font-montserrat">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13.5px] font-bold text-slate-800">{heldStalls.length} {heldStalls.length === 1 ? 'Stall' : 'Stalls'} Held</span>
            <button className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer border-0 bg-transparent text-sm" onClick={handleCancelHold}>✕</button>
          </div>
          <div className="text-[13px] text-slate-600 font-medium mb-2 max-h-[60px] overflow-y-auto">
            Stalls: {combinedLabels}
          </div>
          <div className="text-[15px] font-extrabold text-[#155dfc] mb-3">
            Total Price: {fmtBDTLocal(totalHeldPrice)}
          </div>
          <div className="mb-3">
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Expires: {minHoldRemaining}s</div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#155dfc] to-[#4f39f6] rounded-full transition-all duration-1000" style={{ width: `${(minHoldRemaining / 60) * 100}%` }}></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-lg text-[12px] font-bold border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-all cursor-pointer" onClick={handleCancelHold}>Release All</button>
            <button className="flex-[2] py-2.5 rounded-lg text-[12px] font-bold text-white bg-gradient-to-r from-[#155dfc] to-[#4f39f6] shadow-[0_4px_10px_rgba(21,93,252,0.2)] hover:shadow-[0_6px_14px_rgba(21,93,252,0.35)] transition-all cursor-pointer border-0" onClick={() => setCheckoutOpen(true)}>Book Now</button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && heldStalls.length > 0 && (
        <CheckoutModal
          heldStalls={heldStalls}
          onClose={() => setCheckoutOpen(false)}
          onSubmit={handleCheckoutSubmit}
        />
      )}

      {/* Confirmation Modal */}
      {confirmOpen && confirmData && (
        <ConfirmationModal
          data={confirmData}
          onClose={() => setConfirmOpen(false)}
        />
      )}



      {/* Toast wrap container */}
      <Toast toasts={toasts} />

      {/* Reset button */}
      <button
        className="fixed left-5 bottom-5 z-40 bg-white border border-slate-200 rounded-lg text-slate-500 text-[11px] px-3.5 py-2 cursor-pointer font-space-mono shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:text-[#155dfc] hover:border-[#155dfc] hover:shadow-[0_4px_12px_rgba(21,93,252,0.08)] transition-all duration-200"
        onClick={handleReset}
      >
        ↺ Reset prototype
      </button>
    </>
  );
}
