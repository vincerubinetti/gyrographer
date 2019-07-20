import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Axes } from '../images/axes.svg';
import { toggleAxes } from './actions.js';

export class AxesButton extends Component {
  render() {
    return (
      <Button
        className="top_button"
        onClick={() => this.props.dispatch(toggleAxes())}
        color={this.props.showAxes ? 'blue' : 'gray'}
        tooltip={this.props.showAxes ? "Don't show axes" : 'Show axes'}
      >
        <Axes />
      </Button>
    );
  }
}
AxesButton.contextType = AppContext;
AxesButton = connect((state) => ({
  showAxes: state.present.showAxes
}))(AxesButton);
