import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import * as d3 from 'd3';

const minZoom = 0.01;
const maxZoom = 100;
const hPadding = 10 * 2;
const vPadding = 50 * 2;

export const usePanZoom = () => {
  const svgRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const view = d3.select(viewRef.current);

    const onViewChange = () => {
      view.attr('transform', d3.event.transform);
    };

    const viewHandler = d3
      .zoom()
      .scaleExtent([minZoom, maxZoom])
      .on('zoom', onViewChange);

    const onDblClick = () => {
      const container = svgRef.current.getBoundingClientRect();
      const contents = view.node().getBBox();

      contents.midX = contents.x + contents.width / 2;
      contents.midY = contents.y + contents.height / 2;

      let scale = 1;
      if (contents.width && contents.height) {
        scale =
          1 /
          Math.max(
            contents.width / (container.width - hPadding),
            contents.height / (container.height - vPadding)
          );
      }
      const translateX = container.width / 2 - scale * contents.midX;
      const translateY = container.height / 2 - scale * contents.midY;

      svg.call(
        viewHandler.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale)
      );
    };

    svg.call(viewHandler);
    svg.on('dblclick.zoom', null);
    svg.on('dblclick', onDblClick);

    onDblClick();

    window.addEventListener('resize', onDblClick);
    return () => window.removeEventListener('resize', onDblClick);
  }, []);

  return [svgRef, viewRef];
};

export const usePrev = (value) => {
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value;
  });
  return prevValue.current;
};

export const useDiff = (value) => {
  const prevValue = useRef();
  useEffect(() => {
    prevValue.current = value;
  });
  return (
    value !== prevValue.current &&
    value !== undefined &&
    prevValue.current !== undefined
  );
};

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
