import { project } from './project.js';
import { orbs } from './orbs.js';

const reducer = (state, action) => {
  const { meta, type, payload } = action;

  const newState = {
    ...project(state, meta, type, payload),
    ...orbs(state.orbs, meta, type, payload)
  };
  return newState;
};

export default reducer;
