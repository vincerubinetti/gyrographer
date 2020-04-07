import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../controllers/time';
import './rail.css';

let Rail = ({ length }) => {
  const [clicking, setClicking] = useState(false);
  const track = useRef();
  const { time, changeTime } = useContext(TimeContext);

  const seek = useCallback(
    (event) => {
      const x = event.clientX || (event.touches ? event.touches[0].clientX : 0);

      const { left, width } = track.current.getBoundingClientRect();
      const time = Math.floor((length * (x - left)) / width);

      changeTime(time);
    },
    [length, changeTime]
  );

  const onMouseDown = useCallback(
    (event) => {
      setClicking(true);
      seek(event);

      event.stopPropagation();
    },
    [seek]
  );

  const onMouseUp = useCallback(() => {
    setClicking(false);
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      if (!clicking)
        return;

      seek(event);

      event.stopPropagation();
    },
    [seek, clicking]
  );

  const percent = (100 * time) / length;

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchcancel', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchcancel', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div id='time_bar'>
      <div
        id='rail'
        tabIndex={0}
        onTouchStart={onMouseDown}
        onMouseDown={onMouseDown}
        ref={track}
      >
        <div id='rail_marker' style={{ right: 100 - percent + '%' }} />
      </div>
      <div id='keyframe_markers' />
    </div>
  );
};

const mapStateToProps = (state) => ({
  length: state.length
});

Rail = connect(mapStateToProps)(Rail);

export { Rail };
