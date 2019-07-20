import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import { Button } from '../components/button.js';
import { ReactComponent as Undo } from '../images/undo.svg';

export class UndoButton extends Component {
  render() {
    return (
      <Button
        className="top_button"
        onClick={() => {
          if (this.props.past.length)
            this.props.dispatch(ActionCreators.undo());
        }}
        color={this.props.past.length ? 'white' : 'gray'}
        tooltip="Undo"
      >
        <Undo />
      </Button>
    );
  }
}
UndoButton = connect((state) => ({
  past: state.past
}))(UndoButton);

