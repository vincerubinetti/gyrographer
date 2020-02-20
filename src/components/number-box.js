import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { sign } from '../util/math';
import { precision } from '../util/math';
import { ReactComponent as HandleIcon } from '../images/number-box-handle.svg';

import './number-box.css';

let prevMousePosition;

export const NumberBox = ({
  value,
  min,
  max,
  step,
  smallStep,
  onChange = () => {},
  onNudge = () => {}
}) => {
  value = cleanNumber(value, min);
  min = cleanNumber(min, 0);
  max = cleanNumber(max, 100);
  step = cleanNumber(step, 1);
  smallStep = cleanNumber(smallStep, 0.1);

  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timer = useRef();

  const getStep = useCallback(
    (event) => {
      if (event.shiftKey)
        return smallStep;
      else
        return step;
    },
    [step, smallStep]
  );

  const update = useCallback(
    (newValue) => {
      newValue = cleanNumber(newValue, min);

      if (newValue > max)
        newValue = max;
      if (newValue < min)
        newValue = min;

      if (!focused) {
        newValue = newValue.toFixed(precision(smallStep));
        newValue = cleanNumber(newValue);
      }

      onNudge(newValue);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => onChange(newValue), 500);
    },
    [min, max, smallStep, focused, onChange, onNudge]
  );

  const onWheel = useCallback(
    (event) => {
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
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => update(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <HandleIcon className="number_box_handle" onMouseDown={onMouseDown} />
    </div>
  );
};

const cleanNumber = (value, fallback) => {
  value = Number(value);
  if (Number.isNaN(value))
    value = fallback || 0;
  return value;
};
