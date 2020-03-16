import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { keyMultiplier } from '../controllers/keyboard';

import './number-box.css';

let prevMousePosition;

export const NumberBox = ({
  value = 0,
  step = 1,
  onChange = () =>
    null,
  onNudge = () =>
    null
}) => {
  const [clicked, setClicked] = useState(false);
  const changeTimer = useRef();

  const update = useCallback(
    (newValue, debounce) => {
      newValue = Number(newValue);

      onNudge(newValue);
      if (debounce) {
        window.clearTimeout(changeTimer.current);
        changeTimer.current = window.setTimeout(
          () =>
            onChange(newValue),
          debounce
        );
      }
    },
    [onNudge, onChange]
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
        const delta =
          -keyMultiplier(event, step) * (mousePosition.y - prevMousePosition.y);
        update(value + delta);
      }

      prevMousePosition = mousePosition;
    },
    [value, step, clicked, update]
  );

  const onMouseUp = useCallback(() => {
    setClicked(false);
    prevMousePosition = null;
    if (clicked)
      update(value, 1);
  }, [value, clicked, update]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className='number_box'>
      <input
        type='number'
        value={value}
        step={step}
        onMouseDown={onMouseDown}
        onChange={(event) =>
          update(event.target.value, 1000)}
      />
    </div>
  );
};
