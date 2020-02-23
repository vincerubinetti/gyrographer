import * as d3 from 'd3';

export let dragHandler = () => null;

export const initDragHandler = () => {
  dragHandler = d3
    .drag()
    .on('drag', onDrag)
    .on('start', onDragStart)
    .on('end', onDragEnd);
};

export const onDragStart = (...args) => {
  console.log(args);
};

export const onDrag = () => {};

export const onDragEnd = () => {};
