import { Color } from '../util/color';

export const project = (state, meta, type, payload) => {
  state = { ...state };

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

  if (typeof state.selected !== 'string')
    state.selected = '';
};

export const loop = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_LOOP':
      state.loop = !state.loop;
      break;

    default:
      break;
  }

  if (typeof state.loop !== 'boolean')
    state.loop = true;
};

export const showBounds = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_BOUNDS':
      state.showBounds = !state.showBounds;
      break;

    default:
      break;
  }

  if (typeof state.showBounds !== 'boolean')
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

  if (typeof state.showAxes !== 'boolean')
    state.showAxes = true;
};

export const showGrid = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_GRID':
      state.showGrid = !state.showGrid;
      break;

    default:
      break;
  }

  if (typeof state.showGrid !== 'boolean')
    state.showGrid = true;
};

export const showPaths = (state, meta, type, payload) => {
  switch (type) {
    case 'TOGGLE_PATHS':
      state.showPaths = !state.showPaths;
      break;

    default:
      break;
  }

  if (typeof state.showPaths !== 'boolean')
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

  if (typeof state.showSticks !== 'boolean')
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

  if (typeof state.showWheels !== 'boolean')
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

  if (typeof state.speed !== 'number')
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

  if (typeof state.left !== 'number')
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

  if (typeof state.top !== 'number')
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

  if (typeof state.right !== 'number')
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

  if (typeof state.bottom !== 'number')
    state.bottom = 1000;
  if (state.bottom < -10000)
    state.bottom = -10000;
  if (state.bottom > 10000)
    state.bottom = 10000;
};

export const backgroundColor = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_BACKGROUND_COLOR':
      state.backgroundColor = new Color('payload.backgroundColor');
      break;

    default:
      break;
  }

  if (typeof state.backgroundColor !== 'string')
    state.backgroundColor = new Color('#202020ff');
};

export const guideColor = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_GUIDE_COLOR':
      state.guideColor = new Color('payload.guideColor');
      break;

    default:
      break;
  }

  if (typeof state.guideColor !== 'string')
    state.guideColor = new Color('#ffffff80');
};

export const fps = (state, meta, type, payload) => {
  switch (type) {
    case 'SET_FPS':
      state.fps = payload.fps;
      break;

    default:
      break;
  }

  if (typeof state.fps !== 'number')
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

  if (typeof state.length !== 'number')
    state.length = 300;
  if (state.length < 0.1)
    state.length = 0.1;
  if (state.length > 300)
    state.length = 300;
};
