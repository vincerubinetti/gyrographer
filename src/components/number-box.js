import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import { useDebounce } from 'use-debounce';
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

  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [nudgeValue] = useDebounce(internalValue, 10, { maxWait: 100 });
  const [changeValue] = useDebounce(internalValue, 500);

  onChange = useCallback(onChange, []);
  onNudge = useCallback(onNudge, []);

  const getStep = useCallback(
    (event) => {
      if (event.shiftKey)
        return smallStep;
      else
        return step;
    },
    [step, smallStep]
  );

  const changeInternalValue = useCallback(
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
      setInternalValue(newValue);
      setTouched(true);
    },
    [min, max, smallStep, focused]
  );

  const onWheel = useCallback(
    (event) => {
      const delta = -getStep(event) * sign(event.deltaY);
      changeInternalValue(internalValue + delta);
    },
    [internalValue, changeInternalValue, getStep]
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
        changeInternalValue(internalValue + delta);
      }

      prevMousePosition = mousePosition;
    },
    [internalValue, clicked, getStep, changeInternalValue]
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

  useEffect(() => {
    if (touched)
      onChange(changeValue);
  }, [touched, changeValue, onChange]);

  useEffect(() => {
    if (touched)
      onNudge(nudgeValue);
  }, [touched, nudgeValue, onNudge]);

  return (
    <div className='number_box' onWheel={onWheel}>
      <input
        type='number'
        value={internalValue}
        min={min}
        max={max}
        step={step}
        onChange={(event) => changeInternalValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <HandleIcon className='number_box_handle' onMouseDown={onMouseDown} />
    </div>
  );
};

const cleanNumber = (value, fallback) => {
  value = Number(value);
  if (Number.isNaN(value))
    value = fallback || 0;
  return value;
};
