import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setTo } from '../../actions/orbs';

let ToBox = ({ selected, value, setTo }) => (
  <NumberBox
    value={value}
    onNudge={(value) => {
      setTo({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setTo({ id: selected, value });
    }}
  />
);

const mapStateToProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.to
});

const mapDispatchToProps = (dispatch) => ({
  setTo: (...args) => dispatch(setTo(...args))
});

ToBox = connect(mapStateToProps, mapDispatchToProps)(ToBox);

export { ToBox };
