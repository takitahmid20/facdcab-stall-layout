import React from 'react';
import '../styles/HallGrid.css';

export default function Annotation() {
  return (
    <>
      <div className="hall-outline"></div>
      <div className="annot washroom">Wash Room</div>
      <div className="annot servicedoor">Service<br />Door</div>
      <div className="annot entrybottom">Entry</div>
      <div className="annot exittop">Exit</div>
      <div className="annot southlbl">South</div>
      <div className="annot northlbl">69'<br />North</div>
      <div className="annot entryexit">
        <span>Exit</span>
        <span>Entry</span>
      </div>
    </>
  );
}
