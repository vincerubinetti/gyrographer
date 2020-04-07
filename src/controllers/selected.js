import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

export const SelectedContext = createContext({});

let Selected = ({ orbs, children }) => {
  const [selected, setSelected] = useState(null);

  const changeSelected = useCallback(
    (id = null) => (selected !== id ? setSelected(id) : setSelected(null)),
    [selected]
  );

  useEffect(() => {
    if (!orbs[selected])
      setSelected(null);
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
