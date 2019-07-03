import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { View } from './view.js';
import { Background } from './background.js';
import { Grid } from './grid.js';
import './board.css';

const minZoom = 0.01;
const maxZoom = 100;

export class Board extends Component {
  componentDidMount() {
    this.createBoard();
  }

  onViewZoom = () => {
    d3.select('#view').attr('transform', d3.event.transform);
  };

  resetView = () => {
    const container = d3
      .select('#board')
      .node()
      .getBoundingClientRect();

    const scale = 1;
    const translateX = container.width / 2;
    const translateY = container.height / 2;

    // perform view transform
    d3.select('#board').call(
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
      .select('#board')
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

    d3.select('#board').call(
      this.state.viewZoomHandler.transform,
      d3.zoomIdentity.translate(translateX, translateY).scale(scale)
    );
  };

  createBoard = () => {
    const svg = d3.select('#board');

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
    return (
      <svg id='board' viewBox={viewBox}>
        <View>
          <Background />
          {this.props.showGrid && <Grid />}
        </View>
      </svg>
    );
  }
}
Board = connect((state) => ({
  left: state.board.left,
  top: state.board.top,
  right: state.board.right,
  bottom: state.board.bottom,
  showGrid: state.board.showGrid
}))(Board);
