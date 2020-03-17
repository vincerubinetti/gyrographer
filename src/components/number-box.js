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
  const [edit, setEdit] = useState(false);
  const [drag, setDrag] = useState(false);
  const [dragValue, setDragValue] = useState(null);
  const [dragY, setDragY] = useState(null);
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
    setDrag(true);
    setDragValue(value);
    setDragY(window.mouse.y);
  }, [value]);

  const onMouseMove = useCallback(
    (event) => {
      if (!drag)
        return;
      event.preventDefault();
      const delta = -keyMultiplier(event, step) * (window.mouse.y - dragY);
      update(dragValue + delta);
    },
    [step, drag, dragValue, dragY, update]
  );

  const onMouseUp = useCallback(() => {
    setDrag(false);
    setDragValue(null);
    setDragY(null);

    if (drag)
      update(value, 1);
  }, [value, drag, update]);

  const onKeyDown = useCallback(() => {
    if (drag) {
      setDragValue(value);
      setDragY(window.mouse.y);
    }
  }, [drag, value]);

  const onKeyUp = useCallback(() => {
    if (drag) {
      setDragValue(value);
      setDragY(window.mouse.y);
    }
  }, [drag, value]);

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
      {!edit &&
        <div
          onMouseDown={onMouseDown}
          onClick={() => {
            setEdit(true);
          }}
        >
          {value}
        </div>
      }
      {edit &&
        <input
          ref={(element) => {
            if (document.activeElement !== element) {
              element?.focus();
              element?.select();
            }
            return element;
          }}
          type='number'
          defaultValue={value}
          step={step}
          onKeyPress={(event) => {
            if (event.key === 'Esc' || event.key === 'Enter')
              event.target.blur();
          }}
          onBlur={(event) => {
            update(event.target.value, 1);
            setEdit(false);
          }}
        />
      }
    </div>
  );
};
