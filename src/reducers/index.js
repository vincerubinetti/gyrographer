import { project } from './project';
import { orbs } from './orbs';

const reducer = (state, action) => {
  const { meta = {}, type = '', payload = {} } = action;

  const newState = {
    ...project(state, meta, type, payload),
    ...orbs(state.orbs, meta, type, payload)
  };
  return newState;
};

export default reducer;
