import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

const TimeContext = createContext({});

let Time = ({ children, fps, length }) => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [loop, setLoop] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef();

  const changeTime = useCallback(
    (newTime, relative) => {
      setTime((time) => {
        if (relative)
          newTime = time + newTime;
        if (newTime < 0) {
          if (loop)
            newTime = newTime % length + length;
          else
            newTime = 0;
        }
        if (newTime > length) {
          if (loop)
            newTime = newTime % length;
          else {
            newTime = length;
            setPlaying(false);
          }
        }
        return newTime;
      });
    },
    [length, loop]
  );

  const togglePlaying = useCallback(
    () =>
      setPlaying((playing) => {
        if (!playing && time >= length)
          changeTime(0);
        return !playing;
      }),
    [time, length, changeTime]
  );

  const incrementTime = useCallback(
    (multiplier) => changeTime(speed * (multiplier || 1), true),
    [speed, changeTime]
  );

  const decrementTime = useCallback(
    (multiplier) => changeTime(-speed * (multiplier || 1), true),
    [speed, changeTime]
  );

  const toStart = useCallback(() => changeTime(0), [changeTime]);

  const toEnd = useCallback(() => changeTime(length), [length, changeTime]);

  const toggleLoop = useCallback(() => setLoop((loop) => !loop), []);

  const toggleSpeed = useCallback(
    (value) =>
      setSpeed((speed) => {
        if (value)
          return value;

        const speeds = [0.1, 0.25, 0.5, 1, 2, 4];

        const index = speeds.indexOf(speed);
        let newSpeed = 1;
        if (index !== -1)
          newSpeed = speeds[(index + 1) % speeds.length];

        return newSpeed;
      }),
    []
  );

  useEffect(() => {
    if (playing)
      timer.current = window.setInterval(incrementTime, Math.floor(1000 / fps));
    else
      window.clearInterval(timer.current);

    return () => window.clearInterval(timer.current);
  }, [playing, incrementTime, fps]);

  return (
    <TimeContext.Provider
      value={{
        playing,
        togglePlaying,
        time,
        changeTime,
        incrementTime,
        decrementTime,
        toStart,
        toEnd,
        loop,
        toggleLoop,
        speed,
        toggleSpeed
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  fps: state.fps,
  length: state.length
});

Time = connect(mapStateToProps)(Time);

export { Time };

export { TimeContext };
