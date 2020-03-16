export const createAction = (type) => (payload) => ({
  type,
  payload
});

export const setState = createAction('SET_STATE');
