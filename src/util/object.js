import { isObject } from './types';
import { isArray } from './types';

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
