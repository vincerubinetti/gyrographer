import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { keyMultiplier } from '../keyboard';
import { Tooltip } from './tooltip';
import { sign } from '../util/math';
import { ReactComponent as HandleIcon } from '../images/number-box-handle.svg';

import './number-box.css';

let prevMousePosition;

export const NumberBox = ({
  value = 0,
  step = 1,
  precision = 1,
  onChange = () => null,
  onNudge = () => null,
  tooltip = ''
}) => {
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const changeTimer = useRef();

  const update = useCallback(
    (newValue, debounce) => {
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

  const onWheel = useCallback(
    (event) => {
      event.target.blur();
      event.preventDefault();

      const delta = -keyMultiplier(event, step) * sign(event.deltaY);
      update(value + delta, 500);
    },
    [value, step, update]
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
    <Tooltip content={tooltip}>
      <div className="number_box" onWheel={onWheel}>
        <input
          type="number"
          value={focused ? value : value.toFixed(precision)}
          step={step}
          onChange={(event) => update(event.target.value, 1000)}
          onFocus={(event) => {
            setFocused(true);
            event.target.select();
          }}
          onBlur={() => setFocused(false)}
        />
        <HandleIcon className="number_box_handle" onMouseDown={onMouseDown} />
      </div>
    </Tooltip>
  );
};
