import React from 'react';
import '../styles/Legend.css';

export default function Legend() {
  return (
    <div className="panel-box">
      <h3>Legend</h3>
      <div className="legend-row">
        <div className="swatch av"></div>
        <span>Available — tap to hold</span>
      </div>
      <div className="legend-row">
        <div className="swatch ho"></div>
        <span>On hold — 60s window</span>
      </div>
      <div className="legend-row">
        <div className="swatch bo"></div>
        <span>Booked</span>
      </div>
      <div className="legend-row">
        <div className="swatch co"></div>
        <span>Corner stall — sold as a pair</span>
      </div>
      <div className="price-note">
        Standard stall: <b>৳80,000</b><br />
        Merged corner stall: <b>৳1,60,000</b>
      </div>
    </div>
  );
}
