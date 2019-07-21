export function copyObject(object) {
  if (typeof object === 'object')
    return JSON.parse(JSON.stringify(object));
  else
    return object;
}

export function compareObjects(object1, object2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}

export function filterObject(object, keys) {
  const result = {};
  for (const key of Object.keys(object)) {
    if (!keys.includes(key))
      result[key] = copyObject(object[key]);
  }

  return result;
}
