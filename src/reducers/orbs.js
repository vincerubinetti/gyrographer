import { Color } from '../util/color';

export const orbs = (state, meta, type, payload) => {
  state = { ...(state || {}) };

  const reducers = [
    parentId,
    showPath,
    showStick,
    showWheel,
    from,
    to,
    stepSize,
    radius,
    spin,
    offset,
    fillColor,
    strokeColor,
    strokeWidth,
    close,
    dashArray,
    dashOffset,
    strokeLineCap,
    strokeLineJoin,
    order
  ];

  for (const key of Object.keys(state))
    reducers.forEach((reducer) => reducer(state[key], meta, type, payload));

  return { orbs: state };
};

export const parentId = (state, meta, type, payload) => {
  if (typeof state.parentId !== 'string')
    state.parentId = null;
};

export const showPath = (state, meta, type, payload) => {
  if (typeof state.showPath !== 'boolean')
    state.showPath = true;
};

export const showStick = (state, meta, type, payload) => {
  if (typeof state.showStick !== 'boolean')
    state.showStick = true;
};

export const showWheel = (state, meta, type, payload) => {
  if (typeof state.showWheel !== 'boolean')
    state.showWheel = true;
};

export const from = (state, meta, type, payload) => {
  if (typeof state.from !== 'number')
    state.from = 0;
};

export const to = (state, meta, type, payload) => {
  if (typeof state.to !== 'number')
    state.to = 100;
};

export const stepSize = (state, meta, type, payload) => {
  if (typeof state.stepSize !== 'number')
    state.stepSize = 0.1;
  if (state.stepSize <= 0)
    state.stepSize = 0.1;
};

export const radius = (state, meta, type, payload) => {
  if (typeof state.radius !== 'number')
    state.radius = 100;
};

export const spin = (state, meta, type, payload) => {
  if (typeof state.spin !== 'number')
    state.spin = 1;
};

export const offset = (state, meta, type, payload) => {
  if (typeof state.offset !== 'number')
    state.offset = 0;
};

export const fillColor = (state, meta, type, payload) => {
  if (typeof state.fillColor !== 'string')
    state.fillColor = new Color('#00000000');
};

export const strokeColor = (state, meta, type, payload) => {
  if (typeof state.strokeColor !== 'string')
    state.strokeColor = new Color('#ffffffff');
};

export const strokeWidth = (state, meta, type, payload) => {
  if (typeof state.strokeWidth !== 'number')
    state.strokeWidth = 5;
};

export const close = (state, meta, type, payload) => {
  if (typeof state.close !== 'boolean')
    state.close = false;
};

export const dashArray = (state, meta, type, payload) => {
  if (typeof state.dashArray !== 'string')
    state.dashArray = '0';
};

export const dashOffset = (state, meta, type, payload) => {
  if (typeof state.dashOffset !== 'string')
    state.dashOffset = '0';
};

export const strokeLineCap = (state, meta, type, payload) => {
  if (typeof state.strokeLineCap !== 'string')
    state.strokeLineCap = 'round';
};

export const strokeLineJoin = (state, meta, type, payload) => {
  if (typeof state.strokeLineJoin !== 'string')
    state.strokeLineJoin = 'round';
};

export const order = (state, meta, type, payload) => {
  if (typeof state.order !== 'number')
    state.order = 0;
};
