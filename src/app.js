import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';

import { AppContext } from './app-context.js';
import { Graph } from './graph/graph.js';
import { Orb } from './util/orb.js';
import TopPanel from './top-panel';
import SidePanel from './side-panel';
import BottomPanel from './bottom-panel';
import { undo } from './actions/undoer.js';
import { redo } from './actions/undoer.js';

import './app.css';

let App = ({ past, future, orbs, fps, length, loop, speed, undo, redo }) => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [orbTree, setOrbTree] = useState([]);
  const timer = useRef();

  const changePlaying = useCallback(
    (newPlaying) => {
      if (newPlaying)
        setPlaying(true);
      else
        setPlaying(false);

      if (newPlaying && time >= length)
        setTime(0);
    },
    [time, length]
  );

  const changeTime = useCallback(
    (newTime) => {
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
      setTime(newTime);
    },
    [length, loop, changePlaying]
  );

  const incrementTime = useCallback(
    (multiplier) => {
      const increment = speed * (multiplier || 1);

      changeTime(Math.round((time + increment) / increment) * increment);
    },
    [speed, time, changeTime]
  );

  const decrementTime = useCallback(
    (multiplier) => {
      const increment = -speed * (multiplier || 1);

      changeTime(Math.round((time + increment) / increment) * increment);
    },
    [speed, time, changeTime]
  );

  const onKeyDown = useCallback(
    (event) => {
      let multiplier = 1;
      if (event.shiftKey)
        multiplier = 10;
      else if (event.ctrlKey)
        multiplier = 0.1;

      switch (event.key) {
        case ' ':
          changePlaying(!playing);
          event.preventDefault();
          break;

        case 'ArrowLeft':
          decrementTime(multiplier);
          event.preventDefault();
          break;

        case 'ArrowRight':
          incrementTime(multiplier);
          event.preventDefault();
          break;

        case 'Home':
          changeTime(0);
          event.preventDefault();
          break;

        case 'End':
          changeTime(length);
          event.preventDefault();
          break;

        case 'z':
          if (event.ctrlKey && past.length) {
            undo();
            event.preventDefault();
          }
          break;

        case 'y':
          if (event.ctrlKey && future.length) {
            redo();
            event.preventDefault();
          }
          break;

        default:
          break;
      }
    },
    [
      playing,
      length,
      past,
      future,
      undo,
      redo,
      changePlaying,
      changeTime,
      decrementTime,
      incrementTime
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

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
    <AppContext.Provider
      value={{
        orbTree: orbTree,
        changeTime: changeTime,
        changePlaying: changePlaying,
        playing: playing,
        time: time,
        incrementTime: incrementTime,
        decrementTime: decrementTime
      }}
    >
      {/* <Graph /> */}
      <TopPanel />
      <SidePanel />
      <BottomPanel />
    </AppContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  past: state.past,
  future: state.future,
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop,
  speed: state.speed
});

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo())
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
