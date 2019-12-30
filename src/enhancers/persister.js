import { copyObject } from '../util/object.js';
import { filterObject } from '../util/object.js';

import testSaveFile from '../test-save-file.json';

const key = 'root';

// for testing, clear storage on every page reload
window.localStorage.clear();

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
  results = testSaveFile;
  console.groupCollapsed('LOAD_STATE_FROM_STORAGE');
  console.log(results);
  console.groupEnd();
  return results;
}