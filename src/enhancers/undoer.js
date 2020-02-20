import { copyObject } from '../util/object.js';
import { filterObject } from '../util/object.js';

export const undoer = (reducer) => (state = {}, action) => {
  state = copyObject(state);
  const past = copyObject(state.past || []);
  const future = copyObject(state.future || []);
  state = filterObject(state, ['past', 'future']);

  switch (action.type) {
    case 'UNDO':
      if (past.length) {
        return {
          ...past[0],
          past: past.slice(1),
          future: [state, ...future]
        };
      } else {
        return {
          ...state,
          past,
          future
        };
      }

    case 'REDO':
      if (future.length) {
        return {
          ...future[0],
          past: [state, ...past],
          future: future.slice(1)
        };
      } else {
        return {
          ...state,
          past,
          future
        };
      }

    default:
      if (isUndoable(action)) {
        return {
          ...reducer(state, action),
          actionDescription: action?.meta?.description,
          past: [state, ...past],
          future: []
        };
      } else {
        return {
          ...reducer(state, action),
          past,
          future
        };
      }
  }
};

export const isUndoable = (action) =>
  action?.meta?.description && !action?.payload?.noUndo;
