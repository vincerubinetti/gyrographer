import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setOffset } from '../../actions/orbs';

let OffsetBox = ({ selected, value, setOffset }) => (
  <NumberBox
    value={value}
    onNudge={(value) => {
      setOffset({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setOffset({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.offset
});

const mapDispatchFromProps = (dispatch) => ({
  setOffset: (...args) => dispatch(setOffset(...args))
});

OffsetBox = connect(mapStateFromProps, mapDispatchFromProps)(OffsetBox);

export { OffsetBox };
