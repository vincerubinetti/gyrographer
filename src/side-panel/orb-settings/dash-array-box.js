import React from 'react';
import { connect } from 'react-redux';

import { DashBox } from '../../components/dash-box';
import { setDashArray } from '../../actions/orbs';

let DashArrayBox = ({ selected, value, setDashArray }) => (
  <DashBox
    value={value}
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
