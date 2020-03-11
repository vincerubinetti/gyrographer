import React from 'react';

import { Tooltip } from './tooltip';

import './button.css';

export const Button = ({
  className = '',
  tooltip = '',
  color = '',
  onClick = () => null,
  onCtrlClick = () => null,
  children = <></>
}) => (
  <Tooltip content={tooltip}>
    <button
      className={'button ' + className}
      onClick={(event) => {
        if (event.ctrlKey)
          onCtrlClick();
        else
          onClick();
      }}
      data-color={color}
    >
      {children}
    </button>
  </Tooltip>
);