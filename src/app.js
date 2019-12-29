import React from 'react';

import Graph from './graph';
import TopPanel from './top-panel';
import SidePanel from './side-panel';
import BottomPanel from './bottom-panel';
import { Time } from './time.js';
import { Keyboard } from './keyboard.js';

import './app.css';

const App = () => (
  <Time>
    <Graph />
    <TopPanel />
    <SidePanel />
    <BottomPanel />
    <Keyboard />
  </Time>
);

export default App;
