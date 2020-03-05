import React from 'react';
import { connect } from 'react-redux';

import { ColorPicker } from '../../components/color-picker';
import { setFill } from '../../actions/orbs';

let FillPicker = ({ selected, value, setFill }) => (
  <ColorPicker
    value={value}
    onNudge={(value) => {
      setFill({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setFill({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.fill
});

const mapDispatchFromProps = (dispatch) => ({
  setFill: (...args) => dispatch(setFill(...args))
});

FillPicker = connect(mapStateFromProps, mapDispatchFromProps)(FillPicker);

export { FillPicker };
