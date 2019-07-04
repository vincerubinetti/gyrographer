export function Reducer(prevState = {}, action) {
  const newState = { ...prevState };

  newState.paths = {};
  newState.paths['1'] = {
    spin: 4,
    radius: 500,
    showPath: false
  };
  newState.paths['2'] = {
    spin: 33,
    radius: 200,
    parent: '1',
    showPath: false
  };
  newState.paths['3'] = {
    spin: 55,
    radius: 50,
    parent: '2'
  };

  // //////////////////////////////////////////////////
  // set defaults
  // //////////////////////////////////////////////////

  // global properties
  if (typeof newState.time !== 'number')
    newState.time = 0;

  // graph properties
  if (!newState.graph)
    newState.graph = {};
  if (typeof newState.graph.left !== 'number')
    newState.graph.left = -1000;
  if (typeof newState.graph.top !== 'number')
    newState.graph.top = -1000;
  if (typeof newState.graph.right !== 'number')
    newState.graph.right = 1000;
  if (typeof newState.graph.bottom !== 'number')
    newState.graph.bottom = 1000;
  if (typeof newState.graph.backgroundColor !== 'string')
    newState.graph.backgroundColor = '#202020ff';
  if (typeof newState.graph.showBounds !== 'boolean')
    newState.graph.showBounds = true;
  if (typeof newState.graph.showAxes !== 'boolean')
    newState.graph.showAxes = true;
  if (typeof newState.graph.showGrid !== 'boolean')
    newState.graph.showGrid = true;

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
    if (typeof path.showHelper !== 'boolean')
      path.showHelper = true;
    if (typeof path.from !== 'number')
      path.from = 0;
    if (typeof path.to !== 'number')
      path.to = 70;
    if (typeof path.step !== 'number')
      path.step = 0.01;
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
      path.strokeWidth = 5;
    if (typeof path.close !== 'boolean')
      path.close = false;
    if (typeof path.dashArray !== 'string')
      path.dashArray = '0';
    if (typeof path.dashOffset !== 'string')
      path.dashOffset = '0';
    if (typeof path.strokeLineCap !== 'string')
      path.strokeLineCap = 'round';
    if (typeof path.strokeLineJoin !== 'string')
      path.strokeLineJoin = 'round';
  }

  switch (action.type) {
    case 'increment_time':
      newState.time = prevState.time += 1;
      break;

    default:
      break;
  }

  return newState;
}
