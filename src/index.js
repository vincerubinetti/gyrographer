import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import undoable from 'redux-undo';

import { rootReducer } from './state.js';
import { App } from './app.js';

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false
});

const perstistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage
  },
  rootReducer
);

const undoableReducer = undoable(perstistedReducer);

const store = createStore(undoableReducer, applyMiddleware(logger));

const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
