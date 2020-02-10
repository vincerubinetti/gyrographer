import { createAction } from '.';

export const setSelected = createAction('SET_SELECTED');

export const toggleBounds = createAction('TOGGLE_BOUNDS', 'toggle show bounds');

export const toggleAxes = createAction('TOGGLE_AXES', 'toggle show axes');

export const toggleGrid = createAction('TOGGLE_GRID', 'toggle show grid');

export const togglePaths = createAction('TOGGLE_PATHS', 'toggle show bounds');

export const toggleSticks = createAction('TOGGLE_STICKS', 'toggle show axes');

export const toggleWheels = createAction('TOGGLE_WHEELS', 'toggle show grid');

export const toggleLoop = createAction('TOGGLE_LOOP', 'toggle loop');

export const setSpeed = createAction('SET_SPEED', 'set preview speed');
