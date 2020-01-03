import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time.js';
import { Button } from '../components/button.js';
import { ReactComponent as ArrowEnd } from '../images/arrow_end.svg';

let EndButton = ({ length }) => {
  const context = useContext(TimeContext);
  return (
    <Button
      className="thin_button"
      onClick={() => context.changeTime(length)}
      tooltip="To end"
      tooltipHorizontalAlign="right"
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
