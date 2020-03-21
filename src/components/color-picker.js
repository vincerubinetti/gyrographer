import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { Popover } from './popover';
import { Color } from '../util/color';

import './color-picker.css';

const swatches = [
  '#ffffff00',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#607d8b',
  '#000000',
  '#202020',
  '#404040',
  '#606060',
  '#808080',
  '#a0a0a0',
  '#c0c0c0',
  '#e0e0e0',
  '#ffffff'
];

export const ColorPicker = ({
  value = new Color(),
  onChange = () => null,
  onNudge = () => null
}) => {
  const [edit, setEdit] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [clicking, setClicking] = useState(null);
  const changeTimer = useRef();

  const update = useCallback(
    (newValue, debounce) => {
      if (newValue === value)
        return;

      onNudge(newValue);
      if (debounce) {
        window.clearTimeout(changeTimer.current);
        changeTimer.current = window.setTimeout(() => {
          onChange(newValue);
        }, debounce);
      }
    },
    [value, onNudge, onChange]
  );

  const tweak = useCallback(
    (target) => {
      const control = target.dataset.control;
      const bbox = target.getBoundingClientRect();

      let x = (window.mouse.x - bbox.left) / bbox.width;
      let y = (window.mouse.y - bbox.top) / bbox.height;
      x = Math.min(1, Math.max(0, x));
      y = Math.min(1, Math.max(0, y));

      let { h, s, v, a } = value;

      if (control === 'palette') {
        s = x;
        v = 1 - y;
      }
      if (control === 'hue')
        h = x * 360;
      if (control === 'alpha')
        a = x;

      const newColor = new Color({ h, s, v, a });

      update(newColor, 2000);
    },
    [update, value]
  );

  const onButtonRef = useCallback((element) => setAnchor(element), []);

  const onButtonClick = useCallback(
    (event) => {
      setOpen(!open);
      event.target.blur();
    },
    [open]
  );

  const onClose = useCallback(() => setOpen(false), []);

  const onControlMouseDown = useCallback(
    (event) => {
      const target = event.currentTarget;
      setClicking(target);
      tweak(target);
    },
    [tweak]
  );

  const onMouseMove = useCallback(() => {
    if (clicking)
      tweak(clicking);
  }, [clicking, tweak]);

  const onMouseUp = useCallback(() => setClicking(null), []);

  const onHexClick = useCallback(() => setEdit(true), []);

  const onHexRef = useCallback((element) => {
    if (document.activeElement !== element) {
      element?.focus();
      element?.select();
    }
    return element;
  }, []);

  const onHexKeyPress = useCallback((event) => {
    if (event.key === 'Esc' || event.key === 'Enter')
      event.target.blur();
  }, []);

  const onHexBlur = useCallback(
    (event) => {
      update(event.target.value, 10);
      setEdit(false);
    },
    [update]
  );

  const onSwatchClick = useCallback(
    (event) => update(event.currentTarget.dataset.swatch, 10),
    [update]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <>
      <button
        ref={onButtonRef}
        className='color_picker_button color_picker_frame color_picker_circle'
        onClick={onButtonClick}
      >
        <div className='color_picker_checkers' />
        <div style={{ backgroundColor: value.rgba }} />
      </button>
      {open &&
        <Popover
          anchor={anchor}
          className='color_picker'
          style={{ color: value.hrgb }}
          onClose={onClose}
        >
          <div
            className='color_picker_palette color_picker_frame'
            onMouseDown={onControlMouseDown}
            onTouchStart={onControlMouseDown}
            data-control='palette'
          >
            <div style={{ backgroundColor: value.hrgb }} />
            <div className='color_picker_palette_luminance' />
            <div className='color_picker_palette_saturation' />
            <div
              className='color_picker_marker_circle'
              style={{
                left: value.s * 100 + '%',
                top: 100 - value.v * 100 + '%'
              }}
            />
          </div>
          <div
            className='color_picker_hue color_picker_frame'
            onMouseDown={onControlMouseDown}
            onTouchStart={onControlMouseDown}
            data-control='hue'
          >
            <div className='color_picker_hue_gradient' />
            <div
              className='color_picker_marker_sliver'
              style={{
                left: value.h / 360 * 100 + '%',
                top: '50%'
              }}
            />
          </div>
          <div
            className='color_picker_alpha color_picker_frame'
            onMouseDown={onControlMouseDown}
            onTouchStart={onControlMouseDown}
            data-control='alpha'
          >
            <div className='color_picker_checkers' />
            <div
              style={{
                background: `
                  linear-gradient(to right, #00000000 0%, ${value.hrgb} 100%)
                `
              }}
            />
            <div
              className='color_picker_marker_sliver'
              style={{
                left: value.a * 100 + '%',
                top: '50%'
              }}
            />
          </div>
          {!edit &&
            <div
              className='color_picker_hex'
              tabIndex='0'
              onFocus={onHexClick}
              onClick={onHexClick}
            >
              {value.rgba}
            </div>
          }
          {edit &&
            <input
              ref={onHexRef}
              className='color_picker_hex'
              type='text'
              defaultValue={value.rgba}
              onKeyPress={onHexKeyPress}
              onBlur={onHexBlur}
            />
          }
          <div className='color_picker_swatches'>
            {swatches.map((swatch, index) =>
              <button
                key={index}
                className={`
                  color_picker_swatch
                  color_picker_frame
                  color_picker_circle
                `}
                data-swatch={swatch}
                onClick={onSwatchClick}
              >
                <div className='color_picker_checkers' />
                <div style={{ backgroundColor: swatch }} />
              </button>)}
          </div>
        </Popover>
      }
    </>
  );
};
