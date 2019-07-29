export function copyObject(object) {
  if (typeof object === 'object')
    return JSON.parse(JSON.stringify(object));
  else
    return object;
}

export function filterObject(object, deleteKeys) {
  for (const key of deleteKeys)
    delete object[key];
  return object;
}
