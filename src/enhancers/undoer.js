import { copyObject } from '../util/object.js';
import { filterObject } from '../util/object.js';

export const undoer = (reducer) => (state, action) => {
  state = copyObject(state);
  const oldState = filterObject(state, ['past', 'future']);
  const oldPast = copyObject(state.past || []);
  const oldFuture = copyObject(state.future || []);
  let newPast = copyObject(oldPast || []);
  let newFuture = copyObject(oldFuture || []);
  let newState = reducer(oldState, action);
  newState.actionDescription = action?.meta?.description;

  switch (action.type) {
    case 'UNDO':
      if (!oldPast.length)
        break;

      newState = copyObject(oldPast[0]);
      newPast = copyObject(oldPast.slice(1));
      newFuture = copyObject([oldState, ...oldFuture]);
      break;

    case 'REDO':
      if (!oldFuture.length)
        break;

      newState = copyObject(oldFuture[0]);
      newPast = copyObject([...oldPast, oldState]);
      newFuture = copyObject(oldFuture.slice(1));
      break;

    default:
      if (!isUndoable(action))
        break;

      newPast = copyObject([oldState, ...oldPast]);
      newFuture = copyObject([]);
      break;
  }

  return {
    ...newState,
    past: newPast,
    future: newFuture
  };
};

export const isUndoable = (action) =>
  action?.meta?.description && !action?.payload?.noUndo;
