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
      <div className='side_panel_header'>
        <span>
          {context.selected ? 'Orb' : 'Project'}
        </span>
        <Button
          onClick={() =>
            setOpen(!open)}
          tooltip={(open ? 'Close' : 'Open') + ' panel'}
        >
          {open && <CollapseIcon />}
          {!open && <ExpandIcon />}
        </Button>
      </div>
      <div className='side_panel_content'>
        {!context.selected && <Project />}
        {context.selected && <Orb />}
      </div>
    </div>
  );
};

export default SidePanel;
