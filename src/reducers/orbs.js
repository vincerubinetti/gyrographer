import { Color } from '../util/color';
import { isBoolean } from '../util/types';
import { isString } from '../util/types';
import { isNumber } from '../util/types';
import { isObject } from '../util/types';

export const orbs = (state = {}, meta, type, payload) => {
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
  if (!isString(orb.id))
    orb.id = String(id || '0');
};

export const parentId = (orb, meta, type, payload) => {
  if (!isString(orb.parentId))
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
  if (!isNumber(orb.stepSize))
    orb.stepSize = 0.1;
  if (orb.stepSize <= 0)
    orb.stepSize = 0.1;
};

export const radius = (orb, meta, type, payload) => {
  if (!isNumber(orb.radius))
    orb.radius = 100;
};

export const spin = (orb, meta, type, payload) => {
  if (!isNumber(orb.spin))
    orb.spin = 1;
};

export const offset = (orb, meta, type, payload) => {
  if (!isNumber(orb.offset))
    orb.offset = 0;
};

export const fillColor = (orb, meta, type, payload) => {
  if (!isObject(orb.fillColor))
    orb.fillColor = new Color(orb.fillColor || '#00000000');
};

export const strokeColor = (orb, meta, type, payload) => {
  if (!isObject(orb.strokeColor))
    orb.strokeColor = new Color(orb.strokeColor || '#ffffffff');
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
