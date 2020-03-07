import React from 'react';
import { connect } from 'react-redux';

import { TextBox } from '../../components/text-box';
import { setDashArray } from '../../actions/orbs';

let DashArrayBox = ({ selected, value, setDashArray }) => (
  <TextBox
    value={value}
    onNudge={(value) => {
      setDashArray({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setDashArray({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.dashArray
});

const mapDispatchFromProps = (dispatch) => ({
  setDashArray: (...args) => dispatch(setDashArray(...args))
});

DashArrayBox = connect(mapStateFromProps, mapDispatchFromProps)(DashArrayBox);

export { DashArrayBox };
