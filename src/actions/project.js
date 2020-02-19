import { createAction } from '.';

export const setSelected = createAction('SET_SELECTED');

export const toggleBounds = createAction(
  'TOGGLE_BOUNDS',
  'Project: Toggle show bounds'
);

export const toggleAxes = createAction(
  'TOGGLE_AXES',
  'Project: Toggle show axes'
);

export const toggleGrid = createAction(
  'TOGGLE_GRID',
  'Project: Toggle show grid'
);

export const togglePaths = createAction(
  'TOGGLE_PATHS',
  'Project: Toggle show paths'
);

export const toggleSticks = createAction(
  'TOGGLE_STICKS',
  'Project: Toggle show sticks'
);

export const toggleWheels = createAction(
  'TOGGLE_WHEELS',
  'Project: Toggle show wheels'
);

export const toggleLoop = createAction('TOGGLE_LOOP', 'Project: Toggle loop');

export const setSpeed = createAction('SET_SPEED', 'Project: Set preview speed');
