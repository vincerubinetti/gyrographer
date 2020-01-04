import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import { Project } from './project.js';
import { Orb } from './orb.js';
import { Button } from '../components/button.js';
import { ReactComponent as Open } from '../images/arrow-right.svg';
import { ReactComponent as Close } from '../images/arrow-left.svg';

import './index.css';

let SidePanel = ({ selectedOrb }) => {
  const [open, setOpen] = useState(true);

  return (
    <div id='side_panel' data-open={open}>
      <Button onClick={() => setOpen(!open)} tooltip='Close panel'>
        {open && <Close/>}
        {!open && <Open/>}
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
