import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Reducer } from './reducer.js';
import { App } from './app.js';

const store = createStore(Reducer);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
