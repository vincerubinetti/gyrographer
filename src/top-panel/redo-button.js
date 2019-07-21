import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Redo } from '../images/redo.svg';
import { redo } from '../state/undoer.js';

export class RedoButton extends Component {
  render() {
    let tooltip = 'Redo';
    if (
      this.props.future &&
      this.props.future[0] &&
      this.props.future[0].actionDescription
    )
      tooltip += ' ' + this.props.future[0].actionDescription;

    return (
      <Button
        className="top_button"
        onClick={() => {
          if (this.props.future.length)
            this.props.dispatch(redo());
        }}
        color={this.props.future.length ? 'white' : 'gray'}
        tooltip={tooltip}
      >
        <Redo />
      </Button>
    );
  }
}
RedoButton = connect((state) => ({
  future: state.future
}))(RedoButton);
