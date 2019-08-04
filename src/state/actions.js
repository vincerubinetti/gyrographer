export function toggleEdit() {
  return {
    type: 'toggle_edit',
    payload: {
      description: 'toggle edit mode'
    }
  };
}

export function toggleBounds() {
  return {
    type: 'toggle_bounds',
    payload: {
      description: 'toggle show bounds'
    }
  };
}

export function toggleAxes() {
  return {
    type: 'toggle_axes',
    payload: {
      description: 'toggle show axes'
    }
  };
}

export function toggleGrid() {
  return {
    type: 'toggle_grid',
    payload: {
      description: 'toggle show grid'
    }
  };
}

export function toggleLoop() {
  return {
    type: 'toggle_loop',
    payload: {
      description: 'toggle loop'
    }
  };
}

export function setSpeed(speed) {
  return {
    type: 'set_speed',
    payload: {
      speed: speed,
      description: 'set preview speed'
    }
  };
}
