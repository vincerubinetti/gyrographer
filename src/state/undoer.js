import { filterObject } from '../util/object.js';

export function undoer(reducer) {
  return function(state, action) {
    const filteredState = filterObject(state, ['past', 'future']);
    let newState = {};
    const past = state.past || [];
    const future = state.future || [];
    let newPast = [];
    let newFuture = [];

    switch (action.type) {
      case 'undo':
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

      case 'redo':
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
        // if state isn't initial state loaded from localStorage
        if (state.past && state.future)
          newPast = [...past, filteredState];
        return {
          ...newState,
          past: newPast,
          future: newFuture,
          actionDescription: action.payload
            ? action.payload.description || ''
            : ''
        };
    }
  };
}

export function undo() {
  return {
    type: 'undo'
  };
}

export function redo() {
  return {
    type: 'redo'
  };
}
