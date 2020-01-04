import React from 'react';
import { connect } from 'react-redux';

import { Project } from './project.js';
import { Orb } from './orb.js';

import './index.css';

let SidePanel = ({ selectedOrb }) => (
  <div id='side_panel'>
    {!selectedOrb && <Project />}
    {selectedOrb && <Orb />}
  </div>
);

const mapStateToProps = (state) => ({
  selectedOrb: state.selectedOrb
});

SidePanel = connect(mapStateToProps)(SidePanel);

export default SidePanel;
