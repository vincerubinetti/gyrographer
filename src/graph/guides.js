import React from 'react';
import { connect } from 'react-redux';

import { Grid } from './grid';
import { Axes } from './axes';
import { Bounds } from './bounds';

let Guides = ({ guides, grid, axes, bounds }) =>
  <g id='guides' opacity={guides.a}>
    <g id='grid' opacity={grid ? 1 : 0}>
      <Grid />
    </g>
    <g id='axes' opacity={axes ? 1 : 0}>
      <Axes />
    </g>
    <g id='bounds' opacity={bounds ? 1 : 0}>
      <Bounds />
    </g>
  </g>;

const mapStateToProps = (state) => ({
  guides: state.guides,
  bounds: state.bounds,
  axes: state.axes,
  grid: state.grid
});

Guides = connect(mapStateToProps)(Guides);

export { Guides };
