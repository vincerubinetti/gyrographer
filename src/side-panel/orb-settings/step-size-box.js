import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setStep } from '../../actions/orbs';

let StepBox = ({ selected, value, setStep }) => (
  <NumberBox
    value={value}
    step={0.1}
    precision={2}
    onNudge={(value) => {
      setStep({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setStep({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.step
});

const mapDispatchFromProps = (dispatch) => ({
  setStep: (...args) => dispatch(setStep(...args))
});

StepBox = connect(mapStateFromProps, mapDispatchFromProps)(StepBox);

export { StepBox };
