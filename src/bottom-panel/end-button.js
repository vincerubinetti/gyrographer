import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { AppContext } from '../app-context.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowEnd } from '../images/arrow_end.svg';

let EndButton = ({ length }) => {
  const context = useContext(AppContext);
  return (
    <Button
      className="time_button_half"
      onClick={() => context.changeTime(length)}
      tooltip="To end"
    >
      <ArrowEnd />
    </Button>
  );
};

const mapStateToProps = (state) => ({
  length: state.length
});

EndButton = connect(mapStateToProps)(EndButton);

export { EndButton };
