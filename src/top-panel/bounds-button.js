import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Bounds } from '../images/bounds.svg';
import { toggleBounds } from './actions.js';

export class BoundsButton extends Component {
  render() {
    return (
      <Button
        className="time_button"
        onClick={() => this.props.dispatch(toggleBounds())}
        color={this.props.showBounds ? 'blue' : 'gray'}
        tooltip={this.props.showBounds ? "Don't show bounds" : 'Show bounds'}
      >
        <Bounds />
      </Button>
    );
  }
}
BoundsButton.contextType = AppContext;
BoundsButton = connect((state) => ({
  showBounds: state.showBounds
}))(BoundsButton);
