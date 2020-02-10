import { filterObject } from '../util/object.js';

export const undoer = (reducer) => (state, action) => {
  const filteredState = filterObject({ ...state }, ['past', 'future']);
  let newState = {};
  const past = state.past || [];
  const future = state.future || [];
  let newPast = [];
  let newFuture = [];

  switch (action.type) {
    case 'UNDO':
      if (!past.length)
        return filteredState;
      newState = past[past.length - 1];
      newPast = past.slice(0, past.length - 1);
      newFuture = [filteredState, ...future];
      return {
        ...newState,
        past: newPast,
        future: newFuture
      };

    case 'REDO':
      if (!future.length)
        return filteredState;
      newState = future[0];
      newPast = [...past, filteredState];
      newFuture = future.slice(1);
      return {
        ...newState,
        past: newPast,
        future: newFuture
      };

    default:
      newState = reducer(filteredState, action);
      if (!action?.meta?.description) {
        return {
          ...newState,
          past,
          future
        };
      }

      // if state isn't initial state loaded from localStorage
      if (state.past && state.future)
        newPast = [...past, filteredState];
      return {
        ...newState,
        past: newPast,
        future: newFuture,
        actionDescription: action?.meta?.description || ''
      };
  }
};
