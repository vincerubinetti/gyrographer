import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as Edit } from '../images/edit.svg';
import { toggleEdit } from '../state/actions.js';

export class EditButton extends Component {
  render() {
    return (
      <Button
        className="top_button"
        onClick={() => this.props.dispatch(toggleEdit())}
        color={this.props.edit ? 'blue' : 'gray'}
        tooltip={
          this.props.edit ? 'Turn off edit mode' : 'Turn on edit mode'
        }
      >
        <Edit />
      </Button>
    );
  }
}
EditButton.contextType = AppContext;
EditButton = connect((state) => ({
  edit: state.edit
}))(EditButton);
