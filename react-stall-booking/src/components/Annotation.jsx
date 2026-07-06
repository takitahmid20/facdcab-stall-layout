import React from 'react';

/**
 * Annotation.jsx — floor plan overlay labels & outlines
 * All positions are lifted directly from the original static prototype CSS:
 *
 *  .hall-outline   : left:-2px; top:76px; width:801px; height:876px
 *  .annot.washroom : left:558px; top:15px; width:239px; height:58px
 *  .annot.servicedoor: left:11.5px; top:204px; width:35px; height:58px
 *  .annot.exittop  : left:558px; top:141px; width:35px; height:58px
 *  .annot.entrybottom: left:435px; top:831px; width:58px; height:58px
 *  .annot.entryexit: left:558px; top:952px; width:150px; height:58px
 *  .annot.southlbl : left:123px; top:45px; width:400px; height:20px (rotated 180°)
 *  .annot.northlbl : left:123px; top:1015px; width:400px; height:30px (rotated 180°)
 */

const annotBase = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontFamily: "'Space Mono', monospace",
  color: '#94a3b8',
  fontSize: '10.5px',
  letterSpacing: '.06em',
};

export default function Annotation() {
  return (
    <>
      {/* Hall border outline */}
      <div style={{
        position: 'absolute', left: '-2px', top: '76px',
        width: '801px', height: '876px',
        border: '2px solid #e2e8f0',
        pointerEvents: 'none',
        zIndex: 1,
        borderRadius: '4px',
      }} />

      {/* Wash Room — top right */}
      <div style={{
        ...annotBase,
        left: '558px', top: '15px', width: '239px', height: '58px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        color: '#475569',
        fontWeight: '700',
        letterSpacing: '.12em',
      }}>
        Wash Room
      </div>

      {/* Service Door — left side, vertical text */}
      <div style={{
        ...annotBase,
        left: '11.5px', top: '252px', width: '35px', height: '58px',
        writingMode: 'vertical-rl',
        fontSize: '8.5px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        Service Door
      </div>

      {/* Exit — right side between washroom and stalls, vertical text */}
      <div style={{
        ...annotBase,
        left: '558px', top: '141px', width: '35px', height: '58px',
        writingMode: 'vertical-rl',
        fontSize: '9.5px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        Exit
      </div>

      {/* Entry — bottom-middle of floor plan */}
      <div style={{
        ...annotBase,
        left: '558px', top: '831px', width: '58px', height: '58px',
        fontSize: '10px',
        fontWeight: '700',
        color: '#475569',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        Entry
      </div>

      {/* Exit + Entry pair — bottom right */}
      <div style={{
        ...annotBase,
        left: '558px', top: '952px', width: '150px', height: '58px',
        gap: '6px',
        fontSize: '9px',
      }}>
        <span style={{ border: '1px solid #e2e8f0', padding: '2px 5px', background: '#f8fafc' }}>Exit</span>
        <span style={{ border: '1px solid #e2e8f0', padding: '2px 5px', background: '#f8fafc' }}>Entry</span>
      </div>

      {/* South label — top of middle cluster, rotated 180° so text reads right-to-left from hall entry side */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10.5px',
        letterSpacing: '.06em',
        fontStyle: 'italic',
        color: '#475569',
        left: '123px',
        top: '45px',
        width: '400px',
        height: '20px',
      }}>
        South
      </div>

      {/* North label — bottom of hall, rotated 180° */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10.5px',
        letterSpacing: '.06em',
        fontStyle: 'italic',
        color: '#475569',
        lineHeight: '1.2',
        left: '123px',
        top: '1015px',
        width: '400px',
        height: '30px',
      }}>
        69'<br />North
      </div>
    </>
  );
}
