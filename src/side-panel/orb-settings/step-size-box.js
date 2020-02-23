import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setStepSize } from '../../actions/orbs';

let StepSizeBox = ({ selected, value, setStepSize }) => (
  <NumberBox
    value={value}
    step={0.1}
    precision={2}
    onNudge={(value) => {
      setStepSize({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setStepSize({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.stepSize
});

const mapDispatchFromProps = (dispatch) => ({
  setStepSize: (...args) => dispatch(setStepSize(...args))
});

StepSizeBox = connect(mapStateFromProps, mapDispatchFromProps)(StepSizeBox);

export { StepSizeBox };
