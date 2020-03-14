import React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useWindowSize } from '../util/hooks';

import './popover.css';

const padding = 5;

export const Popover = ({
  anchor,
  noOverlay = false,
  onClose = () =>
    null,
  className = '',
  style = {},
  children = <></>
}) => {
  const [content, setContent] = useState(null);
  const { width, height } = useWindowSize();

  const { x, y } = calculatePosition({ anchor, content, width, height });

  return createPortal(
    <>
      {!noOverlay && <div className='popover_overlay' onClick={onClose} />}
      <div
        ref={(element) =>
          setContent(element)}
        className={'popover ' + className}
        style={{ ...style, left: x, top: y }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

const calculatePosition = ({ anchor, content }) => {
  let x = 0;
  let y = 0;

  anchor = anchor?.getBoundingClientRect();
  content = content?.getBoundingClientRect();

  if (!anchor || !content)
    return { x, y };

  if (anchor.left + content.width < window.innerWidth)
    x = anchor.left;
  else if (anchor.left + anchor.width - content.width > 0)
    x = anchor.left + anchor.width - content.width;
  else
    x = window.innerWidth / 2 - content.width / 2;

  if (anchor.top - padding - content.height > 0)
    y = anchor.top - padding - content.height;
  else if (
    anchor.top + anchor.height + padding + content.height <
    window.innerHeight
  )
    y = anchor.top + anchor.height + padding;
  else
    y = window.innerHeight / 2 - content.height / 2;

  return { x, y };
};
