import { copyObject } from '../util/object.js';

export function reducer(state = {}, action) {
  const newState = copyObject(state);

  newState.orbs = {};
  newState.orbs['1'] = {
    spin: 3,
    radius: 500,
    fillColor: '#ffffff10',
    strokeColor: '#ffffff20',
    showPath: false,
    showArrow: true,
    showWheel: true
  };
  newState.orbs['2'] = {
    spin: 10,
    radius: 200,
    parentId: '1',
    fillColor: '#ffffff10',
    strokeColor: '#ffffff20',
    showPath: false,
    showArrow: true,
    showWheel: true
  };
  newState.orbs['3'] = {
    spin: -1,
    radius: 75,
    parentId: '2',
    stepSize: 0.1,
    fillColor: '#ffffff10',
    strokeColor: '#ffffff20',
    showPath: false,
    showArrow: true,
    showWheel: true
  };
  newState.orbs['4'] = {
    spin: -1,
    radius: 75,
    parentId: '2',
    stepSize: 0.1,
    strokeColor: '#ffffffff',
    showPath: true
  };

  return {
    edit: edit(newState.edit, action),
    loop: loop(newState.loop, action),
    showBounds: showBounds(newState.showBounds, action),
    showAxes: showAxes(newState.showAxes, action),
    showGrid: showGrid(newState.showGrid, action),
    speed: speed(newState.speed, action),
    left: left(newState.left, action),
    top: top(newState.top, action),
    right: right(newState.right, action),
    bottom: bottom(newState.bottom, action),
    backgroundColor: backgroundColor(newState.backgroundColor, action),
    guideColor: guideColor(newState.guideColor, action),
    fps: fps(newState.fps, action),
    length: length(newState.length, action),
    orbs: orbs(newState.orbs, action)
  };
}

function edit(state = false, action) {
  let newState = state;
  switch (action.type) {
    case 'toggle_edit':
      newState = !state;
      break;

    default:
      break;
  }

  if (typeof newState !== 'boolean')
    newState = false;

  return newState;
}

function loop(state = false, action) {
  let newState = state;
  switch (action.type) {
    case 'toggle_loop':
      newState = !state;
      break;

    default:
      break;
  }

  if (typeof newState !== 'boolean')
    newState = true;

  return newState;
}

function showBounds(state = true, action) {
  let newState = state;
  switch (action.type) {
    case 'toggle_bounds':
      newState = !state;
      break;

    default:
      break;
  }

  if (typeof newState !== 'boolean')
    newState = true;

  return newState;
}

function showAxes(state = true, action) {
  let newState = state;
  switch (action.type) {
    case 'toggle_axes':
      newState = !state;
      break;

    default:
      break;
  }

  if (typeof newState !== 'boolean')
    newState = true;

  return newState;
}

function showGrid(state = true, action) {
  let newState = state;
  switch (action.type) {
    case 'toggle_grid':
      newState = !state;
      break;

    default:
      break;
  }

  if (typeof newState !== 'boolean')
    newState = true;

  return newState;
}

function speed(state = 1, action) {
  let newState = state;
  switch (action.type) {
    case 'set_speed':
      newState = action.payload.speed;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = 1;
  if (newState < 0.1)
    newState = 0.01;
  if (newState > 10)
    newState = 100;

  return newState;
}

function left(state = -1000, action) {
  let newState = state;
  switch (action.type) {
    case 'set_left':
      newState = action.payload.left;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = -1000;
  if (newState < -10000)
    newState = -10000;
  if (newState > 10000)
    newState = 10000;

  return newState;
}

function top(state = -1000, action) {
  let newState = state;
  switch (action.type) {
    case 'set_top':
      newState = action.payload.top;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = -1000;
  if (newState < -10000)
    newState = -10000;
  if (newState > 10000)
    newState = 10000;

  return newState;
}

function right(state = 1000, action) {
  let newState = state;
  switch (action.type) {
    case 'set_right':
      newState = action.payload.right;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = -1000;
  if (newState < -10000)
    newState = -10000;
  if (newState > 10000)
    newState = 10000;

  return newState;
}

function bottom(state = 1000, action) {
  let newState = state;
  switch (action.type) {
    case 'set_bottom':
      newState = action.payload.bottom;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = -1000;
  if (newState < -10000)
    newState = -10000;
  if (newState > 10000)
    newState = 10000;

  return newState;
}

function backgroundColor(state = '#202020ff', action) {
  let newState = state;
  switch (action.type) {
    case 'set_background_color':
      newState = action.payload.backgroundColor;
      break;

    default:
      break;
  }

  if (typeof newState !== 'string')
    newState = '#202020ff';

  return newState;
}

function guideColor(state = '#ffffff80', action) {
  let newState = state;
  switch (action.type) {
    case 'set_guide_color':
      newState = action.payload.guideColor;
      break;

    default:
      break;
  }

  if (typeof newState !== 'string')
    newState = '#ffffff80';

  return newState;
}
function fps(state = 60, action) {
  let newState = state;
  switch (action.type) {
    case 'set_fps':
      newState = action.payload.fps;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = 60;
  if (newState < 1)
    newState = 1;
  if (newState > 500)
    newState = 500;

  return newState;
}

function length(state = 300, action) {
  let newState = state;
  switch (action.type) {
    case 'set_length':
      newState = action.payload.length;
      break;

    default:
      break;
  }

  if (typeof newState !== 'number')
    newState = 300;
  if (newState < 0.1)
    newState = 0.1;
  if (newState > 300)
    newState = 300;

  return newState;
}

function orbs(state = {}, action) {
  const newState = state;
  for (const key of Object.keys(newState)) {
    newState[key] = {
      parentId: parentId(newState[key].parentId, action),
      showPath: showPath(newState[key].showPath, action),
      showArrow: showArrow(newState[key].showArrow, action),
      showWheel: showWheel(newState[key].showWheel, action),
      from: from(newState[key].from, action),
      to: to(newState[key].to, action),
      stepSize: stepSize(newState[key].stepSize, action),
      radius: radius(newState[key].radius, action),
      spin: spin(newState[key].spin, action),
      offset: offset(newState[key].offset, action),
      fillColor: fillColor(newState[key].fillColor, action),
      strokeColor: strokeColor(newState[key].strokeColor, action),
      strokeWidth: strokeWidth(newState[key].strokeWidth, action),
      close: close(newState[key].close, action),
      dashArray: dashArray(newState[key].dashArray, action),
      dashOffset: dashOffset(newState[key].dashOffset, action),
      strokeLineCap: strokeLineCap(newState[key].strokeLineCap, action),
      strokeLineJoin: strokeLineJoin(newState[key].strokeLineJoin, action),
      order: order(newState[key].order, action)
    };
  }
  return newState;
}

function parentId(state = null, action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = null;

  return newState;
}

function showPath(state = true, action) {
  let newState = state;

  if (typeof newState !== 'boolean')
    newState = true;

  return newState;
}

function showArrow(state = false, action) {
  let newState = state;

  if (typeof newState !== 'boolean')
    newState = false;

  return newState;
}

function showWheel(state = false, action) {
  let newState = state;

  if (typeof newState !== 'boolean')
    newState = false;

  return newState;
}

function from(state = 0, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 0;

  return newState;
}

function to(state = 100, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 100;

  return newState;
}

function stepSize(state = 0.1, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 0.1;
  if (newState <= 0)
    newState = 0.1;

  return newState;
}

function radius(state = 100, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 100;

  return newState;
}

function spin(state = 1, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 1;

  return newState;
}

function offset(state = 0, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 0;

  return newState;
}

function fillColor(state = 'none', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = 'none';

  return newState;
}

function strokeColor(state = '#ffffffff', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = '#ffffffff';

  return newState;
}

function strokeWidth(state = 5, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 5;

  return newState;
}

function close(state = false, action) {
  let newState = state;

  if (typeof newState !== 'boolean')
    newState = false;

  return newState;
}

function dashArray(state = '0', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = '0';

  return newState;
}

function dashOffset(state = '0', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = '0';

  return newState;
}

function strokeLineCap(state = 'round', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = 'round';

  return newState;
}

function strokeLineJoin(state = 'round', action) {
  let newState = state;

  if (typeof newState !== 'string')
    newState = 'round';

  return newState;
}

function order(state = 0, action) {
  let newState = state;

  if (typeof newState !== 'number')
    newState = 0;

  return newState;
}
