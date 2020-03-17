import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Mouse = () => {
  const onMouseMove = useCallback(
    (event) => window.mouse = { x: event.clientX, y: event.clientY },
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onKeyDown);
  }, [onMouseMove]);

  return <></>;
};

export { Mouse };
