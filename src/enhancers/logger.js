import { isUndoable } from './undoer';

export const logger = (store) => (next) => (action) => {
  const prevState = store.getState();
  const results = next(action);
  const nextState = store.getState();

  console.groupCollapsed(
    '%c' + action.type,
    isUndoable(action) ? 'color: blue' : 'color: grey'
  );
  console.groupCollapsed('%cprev state', 'color: grey');
  console.log(prevState);
  console.groupEnd();

  console.groupCollapsed('%caction', 'color: blue');
  console.log(action);
  console.groupEnd();

  console.groupCollapsed('%cnext state', 'color: green');
  console.log(nextState);
  console.groupEnd();
  console.groupEnd();

  return results;
};
