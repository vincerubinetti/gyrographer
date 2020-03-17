import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Mouse = () => {
  const onMouseMove = useCallback(
    (event) => window.mouse = { x: event.clientX, y: event.clientY },
    []
  );

  const onTouchMove = useCallback(
    (event) =>
      window.mouse = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      },
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [onMouseMove, onTouchMove]);

  return <></>;
};

export { Mouse };
