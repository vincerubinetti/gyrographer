import { createAction } from '.';

export const togglePath = createAction('TOGGLE_PATH', 'Orb: Toggle show path');

export const toggleStick = createAction(
  'TOGGLE_STICK',
  'Orb: Toggle show stick'
);

export const toggleWheel = createAction(
  'TOGGLE_WHEEL',
  'Orb: Toggle show wheel'
);

export const setFrom = createAction('SET_FROM', 'Orb: Change "from" value');

export const setTo = createAction('SET_TO', 'Orb: Change "to" value');
