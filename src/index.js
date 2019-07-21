import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './state/reducers.js';
import { undoer } from './state/undoer.js';
import { logger } from './state/logger.js';
import { persister } from './state/persister';
import { getInitialState } from './state/persister.js';
import { App } from './app.js';

const store = createStore(
  undoer(reducer),
  getInitialState(),
  applyMiddleware(persister, logger)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
