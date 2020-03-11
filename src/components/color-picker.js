import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

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
  onNudge = () => null
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
      <button
        ref={(element) => setAnchor(element)}
        className="color_picker_box color_picker_frame color_picker_circle"
        style={{ color: value.rgba }}
        onClick={(event) => {
          setOpen(!open);
          event.target.blur();
        }}
      >
        <div />
        <div />
      </button>
      {open && (
        <Popover
          anchor={anchor}
          className="color_picker"
          style={{ color: value.rgba }}
          onClose={() => setOpen(false)}
        >
          <div className="color_picker_palette color_picker_frame">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="color_picker_hue color_picker_frame">
            <div />
            <div />
          </div>
          <div className="color_picker_alpha color_picker_frame">
            <div />
            <div />
          </div>
          <input
            type="text"
            value={value.rgba}
            onChange={(event) => update(event.target.value, 10000)}
            className="color_picker_hex"
          />
          <div className="color_picker_swatches">
            {swatches.map((swatch, index) => (
              <button
                key={index}
                className="color_picker_swatch color_picker_frame color_picker_circle"
                style={{ color: swatch }}
              >
                <div />
                <div />
              </button>
            ))}
          </div>
        </Popover>
      )}
    </>
  );
};
