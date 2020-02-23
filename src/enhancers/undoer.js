const staticKeys = ['selected'];

let lastUndoablePresent;

export const undoer = (reducer) => (
  { past = [], future = [], ...present } = {},
  action
) => {
  let newPresent = present;
  let newPast = past;
  let newFuture = future;

  switch (action.type) {
    case 'UNDO':
      if (past.length) {
        newPresent = past[0];
        newPast = past.slice(1);
        newFuture = [present, ...future];
        newPresent = maintainStaticKeys(staticKeys, present, newPresent);
        newPresent = reducer(newPresent, action);
      }
      break;

    case 'REDO':
      if (future.length) {
        newPresent = future[0];
        newPast = [present, ...past];
        newFuture = future.slice(1);
        newPresent = maintainStaticKeys(staticKeys, present, newPresent);
        newPresent = reducer(newPresent, action);
      }
      break;

    default:
      newPresent = reducer(present, action);
      if (isUndoable(action)) {
        newPresent.actionDescription = action?.meta?.description;
        newPast = [lastUndoablePresent || present, ...past];
        newFuture = [];
        lastUndoablePresent = newPresent;
      }
      break;
  }

  return {
    ...newPresent,
    past: newPast,
    future: newFuture
  };
};

export const isUndoable = (action) =>
  action?.meta?.description && !action?.payload?.noUndo;

const maintainStaticKeys = (staticKeys, present, newPresent) => {
  for (const key of staticKeys)
    newPresent[key] = present[key];

  return newPresent;
};
