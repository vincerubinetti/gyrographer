import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from './time';
import { undo } from './actions/undoer';
import { redo } from './actions/undoer';

let Keyboard = ({ past, future, length, undo, redo }) => {
  const context = useContext(TimeContext);

  const onKeyDown = useCallback(
    (event) => {
      let multiplier = 1;
      if (event.shiftKey)
        multiplier = 10;
      else if (event.ctrlKey)
        multiplier = 0.1;

      switch (event.key) {
        case ' ':
          context.changePlaying(!context.playing);
          event.preventDefault();
          break;

        case 'ArrowLeft':
          context.decrementTime(multiplier);
          event.preventDefault();
          break;

        case 'ArrowRight':
          context.incrementTime(multiplier);
          event.preventDefault();
          break;

        case 'Home':
          context.changeTime(0);
          event.preventDefault();
          break;

        case 'End':
          context.changeTime(length);
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
    [context, length, past, future, undo, redo]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return <></>;
};

const mapStateToProps = (state) => ({
  past: state.past,
  future: state.future,
  fps: state.fps,
  length: state.length
});

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo())
});

Keyboard = connect(mapStateToProps, mapDispatchToProps)(Keyboard);

export { Keyboard };
