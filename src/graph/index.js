import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { setSelected } from '../actions/project';
import { usePanZoom } from '../util/hooks';
import { TimeContext } from '../time';
import { Grid } from './grid';
import { Axes } from './axes';
import { Bounds } from './bounds';
import { Path } from './path';
import { Stick } from './stick';
import { Wheel } from './wheel';

import './index.css';

let Graph = ({
  backgroundColor,
  guideColor,
  showBounds,
  showAxes,
  showGrid,
  showPaths,
  showSticks,
  showWheels,
  select
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
    <Wheel key={index} orb={orb} />
  ));

  return (
    <svg
      ref={svg}
      id='graph'
      style={{ background: backgroundColor.rgba }}
      onClick={() => select()}
    >
      <g id='view' ref={view}>
        <g id='guides' opacity={guideColor.a}>
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
        <g id='content'>
          <g id='wheels' opacity={showWheels ? 1 : 0}>
            {wheels}
          </g>
          <g id='sticks' opacity={showSticks ? 1 : 0}>
            {sticks}
          </g>
          <g id='paths' opacity={showPaths ? 1 : 0}>
            {paths}
          </g>
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
  showWheels: state.showWheels,
  selected: state.selected
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Graph = connect(mapStateToProps, mapDispatchToProps)(Graph);

export default Graph;
