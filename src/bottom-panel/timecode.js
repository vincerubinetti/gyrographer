import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { ControllerContext } from '../controller';
import './timecode.css';

let Timecode = ({ fps }) => {
  const context = useContext(ControllerContext);

  let seconds = Math.floor(context.time / fps);
  let frames = Math.floor(context.time % fps);
  let frameDecimal = Math.floor(((context.time % fps) % 1) * 100);

  seconds = String(seconds).padStart(2, '0');
  frames = String(frames).padStart(2, '0');
  frameDecimal = String(frameDecimal).padStart(2, '0');

  console.log(seconds, frames, frameDecimal);

  return (
    <div className='timecode small'>
      {seconds.split('').map((digit, index) => (
        <span key={index} className='timecode_digit'>
          {digit}
        </span>
      ))}
      <span className='timecode_suffix light'>sec</span>
      {frames.split('').map((digit, index) => (
        <span key={index} className='timecode_digit'>
          {digit}
        </span>
      ))}
      <span>.</span>
      {frameDecimal.split('').map((digit, index) => (
        <span key={index} className='timecode_digit'>
          {digit}
        </span>
      ))}
      <span className='timecode_suffix light'>fr</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fps: state.fps
});

Timecode = connect(mapStateToProps)(Timecode);

export { Timecode };
