import { toFixed } from '../util/math';
import { copyObject } from '../util/object';
import { getType } from '../util/types';
import { isString } from '../util/types';
import { isObject } from '../util/types';
import { Color } from '../util/color';

import projectSpec from '../project.spec.json';
import orbSpec from '../orb.spec.json';

const reducer = (state = {}, { type = '', payload = {} } = {}) => {
  if (!type)
    return state;

  let newState;

  if (type === 'SET_STATE')
    newState = payload.state;
  else
    newState = copyObject(state);

  const { orbs = {}, ...project } = newState;

  const newProject = reduce(projectSpec, project, type, payload);

  const newOrbs = {};

  for (const [orbId, orb] of Object.entries(orbs))
    newOrbs[orbId] = reduce(orbSpec, { ...orb, id: orbId }, type, payload);

  newState = { ...newProject, orbs: newOrbs };

  return newState;
};

export default reducer;

const reduce = (spec, object = {}, action, payload) => {
  for (const [
    key,
    { type, fallback, min, max, precision, choices }
  ] of Object.entries(spec)) {
    if (
      action === 'SET_' + key.toUpperCase() &&
      (!payload.selected ||
        payload.selected && payload.selected === object.id)
    )
      object[key] = payload.value;

    if (type === 'color') {
      if (!isObject(object[key]))
        object[key] = new Color(object[key] || fallback);
    } else if (type === 'choice') {
      if (!isString(object[key]) || !choices.includes(object[key]))
        object[key] = choices[0];
    } else if (getType(object[key]) !== type)
      object[key] = fallback;

    if (type === 'number') {
      if (object[key] > max)
        object[key] = max;
      if (object[key] < min)
        object[key] = min;
      object[key] = toFixed(object[key], precision);
    }
  }

  return object;
};
