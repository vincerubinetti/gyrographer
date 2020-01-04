import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { usePanZoom } from '../util/hooks.js';

import { TimeContext } from '../time.js';
import { Grid } from './grid.js';
import { Axes } from './axes.js';
import { Bounds } from './bounds.js';
import { Path } from './path.js';
import { Stick } from './stick.js';
import { Wheel } from './wheel.js';

import './index.css';

let Graph = ({
  backgroundColor,
  guideColor,
  showBounds,
  showAxes,
  showGrid,
  showPaths,
  showSticks,
  showWheels
}) => {
  const [svg, view] = usePanZoom();
  const context = useContext(TimeContext);

  const paths = context.orbTree.map((orb, index) => (
    <Path key={index} orb={orb} />
  ));

  const sticks = context.orbTree.map((orb, index) => (
    <Stick key={index} orb={orb} />
  ));

  const wheels = context.orbTree.map((orb, index) => (
    <Wheel key={index} orb={orb} alpha={guideColor.a / 4} />
  ));

  return (
    <svg ref={svg} id='graph' style={{ background: backgroundColor.rgba }}>
      <g id='view' ref={view}>
        <g id='board' opacity={guideColor.a} stroke={guideColor.rgb}>
          <g id='grid' opacity={showGrid ? 1 : 0}>
            <Grid />
          </g>
          <g id='axes' opacity={showAxes ? 1 : 0}>
            <Axes />
          </g>
          <g id='bounds' opacity={showBounds ? 1 : 0}>
            <Bounds />
          </g>
        </g>
        <g id='paths' opacity={showPaths ? 1 : 0}>
          {paths}
        </g>
        <g id='wheels' opacity={showWheels ? 1 : 0} fill={guideColor.rgb}>
          {wheels}
        </g>
        <g
          id='sticks'
          opacity={showSticks ? guideColor.a : 0}
          fill={guideColor.rgb}
          stroke={guideColor.rgb}
        >
          {sticks}
        </g>
      </g>
    </svg>
  );
};

const mapStateToProps = (state) => ({
  backgroundColor: state.backgroundColor,
  guideColor: state.guideColor,
  showBounds: state.showBounds,
  showAxes: state.showAxes,
  showGrid: state.showGrid,
  showPaths: state.showPaths,
  showSticks: state.showSticks,
  showWheels: state.showWheels
});

Graph = connect(mapStateToProps)(Graph);

export default Graph;
