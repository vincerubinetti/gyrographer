import { toFixed } from '../util/math';
import { copyObject } from '../util/object';
import { getType } from '../util/types';
import { isString } from '../util/types';
import { isObject } from '../util/types';
import { Color } from '../util/color';

import projectSpec from '../project.spec.json';
import orbSpec from '../orb.spec.json';

const projectProps = Object.keys(projectSpec);
const orbProps = Object.keys(orbSpec);

const reducer = (state, action) => {
  return cleanState(reduce(copyObject(state), action));
};

export default reducer;

const reduce = (state = {}, { type, payload } = {}) => {
  if (!type || !payload)
    return state;

  if (type === 'set_state')
    return payload.state;

  const prop = type.replace('set_', '');
  const id = payload.selected;
  const isProject = projectProps.includes(prop);
  const isOrb = orbProps.includes(prop) && Object.keys(state.orbs).includes(id);

  if (isProject)
    return { ...state, [prop]: payload.value };

  if (isOrb) {
    return {
      ...state,
      orbs: {
        ...state.orbs,
        [id]: { ...state.orbs[id], [prop]: payload.value }
      }
    };
  }

  return state;
};

const cleanState = (state) => {
  const { orbs = {}, ...project } = state;

  let newProject = {};
  const newOrbs = {};

  newProject = cleanSlice({ spec: projectSpec, slice: project });

  for (const [orbId, orb] of Object.entries(orbs)) {
    newOrbs[orbId] = cleanSlice({
      spec: orbSpec,
      slice: { ...orb, id: orbId }
    });
  }

  return { ...newProject, orbs: newOrbs };
};

const cleanSlice = ({ spec, slice = {} }) => {
  const newSlice = { ...slice };
  for (const [key, value] of Object.entries(spec))
    newSlice[key] = cleanValue({ value: slice[key], ...value });

  return newSlice;
};

const cleanValue = ({
  value,
  type,
  fallback,
  min,
  max,
  precision,
  choices
}) => {
  if (type === 'color') {
    if (!isObject(value))
      value = new Color(value || fallback);
  } else if (type === 'choice') {
    if (!isString(value) || !choices.includes(value))
      value = choices[0];
  } else if (getType(value) !== type)
    value = fallback;

  if (type === 'number') {
    if (value > max)
      value = max;
    if (value < min)
      value = min;
    value = toFixed(value, precision);
  }

  return value;
};
