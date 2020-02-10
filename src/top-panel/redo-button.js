import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as Redo } from '../images/redo.svg';
import { redo } from '../actions/undoer';

let RedoButton = ({ future, actionDescription, redo }) => {
  let tooltip = [...future.slice(0, 9).map((entry) => entry.actionDescription)]
    .filter((entry) => (entry ? true : false))
    .map((entry, index) => (
      <div key={index} className="undo_redo_menu_item">
        Redo {entry}
      </div>
    ));

  if (!tooltip.length)
    tooltip = 'Redo';

  return (
    <Button
      className=""
      onClick={() => {
        if (future.length)
          redo();
      }}
      color={future.length ? 'white' : 'gray'}
      tooltip={<>{tooltip}</>}
      tooltipHorizontalAlign="left"
      tooltipVerticalAlign="bottom"
    >
      <Redo />
    </Button>
  );
};

const mapStateToProps = (state) => ({
  future: state.future,
  actionDescription: state.actionDescription
});

const mapDispatchToProps = (dispatch) => ({
  redo: () => dispatch(redo())
});

RedoButton = connect(mapStateToProps, mapDispatchToProps)(RedoButton);

export { RedoButton };
