import { project } from './project';
import { orbs } from './orbs';
import { copyObject } from '../util/object';

const reducer = (state = {}, action = {}) => {
  const { meta = {}, type = '', payload = {} } = action;

  let newState = copyObject(state);

  if (type === 'SET_STATE')
    newState = payload.state;

  newState = {
    ...project(newState, meta, type, payload),
    ...orbs(newState.orbs, meta, type, payload)
  };

  return newState;
};

export default reducer;
