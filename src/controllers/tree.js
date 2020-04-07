import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { buildTree } from './orb';

export const TreeContext = createContext({});

let Tree = ({ children, orbs }) => {
  const [root, setRoot] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    const { root, list } = buildTree(orbs);
    setRoot(root);
    setList(list);
  }, [orbs]);

  return (
    <TreeContext.Provider
      value={{
        root,
        list
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
