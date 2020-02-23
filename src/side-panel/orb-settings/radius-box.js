import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setRadius } from '../../actions/orbs';

let RadiusBox = ({ selected, value, setRadius }) => (
  <NumberBox
    value={value}
    step={5}
    onNudge={(value) => {
      setRadius({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setRadius({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.radius
});

const mapDispatchFromProps = (dispatch) => ({
  setRadius: (...args) => dispatch(setRadius(...args))
});

RadiusBox = connect(mapStateFromProps, mapDispatchFromProps)(RadiusBox);

export { RadiusBox };
