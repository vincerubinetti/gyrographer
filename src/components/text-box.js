import React from 'react';

import { Tooltip } from './tooltip';

import './text-box.css';

export const TextBox = ({
  value = '',
  onChange = () => null,
  onNudge = () => null,
  tooltip = ''
}) => {
  return (
    <Tooltip content={tooltip}>
      <div className="text_box">
        <input
          type="text"
          value={value}
          onChange={(event) => onNudge(event.target.value)}
          onBlur={(event) => onChange(event.target.value)}
        />
      </div>
    </Tooltip>
  );
};
