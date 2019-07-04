import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { incrementTime } from './actions.js';
import { View } from './view.js';
import { Grid } from './grid.js';
import { Axes } from './axes.js';
import { Bounds } from './bounds.js';
import { Path } from './path.js';
import './graph.css';

const minZoom = 0.01;
const maxZoom = 100;

export class Graph extends Component {
  componentDidMount() {
    this.createGraph();
    // window.setInterval(() => {
    //   this.props.dispatch(incrementTime());
    // }, 1000 / 60);
  }

  onViewZoom = () => {
    d3.select('#view').attr('transform', d3.event.transform);
  };

  resetView = () => {
    const container = d3
      .select('#graph')
      .node()
      .getBoundingClientRect();

    const scale = 1;
    const translateX = container.width / 2;
    const translateY = container.height / 2;

    // perform view transform
    d3.select('#graph').call(
      this.state.viewZoomHandler.transform,
      d3.zoomIdentity.translate(translateX, translateY).scale(scale)
    );
  };

  fitView = () => {
    const contents = d3
      .select('#view')
      .node()
      .getBBox();
    const container = d3
      .select('#graph')
      .node()
      .getBoundingClientRect();
    const padding = 0;

    if (contents.width === 0 || contents.height === 0)
      return;

    container.width -= 2;
    container.height -= 2;

    contents.midX = contents.x + contents.width / 2;
    contents.midY = contents.y + contents.height / 2;

    const scale =
      1 /
      Math.max(
        contents.width / (container.width - padding),
        contents.height / (container.height - padding)
      );
    const translateX = container.width / 2 - scale * contents.midX;
    const translateY = container.height / 2 - scale * contents.midY;

    d3.select('#graph').call(
      this.state.viewZoomHandler.transform,
      d3.zoomIdentity.translate(translateX, translateY).scale(scale)
    );
  };

  createGraph = () => {
    const svg = d3.select('#graph');

    const viewZoomHandler = d3
      .zoom()
      .scaleExtent([minZoom, maxZoom])
      .on('zoom', this.onViewZoom);
    svg.call(viewZoomHandler);

    svg.on('dblclick.zoom', null);
    svg.on('dblclick', this.fitView);

    this.setState(
      {
        viewZoomHandler: viewZoomHandler
      },
      this.fitView
    );
  };

  render() {
    let viewBox;
    const render = false;
    if (render) {
      viewBox = [
        this.props.left,
        this.props.top,
        this.props.right - this.props.left,
        this.props.bottom - this.props.top
      ].join(' ');
    }

    const paths = Object.keys(this.props.paths).map((id, index) => (
      <Path key={index} id={id} />
    ));

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        id='graph'
        viewBox={viewBox}
        style={{ background: this.props.backgroundColor }}
      >
        <View>
          <g id='board'>
            {this.props.showGrid && <Grid />}
            {this.props.showAxes && <Axes />}
            {this.props.showBounds && <Bounds />}
          </g>
          {paths}
        </View>
      </svg>
    );
  }
}
Graph = connect((state) => ({
  left: state.graph.left,
  top: state.graph.top,
  right: state.graph.right,
  bottom: state.graph.bottom,
  backgroundColor: state.graph.backgroundColor,
  showBounds: state.graph.showBounds,
  showAxes: state.graph.showAxes,
  showGrid: state.graph.showGrid,
  paths: state.paths
}))(Graph);
