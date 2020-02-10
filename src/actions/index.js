import { createAction as reduxCreateAction } from 'redux-actions';

export const createAction = (type, description = '') =>
  reduxCreateAction(type, null, () => ({
    description: description
  }));
