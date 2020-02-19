import { project } from './project';
import { orbs } from './orbs';
import { copyObject } from '../util/object';

const reducer = (state, action) => {
  const { meta = {}, type = '', payload = {} } = action;

  state = copyObject(state);

  const newState = {
    ...project(state, meta, type, payload),
    ...orbs(state.orbs, meta, type, payload)
  };
  return newState;
};

export default reducer;
