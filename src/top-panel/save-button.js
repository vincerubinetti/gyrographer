import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { isObject } from '../util/types';
import { ReactComponent as SaveIcon } from '../images/save.svg';

import projectSpec from '../project.spec.json';
import orbSpec from '../orb.spec.json';

let SaveButton = ({ state }) =>
  <Button className='' onClick={() => saveState(state)} tooltip='Save project'>
    <SaveIcon />
  </Button>;
const mapStateToProps = (state) => ({
  state
});

SaveButton = connect(mapStateToProps)(SaveButton);

export { SaveButton };

const saveState = (state) => {
  const { past, future, actionDescription, ...rest } = state;
  const order = [...Object.keys(projectSpec), ...Object.keys(orbSpec)];
  const cleanedState = cleanState(rest, order);
  const data = JSON.stringify(cleanedState, null, 2);

  const link = window.document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([data], { type: 'text/json' }));
  link.download = 'project.gyr';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const cleanState = (state, order) => {
  const result = {};
  const sortFunc = (a, b) => order.indexOf(a[0]) > order.indexOf(b[0]);
  const entries = Object.entries(state).sort(sortFunc);
  for (const [key, value] of entries) {
    if (isObject(value))
      result[key] = value.rgba || cleanState(value, order);
    else
      result[key] = value;
  }
  return result;
};
