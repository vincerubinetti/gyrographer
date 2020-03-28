import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

export const SelectedContext = createContext({});

let Selected = ({ orbs, children }) => {
  const [selected, setSelected] = useState('');

  const changeSelected = useCallback((id = '') => setSelected(id), []);

  useEffect(() => {
    if (!orbs[selected])
      setSelected('');
  }, [orbs, selected]);

  return (
    <SelectedContext.Provider
      value={{
        selected,
        changeSelected
      }}
    >
      {children}
    </SelectedContext.Provider>
  );
};

const mapStateToProps = (state) => ({ orbs: state.orbs });

Selected = connect(mapStateToProps)(Selected);

export { Selected };
