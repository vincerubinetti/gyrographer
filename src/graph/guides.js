import React from 'react';
import { connect } from 'react-redux';

import { Grid } from './grid';
import { Axes } from './axes';
import { Bounds } from './bounds';

let Guides = ({ guideColor, showGrid, showAxes, showBounds }) => {
  return (
    <g id="guides" opacity={guideColor.a}>
      <g id="grid" opacity={showGrid ? 1 : 0}>
        <Grid />
      </g>
      <g id="axes" opacity={showAxes ? 1 : 0}>
        <Axes />
      </g>
      <g id="bounds" opacity={showBounds ? 1 : 0}>
        <Bounds />
      </g>
    </g>
  );
};

const mapStateToProps = (state) => ({
  guideColor: state.guideColor,
  showBounds: state.showBounds,
  showAxes: state.showAxes,
  showGrid: state.showGrid
});

Guides = connect(mapStateToProps)(Guides);

export default Guides;
