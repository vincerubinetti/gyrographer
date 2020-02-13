import React from 'react';

import { Tooltip } from './tooltip';

import './button.css';

export const Button = ({
  className = '',
  tooltip,
  color,
  onClick,
  onCtrlClick,
  children
}) => (
  <Tooltip text={tooltip || ''}>
    <button
      className={'button ' + className}
      onClick={(event) => {
        if (event.ctrlKey)
          (onCtrlClick || (() => null))();
        else
          (onClick || (() => null))();
      }}
      data-color={color}
      alt={tooltip || ''}
    >
      {children}
    </button>
  </Tooltip>
);
