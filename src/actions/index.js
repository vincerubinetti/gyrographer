import { createAction as reduxCreateAction } from 'redux-actions';

export const createAction = (type, description = '') =>
  reduxCreateAction(type, null, (action) => ({
    description: description
  }));

export const setState = createAction('SET_STATE');
