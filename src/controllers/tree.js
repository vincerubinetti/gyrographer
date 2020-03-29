import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { buildTree } from './orb';

export const TreeContext = createContext({});

let Tree = ({ children, orbs }) => {
  const [orbTree, setOrbTree] = useState([]);

  useEffect(() => setOrbTree(buildTree(orbs)), [orbs]);

  return (
    <TreeContext.Provider
      value={{
        orbTree
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  orbs: state.orbs
});

Tree = connect(mapStateToProps)(Tree);

export { Tree };
