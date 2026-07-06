import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import HallGridV2 from './components/HallGridV2';
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
  // 51-52 remains paired
  addUnit([52, 51], 0, 78, 58, 121, true);
  
  // 49-50 split into single
  addUnit([50], 0, 267, 58, 58, false);
  addUnit([49], 0, 330, 58, 58, false);
  
  addUnit([48], 0, 393, 58, 58, false);
  addUnit([47], 0, 456, 58, 58, false);
  addUnit([46], 0, 519, 58, 58, false);
  addUnit([45], 0, 582, 58, 58, false);
  addUnit([44], 0, 645, 58, 58, false);
  addUnit([43], 0, 708, 58, 58, false);
  
  // 41-42 split into single
  addUnit([42], 0, 771, 58, 58, false);
  addUnit([41], 0, 834, 58, 58, false);

  // top horizontal row: y = 78px
  // 53-54 split into single
  addUnit([53], 123, 78, 58, 58, false);
  addUnit([54], 186, 78, 58, 58, false);
  
  addUnit([55], 249, 78, 58, 58, false);
  addUnit([56], 312, 78, 58, 58, false);
  
  // 57-58 split into single
  addUnit([57], 375, 78, 58, 58, false);
  addUnit([58], 438, 78, 58, 58, false);

  // middle clusters — all split into single stalls
  const clusterRows = [
    { top: 204, bottom: 267, nums: [59, 60, 61, 62, 63, 64, 65, 66] },
    { top: 350, bottom: 413, nums: [67, 68, 69, 70, 71, 72, 73, 74] },
    { top: 496, bottom: 559, nums: [75, 76, 77, 78, 79, 80, 81, 82] },
    { top: 642, bottom: 705, nums: [83, 84, 85, 86, 87, 88, 89, 90] }
  ];
  clusterRows.forEach(c => {
    addUnit([c.nums[0]], 123, c.top, 58, 58, false);
    addUnit([c.nums[1]], 186, c.top, 58, 58, false);
    addUnit([c.nums[2]], 249, c.top, 58, 58, false);
    addUnit([c.nums[3]], 312, c.top, 58, 58, false);
    addUnit([c.nums[4]], 123, c.bottom, 58, 58, false);
    addUnit([c.nums[5]], 186, c.bottom, 58, 58, false);
    addUnit([c.nums[6]], 249, c.bottom, 58, 58, false);
    addUnit([c.nums[7]], 312, c.bottom, 58, 58, false);
  });

  // bottom horizontal row: y = 892px
  // 39-40 remains paired
  addUnit([39, 40], 58, 892, 121, 58, true);
  
  addUnit([38], 184, 892, 58, 58, false);
  addUnit([37], 247, 892, 58, 58, false);
  addUnit([36], 310, 892, 58, 58, false);
  
  // 34-35 split into single
  addUnit([35], 373, 892, 58, 58, false);
  addUnit([34], 436, 892, 58, 58, false);

  // Aisle 1 column (x = 435px)
  // 24-25 split into single
  addUnit([24], 435, 204, 58, 58, false);
  addUnit([25], 435, 267, 58, 58, false);
  
  [26, 27, 28, 29, 30, 31].forEach((n, i) => {
    addUnit([n], 435, 330 + i * 63, 58, 58, false);
  });
  
  // 32-33 split into single
  addUnit([32], 435, 708, 58, 58, false);
  addUnit([33], 435, 771, 58, 58, false);

  // Aisle 2 Top Corner: y = 78px
  // 13-14 remains paired
  addUnit([14, 13], 558, 78, 181, 58, true);

  // Aisle 2 Stalls (x = 558px)
  // 22-23 split into single
  addUnit([23], 558, 204, 58, 58, false);
  addUnit([22], 558, 267, 58, 58, false);
  
  [21, 20, 19, 18, 17].forEach((n, i) => {
    addUnit([n], 558, 330 + i * 63, 58, 58, false);
  });
  
  // 15-16 split into single
  addUnit([16], 558, 645, 58, 58, false);
  addUnit([15], 558, 708, 58, 58, false);

  // Rightmost column (x = 739px)
  // 11-12 split into single
  addUnit([12], 739, 136, 58, 58, false);
  addUnit([11], 739, 199.5, 58, 58, false);
  
  [10, 9, 8, 7, 6, 5, 4, 3].forEach((n, i) => {
    addUnit([n], 739, 263 + i * 63.5, 58, 58, false);
  });
  
  // 1-2 remains paired
  addUnit([2, 1], 739, 771, 58, 121, true);

  return units;
}

export default function AppV2() {
  const [units, setUnits] = useState(buildInitialUnits);
  const [heldUnitIds, setHeldUnitIds] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Editor states
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [activeDragId, setActiveDragId] = useState(null);
  const [dragInfo, setDragInfo] = useState(null);
  const [mergeCandidateId, setMergeCandidateId] = useState(null);

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

  // Dragging event listeners
  useEffect(() => {
    if (!activeDragId || !dragInfo) return;

    const handleMouseMove = (e) => {
      const deltaX = (e.clientX - dragInfo.startMouseX) / dragInfo.scale;
      const deltaY = (e.clientY - dragInfo.startMouseY) / dragInfo.scale;

      // Snap to 5px grid for clean alignment
      let nextLeft = Math.round((dragInfo.startLeft + deltaX) / 5) * 5;
      let nextTop = Math.round((dragInfo.startTop + deltaY) / 5) * 5;

      // Bounding limits
      nextLeft = Math.max(0, Math.min(739, nextLeft));
      nextTop = Math.max(0, Math.min(1000, nextTop));

      setUnits((prev) =>
        prev.map((u) => (u.id === activeDragId ? { ...u, left: nextLeft, top: nextTop } : u))
      );

      // Check for overlap merge candidates dynamically
      const dragged = units.find((u) => u.id === activeDragId);
      if (dragged) {
        let bestTarget = null;
        let maxOverlap = 0;

        units.forEach((u) => {
          if (u.id === activeDragId) return;
          const xOverlap = Math.max(
            0,
            Math.min(nextLeft + dragged.width, u.left + u.width) - Math.max(nextLeft, u.left)
          );
          const yOverlap = Math.max(
            0,
            Math.min(nextTop + dragged.height, u.top + u.height) - Math.max(nextTop, u.top)
          );
          const overlapArea = xOverlap * yOverlap;
          const minArea = Math.min(dragged.width * dragged.height, u.width * u.height);

          if (overlapArea > minArea * 0.25 && overlapArea > maxOverlap) {
            maxOverlap = overlapArea;
            bestTarget = u.id;
          }
        });
        setMergeCandidateId(bestTarget);
      }
    };

    const handleMouseUp = () => {
      if (activeDragId && mergeCandidateId) {
        const stallA = units.find((u) => u.id === activeDragId);
        const stallB = units.find((u) => u.id === mergeCandidateId);
        if (stallA && stallB) {
          mergeStalls(stallA, stallB);
        }
      }
      setActiveDragId(null);
      setDragInfo(null);
      setMergeCandidateId(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDragId, dragInfo, mergeCandidateId, units]);

  // Merge logic
  const mergeStalls = (stallA, stallB) => {
    const combinedNums = [...new Set([...stallA.nums, ...stallB.nums])].sort((a, b) => a - b);
    const label = combinedNums.join(' · ');
    const id = 'u' + combinedNums.join('-');
    const price = stallA.price + stallB.price;

    const left = Math.min(stallA.left, stallB.left);
    const top = Math.min(stallA.top, stallB.top);
    const width = Math.max(stallA.left + stallA.width, stallB.left + stallB.width) - left;
    const height = Math.max(stallA.top + stallA.height, stallB.top + stallB.height) - top;

    const isCorner = stallA.isCorner || stallB.isCorner;
    let status = 'available';
    if (stallA.status === 'booked' || stallB.status === 'booked') {
      status = 'booked';
    } else if (stallA.status === 'held-other' || stallB.status === 'held-other') {
      status = 'held-other';
    } else if (stallA.status === 'held-mine' || stallB.status === 'held-mine') {
      status = 'held-mine';
    }

    const mergedUnit = {
      id,
      nums: combinedNums,
      label,
      price,
      left,
      top,
      width,
      height,
      isCorner,
      status,
      holdRemaining: Math.max(stallA.holdRemaining || 0, stallB.holdRemaining || 0),
    };

    setUnits((prev) => {
      const filtered = prev.filter((u) => u.id !== stallA.id && u.id !== stallB.id);
      return [...filtered, mergedUnit];
    });

    setSelectedUnitId(id);
    addToast(`Merged Stall ${stallA.label} and ${stallB.label} ➜ Stall ${label}`);
  };

  // Split logic
  const handleSplitStall = (stallId) => {
    const stall = units.find((u) => u.id === stallId);
    if (!stall || stall.nums.length <= 1) return;

    const N = stall.nums.length;
    const isVertical = stall.height > stall.width;
    const splitUnits = [];

    stall.nums.forEach((num, index) => {
      const id = `u${num}`;
      const label = String(num);
      const price = 80000;
      const width = 58;
      const height = 58;
      const isCorner = false; // reset individual corner flags
      const status = 'available';

      const left = isVertical ? stall.left : stall.left + index * 63;
      const top = isVertical ? stall.top + index * 63 : stall.top;

      splitUnits.push({
        id,
        nums: [num],
        label,
        price,
        left,
        top,
        width,
        height,
        isCorner,
        status,
        holdRemaining: 0,
      });
    });

    setUnits((prev) => {
      const filtered = prev.filter((u) => u.id !== stallId);
      return [...filtered, ...splitUnits];
    });

    setSelectedUnitId(null);
    addToast(`Split combined Stall ${stall.label} back to individual single booths.`);
  };

  // Initiate dragging from custom mouse handler
  const handleStallDragStart = (e, stallId) => {
    if (!isEditorMode) return;
    e.preventDefault();

    const stall = units.find((u) => u.id === stallId);
    if (!stall) return;

    const gridEl = document.getElementById('hallGrid');
    if (!gridEl) return;
    const rect = gridEl.getBoundingClientRect();
    const scale = rect.width / 797;

    setActiveDragId(stallId);
    setDragInfo({
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startLeft: stall.left,
      startTop: stall.top,
      scale,
    });
  };

  // Hold Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setUnits((prevUnits) => {
        const expiredMineIds = [];
        const nextUnits = prevUnits.map((u) => {
          if (u.status === 'held-mine' || u.status === 'held-other') {
            const nextVal = u.holdRemaining - 1;
            if (nextVal <= 0) {
              if (u.status === 'held-mine') expiredMineIds.push(u.id);
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

  // Sync hold timers
  useEffect(() => {
    if (checkoutOpen) {
      setUnits((prev) =>
        prev.map((u) => (u.status === 'held-mine' ? { ...u, holdRemaining: 300 } : u))
      );
    } else {
      setUnits((prev) =>
        prev.map((u) =>
          u.status === 'held-mine' && u.holdRemaining > 60 ? { ...u, holdRemaining: 60 } : u
        )
      );
    }
  }, [checkoutOpen]);

  // Click handler
  const handleStallClick = (id) => {
    if (isEditorMode) {
      setSelectedUnitId(id);
      return;
    }
    const unit = units.find((u) => u.id === id);
    if (!unit) return;

    if (unit.status === 'available') {
      setUnits((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: 'held-mine', holdRemaining: 60 } : u))
      );
      setHeldUnitIds((prev) => [...prev, id]);
      addToast(`Stall ${unit.label} placed on hold for 60s.`);
    } else if (unit.status === 'held-mine') {
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
      params.append('success_url', `${window.location.origin}/api/callback?status=success`);
      params.append('fail_url', `${window.location.origin}/api/callback?status=fail`);
      params.append('cancel_url', `${window.location.origin}/api/callback?status=cancel`);
      
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

      const response = await fetch('/api/initiate', {
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
    if (window.confirm('Reset layout to initial defaults?')) {
      localStorage.removeItem('booked_stalls_store');
      localStorage.removeItem('pending_stall_order');
      setUnits(buildInitialUnits());
      setHeldUnitIds([]);
      setSelectedUnitId(null);
      setCheckoutOpen(false);
      setConfirmOpen(false);
      addToast('Layout reset successfully.');
    }
  };

  const selectedUnit = units.find((u) => u.id === selectedUnitId);
  const heldStalls = units.filter((u) => heldUnitIds.includes(u.id));
  const totalHeldPrice = heldStalls.reduce((sum, u) => sum + u.price, 0);
  const combinedLabels = heldStalls.map((u) => u.label).join(', ');
  const minHoldRemaining =
    heldStalls.length > 0 ? Math.min(...heldStalls.map((u) => u.holdRemaining)) : 0;

  const fmtBDTLocal = (n) => {
    const s = String(n);
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    if (rest.length) rest = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ',');
    return '৳' + (rest.length ? rest + ',' : '') + last3;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '60px' }}>
      <Navbar />
      
      {/* Editor control panel */}
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between bg-white border border-slate-200 rounded-xl mb-4 mt-2 font-montserrat">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#155dfc] animate-pulse"></div>
          <span className="text-[14px] font-bold text-slate-800 uppercase tracking-wide">Layout Organizer (V2 Page)</span>
        </div>
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setIsEditorMode(!isEditorMode)}
            className={`px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer transition-all border ${
              isEditorMode
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isEditorMode ? '🛠️ Mode: Organizer Active' : '🔍 Mode: Booking Active'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] text-slate-600 font-bold hover:bg-slate-50 transition-all cursor-pointer"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      <Header stats={stats} />

      <div className="max-w-[1600px] mx-auto grid gap-7 px-6 py-2 items-start" style={{ gridTemplateColumns: '1fr 310px' }}>
        
        {/* Pass down editor mouse triggers */}
        <HallGridV2
          units={units}
          onStallClick={handleStallClick}
          isEditorMode={isEditorMode}
          activeDragId={activeDragId}
          mergeCandidateId={mergeCandidateId}
          onStallDragStart={handleStallDragStart}
        />

        <div className="flex flex-col gap-5">
          <Legend />
          
          <DescriptionCard
            selectedUnit={selectedUnit}
            onBookClick={() => setCheckoutOpen(true)}
            onReleaseClick={handleCancelHold}
            isEditorMode={isEditorMode}
            onSplitClick={() => handleSplitStall(selectedUnitId)}
          />
        </div>
      </div>

      {/* Floating Hold Panel */}
      {heldStalls.length > 0 && !checkoutOpen && (
        <div className="fixed bottom-5 right-5 z-[400] w-[320px] bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-5 font-montserrat">
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
            <button className="flex-[2] py-2.5 rounded-lg text-[12px] font-bold text-white bg-gradient-to-r from-[#155dfc] to-[#4f39f6] transition-all cursor-pointer border-0" onClick={() => setCheckoutOpen(true)}>Book Now</button>
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

      <Toast toasts={toasts} />
    </div>
  );
}
