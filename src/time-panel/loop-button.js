import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Loop } from '../images/loop.svg';
import { toggleLoop } from '../state/actions.js';

export class LoopButton extends Component {
  render() {
    return (
      <Button
        className="time_button"
        onClick={() => this.props.dispatch(toggleLoop())}
        color={this.props.loop ? 'blue' : 'gray'}
        tooltip={this.props.loop ? "Don't loop" : 'Loop'}
      >
        <Loop />
      </Button>
    );
  }
}
LoopButton.contextType = AppContext;
LoopButton = connect((state) => ({
  loop: state.loop
}))(LoopButton);
