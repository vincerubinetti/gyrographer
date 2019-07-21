import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Grid } from '../images/grid.svg';
import { toggleGrid } from '../state/actions.js';

export class GridButton extends Component {
  render() {
    return (
      <Button
        className="top_button"
        onClick={() => this.props.dispatch(toggleGrid())}
        color={this.props.showGrid ? 'blue' : 'gray'}
        tooltip={this.props.showGrid ? "Don't show grid" : 'Show grid'}
      >
        <Grid />
      </Button>
    );
  }
}
GridButton.contextType = AppContext;
GridButton = connect((state) => ({
  showGrid: state.showGrid
}))(GridButton);
