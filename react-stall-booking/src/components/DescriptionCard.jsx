import React from 'react';
import { fmtBDT } from './Stall';

export default function DescriptionCard({ selectedUnit, onBookClick, onReleaseClick }) {
  return (
    <div className={`bg-white rounded-xl p-5 -[0_4px_20px_rgba(0,0,0,0.03)] font-montserrat ${selectedUnit ? 'border-l-4 border-l-brand-blue border border-slate-200' : 'border border-slate-200'}`}>
      <h3 className="text-[13.5px] font-bold text-slate-700 tracking-wide uppercase mb-3">Stall Summary</h3>

      {!selectedUnit ? (
        <div className="text-[12.5px] italic text-slate-400 py-3 text-center">
          Select any stall on the floor plan to view live booking details and pricing.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 mt-3">
          <div className="flex justify-between items-center text-[13px] border-b border-slate-200/50 pb-2">
            <span className="text-slate-500 font-medium">Stall Number:</span>
            <span className="text-slate-800 font-bold">Stall {selectedUnit.label}</span>
          </div>
          <div className="flex justify-between items-center text-[13px] border-b border-slate-200/50 pb-2">
            <span className="text-slate-500 font-medium">Stall Size:</span>
            <span className="text-slate-700 font-semibold">{selectedUnit.nums?.length > 1 ? "16' × 8'" : "8' × 8'"}</span>
          </div>
          <div className="flex justify-between items-center text-[13px] border-b border-slate-200/50 pb-2">
            <span className="text-slate-500 font-medium">Stall Type:</span>
            <span className="text-slate-700 font-semibold">
              {selectedUnit.isCorner ? 'Merged Corner Pair' : selectedUnit.nums?.length > 1 ? 'Combined Pair' : 'Standard Stall'}
            </span>
          </div>
          <div className="flex justify-between items-center text-[13px] border-b border-slate-200/50 pb-2">
            <span className="text-slate-500 font-medium">Price:</span>
            <span className="text-green-600 font-extrabold">{fmtBDT(selectedUnit.price)}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-slate-500 font-medium">Status:</span>
            {selectedUnit.status === 'available' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-green-50 text-green-600 border border-green-200">Available</span>
            )}
            {selectedUnit.status === 'booked' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-slate-100 text-slate-500 border border-slate-300">Booked</span>
            )}
            {selectedUnit.status === 'held-mine' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-200">On Hold (Yours — {selectedUnit.holdRemaining}s)</span>
            )}
            {selectedUnit.status === 'held-other' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-orange-50 text-orange-600 border border-orange-200">On Hold (Other)</span>
            )}
          </div>

          {selectedUnit.status === 'held-mine' && (
            <div className="mt-3.5 flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-lg text-[12px] font-bold border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 cursor-pointer"
                onClick={onReleaseClick}
              >
                Release
              </button>
              <button
                className="flex-[2] py-2.5 rounded-lg text-[12px] font-bold text-white bg-gradient-to-r from-[#155dfc] to-[#4f39f6] -[0_4px_12px_rgba(21,93,252,0.2)] -[0_6px_16px_rgba(21,93,252,0.35)] hover:scale-[1.02] transition-all duration-150 cursor-pointer border-0"
                onClick={onBookClick}
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
