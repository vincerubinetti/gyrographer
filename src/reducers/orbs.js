import { Color } from '../util/color';
import { isBoolean } from '../util/types';
import { isString } from '../util/types';
import { isNumber } from '../util/types';
import { isObject } from '../util/types';

export const orbs = (state = {}, meta, type, payload) => {
  const reducers = [
    id,
    parent,
    showPath,
    showStick,
    showWheel,
    from,
    to,
    stepSize,
    radius,
    spin,
    offset,
    fill,
    stroke,
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
  if (!isString(orb.id))
    orb.id = String(id || '0');
};

export const parent = (orb, meta, type, payload) => {
  if (!isString(orb.parent))
    orb.parent = '';
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

  if (!isBoolean(orb.showPath))
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

  if (!isBoolean(orb.showStick))
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

  if (!isBoolean(orb.showWheel))
    orb.showWheel = true;
};

export const from = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_FROM':
      if (payload.id === orb.id)
        orb.from = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.from))
    orb.from = 0;
};

export const to = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_TO':
      if (payload.id === orb.id)
        orb.to = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.to))
    orb.to = 360;
};

export const stepSize = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_STEP_SIZE':
      if (payload.id === orb.id)
        orb.stepSize = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.stepSize))
    orb.stepSize = 1;
  if (orb.stepSize <= 0.01)
    orb.stepSize = 0.01;
  if (orb.stepSize > 360)
    orb.stepSize = 360;
};

export const radius = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_RADIUS':
      if (payload.id === orb.id)
        orb.radius = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.radius))
    orb.radius = 100;
  if (orb.radius < -10000)
    orb.radius = -10000;
  if (orb.radius > 10000)
    orb.radius = 10000;
};

export const spin = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_SPIN':
      if (payload.id === orb.id)
        orb.spin = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.spin))
    orb.spin = 1;
  if (orb.radius < -1000)
    orb.radius = -1000;
  if (orb.radius > 1000)
    orb.radius = 1000;
};

export const offset = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_OFFSET':
      if (payload.id === orb.id)
        orb.offset = payload.value;
      break;

    default:
      break;
  }

  if (!isNumber(orb.offset))
    orb.offset = 0;
  if (orb.radius < -3600)
    orb.radius = -3600;
  if (orb.radius > 3600)
    orb.radius = 3600;
};

export const fill = (orb, meta, type, payload) => {
  switch (type) {
    case 'SET_FILL':
      if (payload.id === orb.id)
        orb.fill = payload.value;
      break;

    default:
      break;
  }

  if (!isObject(orb.fill))
    orb.fill = new Color(orb.fill || '#00000000');
};

export const stroke = (orb, meta, type, payload) => {
  if (!isObject(orb.stroke))
    orb.stroke = new Color(orb.stroke || '#ffffffff');
};

export const strokeWidth = (orb, meta, type, payload) => {
  if (!isNumber(orb.strokeWidth))
    orb.strokeWidth = 5;
};

export const close = (orb, meta, type, payload) => {
  if (!isBoolean(orb.close))
    orb.close = false;
};

export const dashArray = (orb, meta, type, payload) => {
  if (!isString(orb.dashArray))
    orb.dashArray = '0';
};

export const dashOffset = (orb, meta, type, payload) => {
  if (!isString(orb.dashOffset))
    orb.dashOffset = '0';
};

export const strokeLineCap = (orb, meta, type, payload) => {
  if (!isString(orb.strokeLineCap))
    orb.strokeLineCap = 'round';
};

export const strokeLineJoin = (orb, meta, type, payload) => {
  if (!isString(orb.strokeLineJoin))
    orb.strokeLineJoin = 'round';
};

export const order = (orb, meta, type, payload) => {
  if (!isNumber(orb.order))
    orb.order = 0;
};
