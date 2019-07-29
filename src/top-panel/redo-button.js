import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Redo } from '../images/redo.svg';
import { redo } from '../state/undoer.js';

export class RedoButton extends Component {
  render() {
    let tooltip = [
      this.props.actionDescription,
      ...this.props.future.slice(0, 9).map((entry) => entry.actionDescription)
    ]
      .filter((entry) => (entry ? true : false))
      .map((entry, index) => (
        <div key={index} className='undo_redo_menu_item'>
          Redo {entry}
        </div>
      ));

    if (!tooltip.length)
      tooltip = 'Redo';

    return (
      <Button
        className='top_button'
        onClick={() => {
          if (this.props.future.length)
            this.props.dispatch(redo());
        }}
        color={this.props.future.length ? 'white' : 'gray'}
        tooltip={<>{tooltip}</>}
      >
        <Redo />
      </Button>
    );
  }
}
RedoButton = connect((state) => ({
  future: state.future
}))(RedoButton);
