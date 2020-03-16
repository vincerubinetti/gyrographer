import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from './time';
import { undo } from '../actions/undoer';
import { redo } from '../actions/undoer';

let Keyboard = ({ length, undo, redo }) => {
  const context = useContext(TimeContext);

  const onKeyDown = useCallback(
    (event) => {
      if (document.activeElement.matches('input'))
        return;

      const step = keyMultiplier(event);

      switch (event.key) {
        case ' ':
          context.togglePlaying(!context.playing);
          event.preventDefault();
          break;

        case 'ArrowLeft':
          context.decrementTime(step);
          event.preventDefault();
          break;

        case 'ArrowRight':
          context.incrementTime(step);
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
    [context, length, undo, redo]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
  if (event.altKey)
    return step / 10;
  else if (event.shiftKey)
    return step * 10;
  else
    return step;
};
