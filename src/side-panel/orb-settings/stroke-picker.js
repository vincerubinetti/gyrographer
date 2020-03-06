import React from 'react';
import { connect } from 'react-redux';

import { ColorPicker } from '../../components/color-picker';
import { setStroke } from '../../actions/orbs';

let StrokePicker = ({ selected, value, setStroke }) => (
  <ColorPicker
    value={value}
    onNudge={(value) => {
      setStroke({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setStroke({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.stroke
});

const mapDispatchFromProps = (dispatch) => ({
  setStroke: (...args) => dispatch(setStroke(...args))
});

StrokePicker = connect(mapStateFromProps, mapDispatchFromProps)(StrokePicker);

export { StrokePicker };
