export const orbs = (state, meta, type, payload) => {
  state = { ...(state || {}) };

  for (const key of Object.keys(state)) {
    state[key].parentId = parentId(state[key].parentId, meta, type, payload);
    state[key].showPath = showPath(state[key].showPath, meta, type, payload);
    state[key].showArrow = showArrow(state[key].showArrow, meta, type, payload);
    state[key].showWheel = showWheel(state[key].showWheel, meta, type, payload);
    state[key].from = from(state[key].from, meta, type, payload);
    state[key].to = to(state[key].to, meta, type, payload);
    state[key].stepSize = stepSize(state[key].stepSize, meta, type, payload);
    state[key].radius = radius(state[key].radius, meta, type, payload);
    state[key].spin = spin(state[key].spin, meta, type, payload);
    state[key].offset = offset(state[key].offset, meta, type, payload);
    state[key].fillColor = fillColor(state[key].fillColor, meta, type, payload);
    state[key].strokeColor = strokeColor(
      state[key].strokeColor,
      meta,
      type,
      payload
    );
    state[key].strokeWidth = strokeWidth(
      state[key].strokeWidth,
      meta,
      type,
      payload
    );
    state[key].close = close(state[key].close, meta, type, payload);
    state[key].dashArray = dashArray(state[key].dashArray, meta, type, payload);
    state[key].dashOffset = dashOffset(
      state[key].dashOffset,
      meta,
      type,
      payload
    );
    state[key].strokeLineCap = strokeLineCap(
      state[key].strokeLineCap,
      meta,
      type,
      payload
    );
    state[key].strokeLineJoin = strokeLineJoin(
      state[key].strokeLineJoin,
      meta,
      type,
      payload
    );
    state[key].order = order(state[key].order, meta, type, payload);
  }

  return { orbs: state };
};

export const parentId = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = null;
};

export const showPath = (state, meta, type, payload) => {
  if (typeof state !== 'boolean')
    state = true;
};

export const showArrow = (state, meta, type, payload) => {
  if (typeof state !== 'boolean')
    state = false;
};

export const showWheel = (state, meta, type, payload) => {
  if (typeof state !== 'boolean')
    state = false;
};

export const from = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 0;
};

export const to = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 100;
};

export const stepSize = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 0.1;
  if (state <= 0)
    state = 0.1;
};

export const radius = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 100;
};

export const spin = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 1;
};

export const offset = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 0;
};

export const fillColor = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = 'none';
};

export const strokeColor = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = '#ffffffff';
};

export const strokeWidth = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 5;
};

export const close = (state, meta, type, payload) => {
  if (typeof state !== 'boolean')
    state = false;
};

export const dashArray = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = '0';
};

export const dashOffset = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = '0';
};

export const strokeLineCap = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = 'round';
};

export const strokeLineJoin = (state, meta, type, payload) => {
  if (typeof state !== 'string')
    state = 'round';
};

export const order = (state, meta, type, payload) => {
  if (typeof state !== 'number')
    state = 0;
};
