import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Background } from './background.js';
import { Grid } from './grid.js';

export class Board extends Component {
  render() {
    return (
      <g id='board'>
        <Background />
        {this.props.showGrid && <Grid />}
      </g>
    );
  }
}
Board = connect((state) => ({
  showGrid: state.board.showGrid
}))(Board);
