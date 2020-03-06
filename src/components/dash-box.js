import React from 'react';

import { Tooltip } from './tooltip';

import './dash-box.css';

export const DashBox = ({
  value = '',
  onChange = () => null,
  tooltip = ''
}) => {
  return (
    <Tooltip content={tooltip}>
      <div className='dash_box'>
        <input
          type='text'
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </Tooltip>
  );
};
