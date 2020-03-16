import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../controllers/time';
import './timecode.css';

let Timecode = ({ fps }) => {
  const context = useContext(TimeContext);

  let seconds = Math.floor(context.time / fps);
  let frames = Math.floor(context.time % fps);
  let frameDecimal = Math.floor(context.time % fps % 1 * 100);

  seconds = String(seconds).padStart(2, '0');
  frames = String(frames).padStart(2, '0');
  frameDecimal = String(frameDecimal).padStart(2, '0');

  return (
    <div className='timecode small'>
      {seconds.split('').map((digit, index) =>
        <span key={index} className='timecode_digit'>
          {digit}
        </span>)}
      <span className='timecode_suffix light'>s</span>
      {frames.split('').map((digit, index) =>
        <span key={index} className='timecode_digit'>
          {digit}
        </span>)}
      <span>.</span>
      {frameDecimal.split('').map((digit, index) =>
        <span key={index} className='timecode_digit'>
          {digit}
        </span>)}
      <span className='timecode_suffix light'>f</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fps: state.fps
});

Timecode = connect(mapStateToProps)(Timecode);

export { Timecode };
