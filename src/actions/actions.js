import { createAction } from '.';

export const toggleEdit = createAction('TOGGLE_EDIT', 'Toggle edit mode');

export const toggleBounds = createAction('TOGGLE_BOUNDS', 'Toggle show bounds');

export const toggleAxes = createAction('TOGGLE_AXES', 'Toggle show axes');

export const toggleGrid = createAction('TOGGLE_GRID', 'Toggle show grid');

export const toggleLoop = createAction('TOGGLE_LOOP', 'Toggle loop');

export const setSpeed = createAction('SET_SPEED', 'Set preview sped');
