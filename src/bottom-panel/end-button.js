import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time';
import { Button } from '../components/button';
import { ReactComponent as ArrowEndIcon } from '../images/arrow-end.svg';

let EndButton = ({ length }) => {
  const context = useContext(TimeContext);
  return (
    <Button
      className="thin_button"
      onClick={() => context.changeTime(length)}
      tooltip="To end"
    >
      <ArrowEndIcon />
    </Button>
  );
};

const mapStateToProps = (state) => ({
  length: state.length
});

EndButton = connect(mapStateToProps)(EndButton);

export { EndButton };
