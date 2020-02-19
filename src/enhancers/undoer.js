import { filterObject, copyObject } from '../util/object.js';

export const undoer = (reducer) => (state, action) => {
  const oldState = filterObject(state, ['past', 'future']);
  const oldPast = copyObject(state.past) || [];
  const oldFuture = copyObject(state.future) || [];
  let newPast = copyObject(oldPast) || [];
  let newFuture = copyObject(oldFuture) || [];
  let newState = reducer(oldState, action);
  newState.actionDescription = action?.meta?.description;

  switch (action.type) {
    case 'UNDO':
      if (!oldPast.length)
        break;

      newState = oldPast[0];
      newPast = oldPast.slice(1);
      newFuture = [oldState, ...oldFuture];
      break;

    case 'REDO':
      if (!oldFuture.length)
        break;

      newState = oldFuture[0];
      newPast = [...oldPast, oldState];
      newFuture = oldFuture.slice(1);
      break;

    default:
      if (!isUndoable(action))
        break;

      newPast = [oldState, ...oldPast];
      newFuture = [];
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
