import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import { undoer } from './enhancers/undoer.js';
import { logger } from './enhancers/logger.js';
import { persister } from './enhancers/persister';
import { getInitialState } from './enhancers/persister.js';
import App from './app.js';

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
