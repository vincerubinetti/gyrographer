import { isUndoable } from './undoer';

export const logger = (store) => (next) => (action) => {
  const prevState = store.getState();
  const results = next(action);
  const nextState = store.getState();

  console.groupCollapsed(
    '%c' + action.type,
    isUndoable(action) ? 'color: blue' : 'color: grey'
  );
  {
    console.group('%cprev state', 'color: grey');
    console.logSync(prevState);
    console.groupEnd();

    console.group('%caction', 'color: blue');
    console.logSync(action);
    console.groupEnd();

    console.group('%cnext state', 'color: green');
    console.logSync(nextState);
    console.groupEnd();
  }
  console.groupEnd();

  return results;
};
