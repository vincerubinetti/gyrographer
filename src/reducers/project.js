import { Color } from '../util/color';
import { isBoolean } from '../util/types';
import { isString } from '../util/types';
import { isNumber } from '../util/types';
import { isObject } from '../util/types';

export const project = (state = {}, meta, type, payload) => {
  const reducers = [
    selected,
    loop,
    showBounds,
    showAxes,
    showGrid,
    showPaths,
    showSticks,
    showWheels,
    speed,
    left,
    top,
    right,
    bottom,
    backgroundColor,
    guideColor,
    fps,
    length
  ];

  reducers.forEach((reducer) => reducer(state, meta, type, payload));

  return state;
};

export const selected = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_SELECTED':
      state.selected = String(payload.id || '');
      break;

    default:
      break;
  }

  if (!isString(state.selected))
    state.selected = '';
  if (state.selected && !state.orbs[state.selected])
    state.selected = '';

  state.selected = '1';
};

export const loop = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_LOOP':
      state.loop = !state.loop;
      break;

    default:
      break;
  }

  if (!isBoolean(state.loop))
    state.loop = false;
};

export const showBounds = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_BOUNDS':
      state.showBounds = !state.showBounds;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showBounds))
    state.showBounds = true;
};

export const showAxes = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_AXES':
      state.showAxes = !state.showAxes;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showAxes))
    state.showAxes = false;
};

export const showGrid = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_GRID':
      state.showGrid = !state.showGrid;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showGrid))
    state.showGrid = false;
};

export const showPaths = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_PATHS':
      state.showPaths = !state.showPaths;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showPaths))
    state.showPaths = true;
};

export const showSticks = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_STICKS':
      state.showSticks = !state.showSticks;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showSticks))
    state.showSticks = true;
};

export const showWheels = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_WHEELS':
      state.showWheels = !state.showWheels;
      break;

    default:
      break;
  }

  if (!isBoolean(state.showWheels))
    state.showWheels = true;
};

export const speed = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_SPEED':
      state.speed = payload.speed;
      break;

    default:
      break;
  }

  if (!isNumber(state.speed))
    state.speed = 1;
  if (state.speed < 0.1)
    state.speed = 0.01;
  if (state.speed > 10)
    state.speed = 100;
};

export const left = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_LEFT':
      state.left = payload.left;
      break;

    default:
      break;
  }

  if (!isNumber(state.left))
    state.left = -1000;
  if (state.left < -10000)
    state.left = -10000;
  if (state.left > 10000)
    state.left = 10000;
};

export const top = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_TOP':
      state.top = payload.top;
      break;

    default:
      break;
  }

  if (!isNumber(state.top))
    state.top = -1000;
  if (state.top < -10000)
    state.top = -10000;
  if (state.top > 10000)
    state.top = 10000;
};

export const right = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_RIGHT':
      state.right = payload.right;
      break;

    default:
      break;
  }

  if (!isNumber(state.right))
    state.right = 1000;
  if (state.right < -10000)
    state.right = -10000;
  if (state.right > 10000)
    state.right = 10000;
};

export const bottom = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_BOTTOM':
      state.bottom = payload.bottom;
      break;

    default:
      break;
  }

  if (!isNumber(state.bottom))
    state.bottom = 1000;
  if (state.bottom < -10000)
    state.bottom = -10000;
  if (state.bottom > 10000)
    state.bottom = 10000;
};

export const backgroundColor = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_BACKGROUND_COLOR':
      state.backgroundColor = new Color(payload.backgroundColor);
      break;

    default:
      break;
  }

  if (!isObject(state.backgroundColor))
    state.backgroundColor = new Color(state.backgroundColor || '#202020ff');
};

export const guideColor = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_GUIDE_COLOR':
      state.guideColor = new Color(payload.guideColor);
      break;

    default:
      break;
  }

  if (!isObject(state.guideColor))
    state.guideColor = new Color(state.guideColor || '#ffffff80');
};

export const fps = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_FPS':
      state.fps = payload.fps;
      break;

    default:
      break;
  }

  if (!isNumber(state.fps))
    state.fps = 60;
  if (state.fps < 1)
    state.fps = 1;
  if (state.fps > 500)
    state.fps = 500;
};

export const length = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_LENGTH':
      state.length = payload.length;
      break;

    default:
      break;
  }

  if (!isNumber(state.length))
    state.length = 300;
  if (state.length < 0.1)
    state.length = 0.1;
  if (state.length > 180000)
    state.length = 180000;
};
