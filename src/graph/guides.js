import React from 'react';
import { connect } from 'react-redux';

import { Grid } from './grid';
import { Axes } from './axes';
import { Bounds } from './bounds';

let Guides = ({ guides }) =>
  <g id='guides' opacity={guides.a}>
    <Grid />
    <Axes />
    <Bounds />
  </g>;

const mapStateToProps = (state) => ({
  guides: state.guides
});

Guides = connect(mapStateToProps)(Guides);

export { Guides };
