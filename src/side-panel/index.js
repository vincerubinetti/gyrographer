import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';

import { SelectedContext } from '../controllers/selected';
import { Project } from './project';
import { Orb } from './orb';
import { Button } from '../components/button';
import { ReactComponent as ExpandIcon } from '../images/arrow-double-right.svg';
import { ReactComponent as CollapseIcon } from '../images/arrow-double-left.svg';

import './index.css';

const SidePanel = () => {
  const [open, setOpen] = useState(true);
  const context = useContext(SelectedContext);

  return (
    <div id='side_panel' data-open={open}>
      <Button
        className='side_panel_button'
        onClick={() => setOpen(!open)}
        tooltip={(open ? 'Close' : 'Open') + ' panel'}
      >
        {open && <CollapseIcon />}
        {!open && <ExpandIcon />}
      </Button>
      <div className='side_panel_header'>
        {context.selected ? 'Orb' : 'Project'}
      </div>
      <div className='side_panel_content'>
        {!context.selected && <Project />}
        {context.selected && <Orb />}
      </div>
    </div>
  );
};

export default SidePanel;
