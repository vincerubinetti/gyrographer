export function filterObject(object, deleteKeys) {
  for (const key of deleteKeys)
    delete object[key];
  return object;
}
