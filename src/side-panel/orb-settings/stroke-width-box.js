import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setStrokeWidth } from '../../actions/orbs';

let StrokeWidthBox = ({ selected, value, setStrokeWidth }) => (
  <NumberBox
    value={value}
    step={0.1}
    onNudge={(value) => {
      setStrokeWidth({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setStrokeWidth({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.strokeWidth
});

const mapDispatchFromProps = (dispatch) => ({
  setStrokeWidth: (...args) => dispatch(setStrokeWidth(...args))
});

StrokeWidthBox = connect(
  mapStateFromProps,
  mapDispatchFromProps
)(StrokeWidthBox);

export { StrokeWidthBox };
