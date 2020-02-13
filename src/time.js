import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

import { Orb } from './orb';

const TimeContext = createContext({});

let Time = ({ children, orbs, fps, length, loop, speed }) => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [orbTree, setOrbTree] = useState([]);
  const timer = useRef();

  const changePlaying = useCallback(
    (newPlaying) => {
      setPlaying(newPlaying ? true : false);
      setTime((time) => (newPlaying && time >= length ? 0 : time));
    },
    [length]
  );

  const changeTime = useCallback(
    (newTime, relative) => {
      setTime((time) => {
        if (relative)
          newTime = time + newTime;
        if (newTime < 0) {
          if (loop)
            newTime = (newTime % length) + length;
          else
            newTime = 0;
        }
        if (newTime > length) {
          if (loop)
            newTime = newTime % length;
          else {
            newTime = length;
            changePlaying(false);
          }
        }
        return newTime;
      });
    },
    [length, loop, changePlaying]
  );

  const incrementTime = useCallback(
    (multiplier) => changeTime(speed * (multiplier || 1), true),
    [speed, changeTime]
  );

  const decrementTime = useCallback(
    (multiplier) => changeTime(-speed * (multiplier || 1), true),
    [speed, changeTime]
  );

  useEffect(() => {
    setOrbTree(Orb.buildTree(orbs));
  }, [orbs]);

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
        orbTree: orbTree,
        playing: playing,
        time: time,
        changePlaying: changePlaying,
        changeTime: changeTime,
        incrementTime: incrementTime,
        decrementTime: decrementTime
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop,
  speed: state.speed
});

Time = connect(mapStateToProps)(Time);

export { Time };

export { TimeContext };
