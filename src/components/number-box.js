import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { keyMultiplier } from '../controllers/keyboard';
import { useKeyDown } from '../util/hooks';

import './number-box.css';

export const NumberBox = ({
  value = 0,
  step = 1,
  onChange = () => null,
  onNudge = () => null
}) => {
  const [clicked, setClicked] = useState(false);
  const [clickedValue, setClickedValue] = useState(null);
  const [clickedY, setClickedY] = useState(null);
  const changeTimer = useRef();

  const update = useCallback(
    (newValue, debounce) => {
      newValue = Number(newValue);

      onNudge(newValue);
      if (debounce) {
        window.clearTimeout(changeTimer.current);
        changeTimer.current = window.setTimeout(
          () => onChange(newValue),
          debounce
        );
      }
    },
    [onNudge, onChange]
  );

  const onMouseDown = useCallback(() => {
    setClicked(true);
    setClickedValue(value);
    setClickedY(window.mouse.y);
  }, [value]);

  const onMouseMove = useCallback(
    (event) => {
      if (!clicked)
        return;

      event.preventDefault();

      const delta = -keyMultiplier(event, step) * (window.mouse.y - clickedY);

      update(clickedValue + delta);
    },
    [step, clicked, clickedValue, clickedY, update]
  );

  const onMouseUp = useCallback(() => {
    setClicked(false);
    setClickedValue(null);
    setClickedY(null);

    if (clicked)
      update(value, 1);
  }, [value, clicked, update]);

  const onKeyDown = useCallback(() => {
    if (clicked) {
      setClickedValue(value);
      setClickedY(window.mouse.y);
    }
  }, [clicked, value]);

  const onKeyUp = useCallback(() => {
    if (clicked) {
      setClickedValue(value);
      setClickedY(window.mouse.y);
    }
  }, [clicked, value]);

  useKeyDown(onKeyDown);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onMouseMove, onMouseUp, onKeyUp]);

  return (
    <div className='number_box'>
      <input
        type='number'
        value={value}
        step={step}
        onMouseDown={onMouseDown}
        onChange={(event) => update(event.target.value, 1000)}
      />
    </div>
  );
};
