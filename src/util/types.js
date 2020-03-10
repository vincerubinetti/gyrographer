export const isBoolean = (value) => typeof value === 'boolean';

export const isNumber = (value) =>
  typeof value === 'number' && !Number.isNaN(value);

export const isString = (value) => typeof value === 'string';

export const isArray = (value) => Array.isArray(value);

export const isObject = (value) =>
  !isArray(value) && typeof value === 'object' && value !== null;

export const isFunction = (value) => typeof value === 'function';

export const getType = (value) => {
  if (isBoolean(value))
    return 'boolean';
  if (isNumber(value))
    return 'number';
  if (isString(value))
    return 'string';
  if (isArray(value))
    return 'array';
  if (isObject(value))
    return 'object';
  if (isFunction(value))
    return 'function';
  if (value === null)
    return 'null';
  if (value === undefined)
    return 'undefined';
  if (Number.isNaN(value))
    return 'NaN';

  return 'other';
};

export const isEmpty = (payload) =>
  (isArray(payload) && !payload.length) ||
  (isObject(payload) && !Object.keys(payload).length);

export const isBlank = (value) =>
  value === undefined ||
  value === null ||
  isEmpty(value) ||
  (isString(value) && value.trim() === '') ||
  Number.isNaN(value);
