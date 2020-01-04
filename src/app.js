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
    <Keyboard />
    <TopPanel />
    <SidePanel />
    <BottomPanel />
  </Time>
);

export default App;

// detect fullscreen changes and set data attribute on body for readable state
window.addEventListener('resize', () => {
  window.clearTimeout(window.resizeTimer);
  window.resizeTimer = window.setTimeout(() => {
    document.body.dataset.fullscreen =
      Math.abs(window.screen.height - window.outerHeight) <= 1;
  }, 1000);
});
