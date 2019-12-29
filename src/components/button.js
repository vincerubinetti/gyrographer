import React from 'react';

import { Tooltip } from './tooltip.js';

import './button.css';

export const Button = ({
  className,
  tooltip,
  tooltipHorizontalAlign,
  tooltipVerticalAlign,
  color,
  onClick,
  onCtrlClick,
  children
}) => (
  <Tooltip
    text={tooltip || ''}
    horizontalAlign={tooltipHorizontalAlign}
    verticalAlign={tooltipVerticalAlign}
  >
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
