import React from 'react';
import { Children } from 'react';
import { isValidElement } from 'react';
import { cloneElement } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import './tooltip.css';

const delay = 250;
const padding = 5;

const Tooltip = ({ children, text = '' }) => {
  const [anchor, setAnchor] = useState(null);
  const timer = useRef();

  const onEnter = useCallback((event) => {
    event.persist();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAnchor(event.target), delay);
  }, []);

  const onLeave = useCallback(() => {
    window.clearTimeout(timer.current);
    setAnchor(null);
  }, []);

  const makeHandler = useCallback(
    (name, element, func) => (...args) => {
      if (element[name])
        element[name](...args);
      func(...args);
    },
    []
  );

  children = Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement(element, {
        'onMouseEnter': makeHandler('onMouseEnter', element, onEnter),
        'onMouseLeave': makeHandler('onMouseLeave', element, onLeave),
        'onFocus': makeHandler('onFocus', element, onEnter),
        'onBlur': makeHandler('onBlur', element, onLeave),
        'aria-label': text
      });
    } else
      return element;
  });

  return (
    <>
      {children}
      {anchor && <Portal text={text} anchor={anchor} />}
    </>
  );
};

export { Tooltip };

const Portal = ({ text, anchor }) => {
  const [tooltip, setTooltip] = useState(null);

  const style = computeStyle({ anchor, tooltip });

  return createPortal(
    <div
      ref={(element) => setTooltip(element)}
      className="tooltip text_small"
      style={style}
    >
      {text}
    </div>,
    document.body
  );
};

const computeStyle = ({ anchor, tooltip }) => {
  let style = { left: 0, top: 0 };

  anchor = anchor?.getBoundingClientRect();
  tooltip = tooltip?.getBoundingClientRect();
  const body = document.body.getBoundingClientRect();

  if (!anchor || !tooltip)
    return style;

  style = {};

  anchor = {
    left: anchor.left - body.left,
    top: anchor.top - body.top,
    right: body.right - (anchor.left + anchor.width),
    bottom: body.bottom - (anchor.top + anchor.height),
    width: anchor.width,
    height: anchor.height
  };

  let horizontalAlign = 'left';
  let verticalAlign = 'top';

  if (anchor.left + tooltip.width > window.innerWidth) {
    horizontalAlign = 'right';
    if (anchor.left - tooltip.width < 0)
      horizontalAlign = 'center';
  }

  if (anchor.top - tooltip.height < 0)
    verticalAlign = 'bottom';

  switch (horizontalAlign) {
    case 'center':
      style.left = anchor.left + anchor.width / 2;
      style.transform = 'translateX(-50%)';
      break;

    case 'left':
      style.left = anchor.left;
      break;

    case 'right':
      style.right = anchor.right;
      break;

    default:
      break;
  }

  switch (verticalAlign) {
    case 'top':
      style.bottom = anchor.bottom + anchor.height + padding;
      break;

    case 'bottom':
      style.top = anchor.top + anchor.height + padding;
      break;

    default:
      break;
  }

  return style;
};
