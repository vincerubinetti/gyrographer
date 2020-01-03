import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button.js';
import { ReactComponent as Undo } from '../images/undo.svg';
import { undo } from '../actions/undoer.js';

let UndoButton = ({ past, actionDescription, undo }) => {
  let tooltip = [
    actionDescription,
    ...past.slice(0, 9).map((entry) => entry.actionDescription)
  ]
    .filter((entry) => (entry ? true : false))
    .map((entry, index) => (
      <div key={index} className="undo_redo_menu_item">
        Undo {entry}
      </div>
    ));

  if (!tooltip.length)
    tooltip = 'Undo';

  return (
    <Button
      className=""
      onClick={() => {
        if (past.length)
          undo();
      }}
      color={past.length ? 'white' : 'gray'}
      tooltip={<>{tooltip}</>}
      tooltipVerticalAlign="bottom"
    >
      <Undo />
    </Button>
  );
};

const mapStateToProps = (state) => ({
  past: state.past,
  actionDescription: state.actionDescription
});

const mapDispatchToProps = (dispatch) => ({
  undo: () => dispatch(undo())
});

UndoButton = connect(mapStateToProps, mapDispatchToProps)(UndoButton);

export { UndoButton };
