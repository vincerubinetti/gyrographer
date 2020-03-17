import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useLayoutEffect } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  return { width, height };
};

export const useKeyDown = (func) => {
  const [pressed, setPressed] = useState({});

  const onKeyDown = useCallback(
    (event) => {
      if (!pressed[event.key])
        func(event);
      setPressed({ ...pressed, [event.key]: true });
    },
    [func, pressed]
  );

  const onKeyUp = useCallback(
    (event) => {
      const { [event.key]: id, ...rest } = pressed;
      setPressed(rest);
    },
    [pressed]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);
};
