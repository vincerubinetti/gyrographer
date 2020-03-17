import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Graph from './graph';
import TopPanel from './top-panel';
import SidePanel from './side-panel';
import BottomPanel from './bottom-panel';
import { Keyboard } from './controllers/keyboard';
import { Mouse } from './controllers/mouse';
import { Tree } from './controllers/tree';
import { Selected } from './controllers/selected';
import { Time } from './controllers/time';
import { getStateFromStorage } from './enhancers/persister';
import { setState } from './actions';

import './util/debug';

import './app.css';

let App = ({ setState }) => {
  useEffect(() => {
    setState({
      state: getStateFromStorage(),
      description: 'Load state from storage'
    });
  }, [setState]);

  return (
    <Tree>
      <Selected>
        <Time>
          <Keyboard />
          <Mouse />
          <Graph />
          <TopPanel />
          <SidePanel />
          <BottomPanel />
        </Time>
      </Selected>
    </Tree>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

App = connect(null, mapDispatchToProps)(App);

export default App;
