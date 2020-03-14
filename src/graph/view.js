import * as d3 from 'd3';

import { svg } from '.';
import { view } from '.';

const minZoom = 0.01;
const maxZoom = 100;
const hPadding = 10 * 2;
const vPadding = 50 * 2;

export let viewHandler = () =>
  null;

export const initViewHandler = () => {
  viewHandler = d3
    .zoom()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', onZoom);
  viewHandler(svg);

  fitView();

  svg.on('dblclick.zoom', null);
  svg.on('dblclick', fitView);
};

export const onZoom = () => {
  view.attr('transform', d3.event.transform);
};

export const fitView = () => {
  const container = svg?.node()?.getBoundingClientRect();
  const contents = view?.node()?.getBBox();

  if (
    !viewHandler ||
    !container?.width ||
    !container?.height ||
    !contents?.width ||
    !contents?.height
  )
    return;

  contents.midX = contents.x + contents.width / 2;
  contents.midY = contents.y + contents.height / 2;

  let scale = Math.max(
    contents.width / (container.width - hPadding),
    contents.height / (container.height - vPadding)
  );
  scale = 1 / scale;
  if (!scale)
    scale = 1;
  if (scale < minZoom)
    scale = minZoom;
  if (scale > maxZoom)
    scale = maxZoom;

  const translateX = container.width / 2 - scale * contents.midX;
  const translateY = container.height / 2 - scale * contents.midY;

  viewHandler.transform(
    svg,
    d3.zoomIdentity.translate(translateX, translateY).scale(scale),
    'fit'
  );
};
