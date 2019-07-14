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
