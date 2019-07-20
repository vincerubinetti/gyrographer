export function rootReducer(prevState = {}, action) {
  const newState = { ...prevState };

  newState.orbs = {};
  newState.orbs['1'] = {
    spin: 3,
    radius: 500,
    showPath: false,
    showArrow: true,
    showWheel: true
  };
  newState.orbs['2'] = {
    spin: 10,
    radius: 200,
    parentId: '1',
    showPath: false,
    showArrow: true,
    showWheel: true
  };
  newState.orbs['3'] = {
    spin: -1,
    radius: 50,
    parentId: '2',
    stepSize: 0.1,
    showArrow: true,
    showWheel: true
  };

  switch (action.type) {
    case 'toggle_loop':
      newState.loop = !newState.loop;
      break;

    case 'toggle_bounds':
      newState.showBounds = !newState.showBounds;
      break;

    case 'toggle_axes':
      newState.showAxes = !newState.showAxes;
      break;

    case 'toggle_grid':
      newState.showGrid = !newState.showGrid;
      break;

    case 'set_speed':
      newState.speed = action.payload.speed;
      break;

    default:
      break;
  }

  // //////////////////////////////////////////////////
  // set defaults
  // //////////////////////////////////////////////////

  // graph properties
  if (typeof newState.left !== 'number')
    newState.left = -1000;
  if (typeof newState.top !== 'number')
    newState.top = -1000;
  if (typeof newState.right !== 'number')
    newState.right = 1000;
  if (typeof newState.bottom !== 'number')
    newState.bottom = 1000;
  if (typeof newState.backgroundColor !== 'string')
    newState.backgroundColor = '#202020ff';
  if (typeof newState.fps !== 'number')
    newState.fps = 60;
  if (newState.fps < 1)
    newState.fps = 1;
  if (newState.fps > 500)
    newState.fps = 500;
  if (typeof newState.length !== 'number')
    newState.length = 300;
  if (newState.length < 0.1)
    newState.length = 0.1;
  if (newState.length > 300)
    newState.length = 300;
  if (typeof newState.loop !== 'boolean')
    newState.loop = false;
  if (typeof newState.speed !== 'number')
    newState.speed = 1;
  if (typeof newState.showBounds !== 'boolean')
    newState.showBounds = true;
  if (typeof newState.showAxes !== 'boolean')
    newState.showAxes = true;
  if (typeof newState.showGrid !== 'boolean')
    newState.showGrid = true;

  // orb properties
  if (!newState.orbs)
    newState.orbs = [];
  for (const key of Object.keys(newState.orbs)) {
    const orb = newState.orbs[key];
    // under-the-hood
    if (typeof orb.parentId !== 'string')
      orb.parentId = null;

    // geometry
    if (typeof orb.showPath !== 'boolean')
      orb.showPath = true;
    if (typeof orb.showArrow !== 'boolean')
      orb.showArrow = false;
    if (typeof orb.showWheel !== 'boolean')
      orb.showWheel = false;
    if (typeof orb.from !== 'number')
      orb.from = 0;
    if (typeof orb.to !== 'number')
      orb.to = 100;
    if (typeof orb.stepSize !== 'number')
      orb.stepSize = 0.1;
    if (orb.stepSize <= 0)
      orb.stepSize = 0.1;
    if (typeof orb.radius !== 'number')
      orb.radius = 100;
    if (typeof orb.spin !== 'number')
      orb.spin = 1;
    if (typeof orb.offset !== 'number')
      orb.offset = 0;

    // styling
    if (typeof orb.fillColor !== 'string')
      orb.fillColor = 'none';
    if (typeof orb.strokeColor !== 'string')
      orb.strokeColor = '#ffffffff';
    if (typeof orb.strokeWidth !== 'number')
      orb.strokeWidth = 5;
    if (typeof orb.close !== 'boolean')
      orb.close = false;
    if (typeof orb.dashArray !== 'string')
      orb.dashArray = '0';
    if (typeof orb.dashOffset !== 'string')
      orb.dashOffset = '0';
    if (typeof orb.strokeLineCap !== 'string')
      orb.strokeLineCap = 'round';
    if (typeof orb.strokeLineJoin !== 'string')
      orb.strokeLineJoin = 'round';
    if (typeof orb.order !== 'number')
      orb.order = 0;
  }

  return newState;
}
