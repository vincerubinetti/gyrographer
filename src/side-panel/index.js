import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import ProjectSettings from './project-settings/';
import OrbSettings from './orb-settings/';
import { Button } from '../components/button';
import { ReactComponent as ExpandIcon } from '../images/arrow-double-right.svg';
import { ReactComponent as CollapseIcon } from '../images/arrow-double-left.svg';

import './index.css';

let SidePanel = ({ selected }) => {
  const [open, setOpen] = useState(true);

  return (
    <div id='side_panel' data-open={open}>
      <div className='side_panel_header'>
        <span>{selected ? 'Orb' : 'Project'}</span>
        <Button
          onClick={() => setOpen(!open)}
          tooltip={(open ? 'Close' : 'Open') + ' panel'}
        >
          {open && <CollapseIcon />}
          {!open && <ExpandIcon />}
        </Button>
      </div>
      <div className='side_panel_content'>
        {!selected && <ProjectSettings />}
        {selected && <OrbSettings />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selected: state.selected
});

SidePanel = connect(mapStateToProps)(SidePanel);

export default SidePanel;
