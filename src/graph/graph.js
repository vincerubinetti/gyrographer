import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { AppContext } from "../app-context.js";
import { Grid } from "./grid.js";
import { Axes } from "./axes.js";
import { Bounds } from "./bounds.js";
import { Path } from "./path.js";
import { Arrow } from "./arrow.js";
import { Wheel } from "./wheel.js";
import { OrbHandle } from "./orb-handle.js";
import { Color } from "../util/color";
import "./graph.css";

const minZoom = 0.01;
const maxZoom = 100;

export class Graph extends Component {
  componentDidMount() {
    this.createGraph();
  }

  createGraph = () => {
  }

  render() {
    let viewBox;

    const paths = this.context.orbTree
      .filter(orb => orb.showPath)
      .map((orb, index) => <Path key={index} orb={orb} />);

    const arrows = this.context.orbTree
      .filter(orb => orb.showArrow)
      .map((orb, index) => <Arrow key={index} orb={orb} />);

    const wheels = this.context.orbTree
      .filter(orb => orb.showWheel)
      .map((orb, index) => <Wheel key={index} orb={orb} />);

    const orbHandles = this.context.orbTree.map((orb, index) => (
      <OrbHandle key={index} orb={orb} />
    ));

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="graph"
        viewBox={viewBox}
        style={{ background: this.props.backgroundColor }}
      >
        <g id="view" transform="translate(0,200)">
          <g
            id="board"
            data-active={!this.props.edit}
            opacity={new Color(this.props.guideColor).a}
            stroke={new Color(this.props.guideColor).hex(true)}
          >
            {this.props.showGrid && <Grid />}
            {this.props.showAxes && <Axes />}
            {this.props.showBounds && <Bounds />}
          </g>
          {wheels}
          {arrows}
          {paths}
          {orbHandles}
        </g>
      </svg>
    );
  }
}
Graph.contextType = AppContext;
Graph = connect(state => ({
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
}))(Graph);
