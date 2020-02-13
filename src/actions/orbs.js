import { createAction } from '.';

export const togglePath = createAction(
  'TOGGLE_PATH',
  'toggle show orb path'
);

export const toggleStick = createAction(
  'TOGGLE_STICK',
  'toggle show orb stick'
);

export const toggleWheel = createAction(
  'TOGGLE_WHEEL',
  'toggle show orb wheel'
);
