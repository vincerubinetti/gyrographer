import { isUndoable } from './undoer';
import {log} from '../util/debug';

export const logger = (store) => (next) => (action) => {
  const prevState = store.getState();
  const results = next(action);
  const nextState = store.getState();

  console.groupCollapsed(
    '%c' + action.type,
    isUndoable(action) ? 'color: blue' : 'color: grey'
  );
  console.groupCollapsed('%cprev state', 'color: grey');
  log(prevState);
  console.groupEnd();

  console.groupCollapsed('%caction', 'color: blue');
  log(action);
  console.groupEnd();

  console.groupCollapsed('%cnext state', 'color: green');
  log(nextState);
  console.groupEnd();
  console.groupEnd();

  return results;
};
