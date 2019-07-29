import { copyObject } from '../util/object.js';
import { filterObject } from '../util/object.js';

const key = 'root';

export const persister = (store) => (next) => (action) => {
  const results = next(action);
  window.localStorage.clear();
  window.localStorage.setItem(
    key,
    JSON.stringify(
      filterObject(copyObject(store.getState()), ['past', 'future'])
    )
  );
  return results;
};

export function getInitialState() {
  let results = {};
  const stored = window.localStorage.getItem(key);
  if (stored) {
    try {
      results = JSON.parse(stored);
    } catch (error) {
      console.log(error);
    }
  }
  console.groupCollapsed('load_state_from_storage');
  console.log(results);
  console.groupEnd();
  return results;
}
