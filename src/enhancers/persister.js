import testSaveFile from '../test-save-file.json';

const key = 'root';

// for testing, clear storage on every page reload
window.localStorage.clear();

export const persister = (store) => (next) => (action) => {
  const results = next(action);
  window.localStorage.clear();
  window.localStorage.setItem(key, JSON.stringify(store.getState()));
  return results;
};

export const getStateFromStorage = () => {
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
  return results;
};
