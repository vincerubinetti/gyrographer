import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { Tooltip } from './tooltip';
import { Popover } from './popover';
import { Color } from '../util/color';

import './color-picker.css';

export const swatches = [
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
  onNudge = () => null,
  tooltip = ''
}) => {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <Tooltip content={tooltip}>
        <button
          ref={(element) => setAnchor(element)}
          className='color_picker_box color_picker_frame'
        >
          <div className='color_picker_checkers' />
          <div
            style={{ backgroundColor: value.rgba }}
            onClick={() => setOpen(!open)}
          />
        </button>
      </Tooltip>
      {open && (
        <Popover
          anchor={anchor}
          onClose={() => setOpen(false)}
          className='color_picker'
        >
          <div className='color_picker_palette color_picker_frame'>
            <div className='color_picker_palette_hue' />
            <div className='color_picker_palette_white' />
            <div className='color_picker_palette_black' />
          </div>
          <div className='color_picker_hue color_picker_frame'>
            <div className='color_picker_hue_gradient' />
          </div>
          <div className='color_picker_alpha color_picker_frame'>
            <div className='color_picker_checkers' />
            <div className='color_picker_alpha_gradient' />
          </div>
          <div className='color_picker_hex color_picker_frame'>
            <input
              type='text'
              value={value.rgba}
              onChange={(event) => update(event.target.value, 10000)}
            />
          </div>
          <div className='color_picker_swatches'>
            {swatches.map((swatch, index) => (
              <button
                key={index}
                className='color_picker_swatch color_picker_frame'
              >
                <div className='color_picker_checkers' />
                <div style={{ backgroundColor: swatch }} />
              </button>
            ))}
          </div>
        </Popover>
      )}
    </>
  );
};
