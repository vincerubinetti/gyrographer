import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import { Project } from './project';
import { Orb } from './orb';
import { Button } from '../components/button';
import { ReactComponent as Open } from '../images/arrow-double-right.svg';
import { ReactComponent as Close } from '../images/arrow-double-left.svg';

import './index.css';

let SidePanel = ({ selectedOrb }) => {
  const [open, setOpen] = useState(true);

  return (
    <div id="side_panel" data-open={open}>
      <Button
        onClick={() => setOpen(!open)}
        tooltip={(open ? 'Close' : 'Open') + ' panel'}
        tooltipHorizontalAlign="left"
      >
        {open && <Close />}
        {!open && <Open />}
      </Button>
      {!selectedOrb && <Project />}
      {selectedOrb && <Orb />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedOrb: state.selectedOrb
});

SidePanel = connect(mapStateToProps)(SidePanel);

export default SidePanel;
