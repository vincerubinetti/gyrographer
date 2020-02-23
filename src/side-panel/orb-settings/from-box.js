import React from 'react';
import { connect } from 'react-redux';

import { NumberBox } from '../../components/number-box';
import { setFrom } from '../../actions/orbs';

let FromBox = ({ selected, value, setFrom }) => (
  <NumberBox
    value={value}
    onNudge={(value) => {
      setFrom({ id: selected, value, noUndo: true });
    }}
    onChange={(value) => {
      setFrom({ id: selected, value });
    }}
  />
);

const mapStateFromProps = (state) => ({
  selected: state.selected,
  value: state.orbs[state.selected]?.from
});

const mapDispatchFromProps = (dispatch) => ({
  setFrom: (...args) => dispatch(setFrom(...args))
});

FromBox = connect(mapStateFromProps, mapDispatchFromProps)(FromBox);

export { FromBox };
