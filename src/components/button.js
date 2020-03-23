import React from 'react';
import { useCallback } from 'react';

import { Tooltip } from './tooltip';

import './button.css';

export const Button = ({
  className = '',
  tooltip = '',
  color = '',
  onClick = () => null,
  onCtrlClick = () => null,
  children = <></>,
  ...rest
}) => {
  const click = useCallback(
    (event) => {
      if (event.ctrlKey)
        onCtrlClick();
      else
        onClick();
    },
    [onClick, onCtrlClick]
  );

  return (
    <Tooltip content={tooltip}>
      <button
        className={'button ' + className}
        onClick={click}
        data-color={color}
        {...rest}
      >
        {children}
      </button>
    </Tooltip>
  );
};
