import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setDashOffset } from '../../actions/orbs';

let DashOffsetBox = ({ selected, value, setDashOffset }) => (
  <NumberBox
    value={value}
    onNudge={(value) => {
      setDashOffset({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setDashOffset({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.dashOffset
});

const mapDispatchFromProps = (dispatch) => ({
  setDashOffset: (...args) => dispatch(setDashOffset(...args))
});

DashOffsetBox = connect(mapStateFromProps, mapDispatchFromProps)(DashOffsetBox);

export { DashOffsetBox };
