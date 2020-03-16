import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const SelectedContext = createContext({});

const Selected = ({ children }) => {
  const [selected, setSelected] = useState('');

  const changeSelected = useCallback((id = '') => setSelected(id), []);

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

export { Selected };

export { SelectedContext };
