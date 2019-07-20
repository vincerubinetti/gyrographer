import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import { Button } from '../components/button.js';
import { ReactComponent as Redo } from '../images/redo.svg';

export class RedoButton extends Component {
  render() {
    return (
      <Button
        className="top_button"
        onClick={() => {
          if (this.props.future.length)
            this.props.dispatch(ActionCreators.redo());
        }}
        color={this.props.future.length ? 'white' : 'gray'}
        tooltip="Redo"
      >
        <Redo />
      </Button>
    );
  }
}
RedoButton = connect((state) => ({
  future: state.future
}))(RedoButton);

