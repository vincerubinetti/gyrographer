import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from './time';
import { undo } from '../actions/undoer';
import { redo } from '../actions/undoer';

let Keyboard = ({ length, undo, redo }) => {
  const {
    playing,
    togglePlaying,
    changeTime,
    decrementTime,
    incrementTime
  } = useContext(TimeContext);

  const onKeyDown = useCallback(
    (event) => {
      if (document.activeElement.matches('input'))
        return;

      const step = keyMultiplier(event);

      switch (event.key) {
        case ' ':
          togglePlaying(!playing);
          event.preventDefault();
          break;

        case 'ArrowLeft':
          decrementTime(step);
          event.preventDefault();
          break;

        case 'ArrowRight':
          incrementTime(step);
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
          if (event.ctrlKey)
            undo();
          break;

        case 'y':
          if (event.ctrlKey)
            redo();
          break;

        default:
          break;
      }
    },
    [
      playing,
      length,
      togglePlaying,
      changeTime,
      decrementTime,
      incrementTime,
      undo,
      redo
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [onKeyDown]);

  return <></>;
};

const mapStateToProps = (state) => ({
  fps: state.fps,
  length: state.length
});

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo())
});

Keyboard = connect(mapStateToProps, mapDispatchToProps)(Keyboard);

export { Keyboard };

export const keyMultiplier = (event = {}, step = 1) => {
  if (event.ctrlKey)
    return step / 10;
  else if (event.shiftKey)
    return step * 10;
  else
    return step;
};
