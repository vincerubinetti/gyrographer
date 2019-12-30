import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { usePanZoom } from '../util/hooks.js';

import { TimeContext } from '../time.js';
import { Grid } from './grid.js';
import { Axes } from './axes.js';
import { Bounds } from './bounds.js';
import { Path } from './path.js';
import { Arrow } from './arrow.js';
import { Wheel } from './wheel.js';
import { OrbHandle } from './orb-handle.js';
import { Color } from '../util/color';

import './index.css';

let Graph = ({
  edit,
  left,
  top,
  right,
  bottom,
  backgroundColor,
  guideColor,
  showBounds,
  showAxes,
  showGrid
}) => {
  const [svg, view] = usePanZoom();
  const context = useContext(TimeContext);

  const paths = context.orbTree
    .filter((orb) => orb.showPath)
    .map((orb, index) => <Path key={index} orb={orb} />);

  const arrows = context.orbTree
    .filter((orb) => orb.showArrow)
    .map((orb, index) => <Arrow key={index} orb={orb} />);

  const wheels = context.orbTree
    .filter((orb) => orb.showWheel)
    .map((orb, index) => <Wheel key={index} orb={orb} />);

  const orbHandles = context.orbTree.map((orb, index) => (
    <OrbHandle key={index} orb={orb} />
  ));

  return (
    <svg ref={svg} id="graph" style={{ background: backgroundColor }}>
      <g id="view" ref={view}>
        <g
          id="board"
          data-active={!edit}
          opacity={new Color(guideColor).a}
          stroke={new Color(guideColor).hex(true)}
        >
          {showGrid && <Grid />}
          {showAxes && <Axes />}
          {showBounds && <Bounds />}
        </g>
        {wheels}
        {arrows}
        {paths}
        {edit && orbHandles}
      </g>
    </svg>
  );
};

const mapStateToProps = (state) => ({
  edit: state.edit,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  backgroundColor: state.backgroundColor,
  guideColor: state.guideColor,
  showBounds: state.showBounds,
  showAxes: state.showAxes,
  showGrid: state.showGrid
});

Graph = connect(mapStateToProps)(Graph);

export default Graph;
