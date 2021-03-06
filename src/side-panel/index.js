import React from 'react';
import { useState } from 'react';

import { Tree } from './tree';
import { Orb } from './orb';
import { Project } from './project';
import { Button } from '../components/button';
import { ReactComponent as ExpandIcon } from '../images/arrow-double-right.svg';
import { ReactComponent as CollapseIcon } from '../images/arrow-double-left.svg';

import './index.css';

const SidePanel = () => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState('tree');

  return (
    <div id='side_panel' data-open={open}>
      <Button
        id='side_panel_collapse'
        onClick={() => setOpen(!open)}
        tooltip={(open ? 'Close' : 'Open') + ' panel'}
      >
        {open && <CollapseIcon />}
        {!open && <ExpandIcon />}
      </Button>
      <div id='side_panel_header'>
        <Button
          className='side_panel_tab'
          onClick={() => setTab('project')}
          data-active={tab === 'project'}
        >
          Project
        </Button>
        <Button
          className='side_panel_tab'
          onClick={() => setTab('tree')}
          data-active={tab === 'tree'}
        >
          Tree
        </Button>
        <Button
          className='side_panel_tab'
          onClick={() => setTab('orb')}
          data-active={tab === 'orb'}
        >
          Orb
        </Button>
      </div>
      <div id='side_panel_content'>
        {tab === 'project' && <Project />}
        {tab === 'tree' && <Tree />}
        {tab === 'orb' && <Orb />}
      </div>
    </div>
  );
};

export default SidePanel;
