import { createAction } from '.';

export const toggleEdit = createAction('TOGGLE_EDIT', 'toggle edit mode');

export const toggleBounds = createAction('TOGGLE_BOUNDS', 'toggle show bounds');

export const toggleAxes = createAction('TOGGLE_AXES', 'toggle show axes');

export const toggleGrid = createAction('TOGGLE_GRID', 'toggle show grid');

export const toggleLoop = createAction('TOGGLE_LOOP', 'toggle loop');

export const setSpeed = createAction('SET_SPEED', 'set preview speed');
