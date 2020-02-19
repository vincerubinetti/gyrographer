import { isObject } from './types';
import { isArray } from './types';

export const filterObject = (object, deleteKeys) => {
  object = copyObject(object);
  for (const key of deleteKeys)
    delete object[key];
  return object;
};

export const copyObject = (item) => {
  if (isObject(item)) {
    const copy = {};
    for (const [key, value] of Object.entries(item))
      copy[key] = copyObject(value);
    return copy;
  } else if (isArray(item))
    return item.map(copyObject);
  else
    return item;
};
