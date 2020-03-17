import React from 'react';
import { Children } from 'react';
import { cloneElement } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

import { Popover } from './popover';
import { isString } from '../util/types';

import './tooltip.css';

const delay = 250;

export const Tooltip = ({ content = '', children = <></> }) => {
  const [anchor, setAnchor] = useState(null);
  const timer = useRef();

  const onEnter = useCallback((event) => {
    event.persist();
    window.clearTimeout(timer.current);
    if (!event.target.classList.contains('popover_overlay'))
      timer.current = window.setTimeout(() => setAnchor(event.target), delay);
  }, []);

  const onLeave = useCallback(() => {
    window.clearTimeout(timer.current);
    setAnchor(null);
  }, []);

  useEffect(() => {
    onLeave();
  }, [children, onLeave]);

  const makeHandler = useCallback(
    (element, prop, call) => (...args) => {
      if (element.props[prop])
        element.props[prop](...args);
      call(...args);
    },
    []
  );

  children = Children.map(children, (element) =>
    cloneElement(element, {
      'onMouseEnter': makeHandler(element, 'onMouseEnter', onEnter),
      'onMouseLeave': makeHandler(element, 'onMouseLeave', onLeave),
      'aria-label': isString(content) ? content : ''
    }));

  return (
    <>
      {children}
      {anchor && content &&
        <Popover anchor={anchor} noOverlay className='tooltip'>
          {content}
        </Popover>
      }
    </>
  );
};
