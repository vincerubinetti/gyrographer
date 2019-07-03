export function Reducer(prevState = {}, action) {
  const newState = { ...prevState };

  newState.paths = {};
  newState.paths['1'] = {
    spin: 2,
    showPath: false
  };
  newState.paths['2'] = {
    parent: '1'
  };

  // //////////////////////////////////////////////////
  // set defaults
  // //////////////////////////////////////////////////

  // board properties
  if (!newState.board)
    newState.board = {};
  if (typeof newState.board.left !== 'number')
    newState.board.left = -1000;
  if (typeof newState.board.top !== 'number')
    newState.board.top = -1000;
  if (typeof newState.board.right !== 'number')
    newState.board.right = 1000;
  if (typeof newState.board.bottom !== 'number')
    newState.board.bottom = 1000;
  if (typeof newState.board.color !== 'string')
    newState.board.color = '#404040ff';
  if (typeof newState.board.showGrid !== 'boolean')
    newState.board.showGrid = true;

  // path properties
  if (!newState.paths)
    newState.paths = [];
  for (const key of Object.keys(newState.paths)) {
    const path = newState.paths[key];
    // under-the-hood
    if (typeof path.parent !== 'string')
      path.parent = null;

    // geometry
    if (typeof path.showPath !== 'boolean')
      path.showPath = true;
    if (typeof path.showHelpers !== 'boolean')
      path.showHelpers = false;
    if (typeof path.from !== 'number')
      path.from = 0;
    if (typeof path.to !== 'number')
      path.to = 100;
    if (typeof path.steps !== 'number')
      path.steps = 100;
    if (typeof path.radius !== 'number')
      path.radius = 100;
    if (typeof path.spin !== 'number')
      path.spin = 1;
    if (typeof path.offset !== 'number')
      path.offset = 0;

    // styling
    if (typeof path.fillColor !== 'string')
      path.fillColor = 'none';
    if (typeof path.strokeColor !== 'string')
      path.strokeColor = '#ffffffff';
    if (typeof path.strokeWidth !== 'number')
      path.strokeWidth = 3;
    if (typeof path.close !== 'boolean')
      path.close = true;
    if (typeof path.dashArray !== 'string')
      path.dashArray = '';
    if (typeof path.dashOffset !== 'number')
      path.dashOffset = 0;
    if (typeof path.strokeLineCap !== 'string')
      path.strokeLineCap = 'round';
    if (typeof path.strokeLineJoin !== 'string')
      path.strokeLineJoin = 'round';
  }

  console.log(newState)
  return newState;
}
