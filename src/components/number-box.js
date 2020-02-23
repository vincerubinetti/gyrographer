import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { sign } from '../util/math';
import { ReactComponent as HandleIcon } from '../images/number-box-handle.svg';

import './number-box.css';

let prevMousePosition;

export const NumberBox = ({
  value = 0,
  step = 1,
  precision = 1,
  onChange = () => {},
  onNudge = () => {}
}) => {
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timer = useRef();

  const getStep = useCallback(
    (event) => {
      if (event.altKey)
        return step / 10;
      else if (event.shiftKey)
        return step * 10;
      else
        return step;
    },
    [step]
  );

  const update = useCallback(
    (newValue) => {
      onNudge(newValue);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), 500);
    },
    [onChange, onNudge]
  );

  const onWheel = useCallback(
    (event) => {
      event.target.blur();

      const delta = -getStep(event) * sign(event.deltaY);
      update(value + delta);
    },
    [value, update, getStep]
  );

  const onMouseDown = useCallback(() => {
    setClicked(true);
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      if (!clicked)
        return;

      const mousePosition = { x: event.clientX, y: event.clientY };

      if (prevMousePosition) {
        const delta = -getStep(event) * (mousePosition.y - prevMousePosition.y);
        update(value + delta);
      }

      prevMousePosition = mousePosition;
    },
    [value, clicked, getStep, update]
  );

  const onMouseUp = useCallback(() => {
    setClicked(false);
    prevMousePosition = null;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className="number_box" onWheel={onWheel}>
      <input
        type="number"
        value={focused ? value : value.toFixed(precision)}
        step={step}
        onChange={(event) => update(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <HandleIcon className="number_box_handle" onMouseDown={onMouseDown} />
    </div>
  );
};
