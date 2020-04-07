import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../controllers/time';
import './timecode.css';

let Timecode = ({ fps }) => {
  const { time } = useContext(TimeContext);

  let seconds = Math.floor(time / fps);
  let frames = Math.floor(time % fps);
  let frameDecimal = Math.floor(((time % fps) % 1) * 100);

  seconds = String(seconds).padStart(2, '0');
  frames = String(frames).padStart(2, '0');
  frameDecimal = String(frameDecimal).padStart(2, '0');

  return (
    <div id='timecode' className='small'>
      <span>{seconds}</span>
      <span className='timecode_suffix light'>s</span>
      <span>{frames}</span>
      <span>.</span>
      <span>{frameDecimal}</span>
      <span className='timecode_suffix light'>f</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fps: state.fps
});

Timecode = connect(mapStateToProps)(Timecode);

export { Timecode };
