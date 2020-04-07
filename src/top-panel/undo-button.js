import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as UndoIcon } from '../images/undo.svg';
import { undo } from '../actions/undoer';

let UndoButton = ({ past, actionDescription, undo }) => {
  let tooltip = [
    actionDescription,
    ...past
      .slice(0, 9)
      .map((entry) => entry.actionDescription)
      .filter((entry) => entry)
  ].map((entry, index) =>
    <div key={index} className='undo_redo_menu_item'>
      {entry}
    </div>);

  if (!tooltip.length)
    tooltip = 'Undo';

  return (
    <Button
      onClick={() => {
        if (past.length)
          undo();
      }}
      color={past.length ? 'white' : 'gray'}
      tooltip={<>{tooltip}</>}
    >
      <UndoIcon />
    </Button>
  );
};

const mapStateToProps = (state) => ({
  past: state.past || [],
  actionDescription: state.actionDescription
});

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(undo())
});

UndoButton = connect(mapStateToProps, mapDispatchToProps)(UndoButton);

export { UndoButton };
