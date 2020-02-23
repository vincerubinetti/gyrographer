import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setSpin } from '../../actions/orbs';

let SpinBox = ({ selected, value, setSpin }) => (
  <NumberBox
    value={value}
    step={0.1}
    onNudge={(value) => {
      setSpin({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setSpin({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.spin
});

const mapDispatchFromProps = (dispatch) => ({
  setSpin: (...args) => dispatch(setSpin(...args))
});

SpinBox = connect(mapStateFromProps, mapDispatchFromProps)(SpinBox);

export { SpinBox };
