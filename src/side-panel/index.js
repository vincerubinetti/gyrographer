import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import { SelectedContext } from '../controllers/selected';
import { Tree } from './tree';
import { Orb } from './orb';
import { Project } from './project';
import { Button } from '../components/button';
import { ReactComponent as ExpandIcon } from '../images/arrow-double-right.svg';
import { ReactComponent as CollapseIcon } from '../images/arrow-double-left.svg';

import './index.css';

const SidePanel = () => {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState('project');
  const context = useContext(SelectedContext);

  useEffect(() => {
    if (context.selected)
      setTab('orb');
    else
      setTab('project');
  }, [context.selected]);

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
        <Button
          className='side_panel_tab'
          onClick={() => setTab('project')}
          data-active={tab === 'project'}
        >
          Project
        </Button>
      </div>
      <div className='side_panel_content'>
        {tab === 'tree' && <Tree />}
        {tab === 'orb' && <Orb />}
        {tab === 'project' && <Project />}
      </div>
    </div>
  );
};

export default SidePanel;
