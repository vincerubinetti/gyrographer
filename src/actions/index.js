export const createAction = (type, description) => ({ ...args }) => {
  return {
    type,
    meta: {
      description
    },
    payload: args
  };
};
