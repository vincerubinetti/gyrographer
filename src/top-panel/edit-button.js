import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Edit } from '../images/edit.svg';
import { toggleEdit } from '../actions/actions.js';

let EditButton = ({ edit, toggleEdit }) => (
  <Button
    className=""
    onClick={toggleEdit}
    color={edit ? 'blue' : 'gray'}
    tooltip={edit ? 'Turn off edit mode' : 'Turn on edit mode'}
    tooltipHorizontalAlign="left"
    tooltipVerticalAlign="bottom"
  >
    <Edit />
  </Button>
);

const mapStateToProps = (state) => ({
  edit: state.edit
});

const mapDispatchToProps = (dispatch) => ({
  toggleEdit: () => dispatch(toggleEdit())
});

EditButton = connect(mapStateToProps, mapDispatchToProps)(EditButton);

export { EditButton };
