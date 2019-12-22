import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import './timecode.css';

let Timecode = ({ fps }) => {
  const context = useContext(AppContext);

  const seconds = String(Math.floor(context.time / fps)).padStart(2, '0');
  const frames = String((context.time % fps).toFixed(2)).padStart(5, '0');

  return (
    <div className="timecode">
      <div>
        <span>{seconds}</span>
        <small className="light_gray">sec</small>
        <span>{frames}</span>
        <small className="light_gray">fr</small>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fps: state.fps
});

Timecode = connect(mapStateToProps)(Timecode);

export { Timecode };
