import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Undo } from '../images/undo.svg';
import { undo } from '../state/undoer.js';

export class UndoButton extends Component {
  render() {
    let tooltip = [
      this.props.actionDescription,
      ...this.props.past.slice(0, 9).map((entry) => entry.actionDescription)
    ]
      .filter((entry) => (entry ? true : false))
      .map((entry, index) => (
        <div key={index} className='undo_redo_menu_item'>
          Undo {entry}
        </div>
      ));

    if (!tooltip.length)
      tooltip = 'Undo';

    return (
      <Button
        className='top_button'
        onClick={() => {
          if (this.props.past.length)
            this.props.dispatch(undo());
        }}
        color={this.props.past.length ? 'white' : 'gray'}
        tooltip={<>{tooltip}</>}
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
