import { Color } from '../util/color';

export const orbs = (state, meta, type, payload) => {
  state = { ...(state || {}) };

  const reducers = [
    id,
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

  for (const [orbId, orb] of Object.entries(state)) {
    for (const reducer of reducers)
      reducer(orb, meta, type, payload, orbId);
  }

  return { orbs: state };
};

export const id = (orb, meta, type, payload, id) => {
  if (typeof orb.id !== 'string')
    orb.id = String(id || '0');
};

export const parentId = (orb, meta, type, payload) => {
  if (typeof orb.parentId !== 'string')
    orb.parentId = '';
};

export const showPath = (orb, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_PATH':
      if (payload.id === orb.id)
        orb.showPath = !orb.showPath;
      break;

    default:
      break;
  }

  if (typeof orb.showPath !== 'boolean')
    orb.showPath = true;
};

export const showStick = (orb, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_STICK':
      if (payload.id === orb.id)
        orb.showStick = !orb.showStick;
      break;

    default:
      break;
  }
  if (typeof orb.showStick !== 'boolean')
    orb.showStick = true;
};

export const showWheel = (orb, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_WHEEL':
      if (payload.id === orb.id)
        orb.showWheel = !orb.showWheel;
      break;

    default:
      break;
  }
  if (typeof orb.showWheel !== 'boolean')
    orb.showWheel = true;
};

export const from = (orb, meta, type, payload) => {
  if (typeof orb.from !== 'number')
    orb.from = 0;
};

export const to = (orb, meta, type, payload) => {
  if (typeof orb.to !== 'number')
    orb.to = 100;
};

export const stepSize = (orb, meta, type, payload) => {
  if (typeof orb.stepSize !== 'number')
    orb.stepSize = 0.1;
  if (orb.stepSize <= 0)
    orb.stepSize = 0.1;
};

export const radius = (orb, meta, type, payload) => {
  if (typeof orb.radius !== 'number')
    orb.radius = 100;
};

export const spin = (orb, meta, type, payload) => {
  if (typeof orb.spin !== 'number')
    orb.spin = 1;
};

export const offset = (orb, meta, type, payload) => {
  if (typeof orb.offset !== 'number')
    orb.offset = 0;
};

export const fillColor = (orb, meta, type, payload) => {
  if (orb.fillColor instanceof Color === false)
    orb.fillColor = new Color(orb.fillColor || '#00000000');
};

export const strokeColor = (orb, meta, type, payload) => {
  if (orb.strokeColor instanceof Color === false)
    orb.strokeColor = new Color(orb.strokeColor || '#ffffffff');
};

export const strokeWidth = (orb, meta, type, payload) => {
  if (typeof orb.strokeWidth !== 'number')
    orb.strokeWidth = 5;
};

export const close = (orb, meta, type, payload) => {
  if (typeof orb.close !== 'boolean')
    orb.close = false;
};

export const dashArray = (orb, meta, type, payload) => {
  if (typeof orb.dashArray !== 'string')
    orb.dashArray = '0';
};

export const dashOffset = (orb, meta, type, payload) => {
  if (typeof orb.dashOffset !== 'string')
    orb.dashOffset = '0';
};

export const strokeLineCap = (orb, meta, type, payload) => {
  if (typeof orb.strokeLineCap !== 'string')
    orb.strokeLineCap = 'round';
};

export const strokeLineJoin = (orb, meta, type, payload) => {
  if (typeof orb.strokeLineJoin !== 'string')
    orb.strokeLineJoin = 'round';
};

export const order = (orb, meta, type, payload) => {
  if (typeof orb.order !== 'number')
    orb.order = 0;
};
