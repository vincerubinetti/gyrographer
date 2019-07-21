import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Undo } from '../images/undo.svg';
import { undo } from '../state/undoer.js';

export class UndoButton extends Component {
  render() {
    let tooltip = 'Undo';
    if (this.props.actionDescription)
      tooltip += ' ' + this.props.actionDescription;

    console.log(tooltip);
    return (
      <Button
        className="top_button"
        onClick={() => {
          if (this.props.past.length)
            this.props.dispatch(undo());
        }}
        color={this.props.past.length ? 'white' : 'gray'}
        tooltip={tooltip}
      >
        <Undo />
      </Button>
    );
  }
}
UndoButton = connect((state) => ({
  actionDescription: state.actionDescription,
  past: state.past
}))(UndoButton);
