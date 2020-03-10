import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Graph from './graph';
import TopPanel from './top-panel';
import SidePanel from './side-panel';
import BottomPanel from './bottom-panel';
import { Controller } from './controller';
import { Keyboard } from './keyboard';
import { getStateFromStorage } from './enhancers/persister';
import { setState } from './actions';

import './util/debug';

import './app.css';

// redux store - contains undoable and saveable global state
// controller - contains all other global state

let App = ({ setState }) => {
  useEffect(() => {
    setState({ state: getStateFromStorage() });
  }, [setState]);

  return (
    <Controller>
      <Graph />
      <Keyboard />
      <TopPanel />
      <SidePanel />
      <BottomPanel />
    </Controller>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

App = connect(null, mapDispatchToProps)(App);

export default App;

// detect fullscreen changes and set data attribute on body for readable state
const onResize = () => {
  document.body.dataset.fullscreen =
    Math.abs(window.screen.height - window.innerHeight) <= 1;
};
window.addEventListener('resize', () => {
  window.clearTimeout(window.resizeTimer);
  window.resizeTimer = window.setTimeout(onResize, 500);
});
onResize();
