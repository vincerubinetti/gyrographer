export function toggleBounds() {
  return {
    type: 'toggle_bounds'
  };
}

export function toggleAxes() {
  return {
    type: 'toggle_axes'
  };
}

export function toggleGrid() {
  return {
    type: 'toggle_grid'
  };
}

export function toggleLoop() {
  return {
    type: 'toggle_loop'
  };
}

export function setSpeed(speed) {
  return {
    type: 'set_speed',
    payload: {
      speed: speed
    }
  };
}
