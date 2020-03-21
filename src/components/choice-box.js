import React from 'react';
import { useCallback } from 'react';

import './choice-box.css';

export const ChoiceBox = ({
  value = '',
  choices = [],
  onChange = () => null
}) => {
  const onClick = useCallback(() => {
    const index = choices.findIndex((choice) => choice === value) + 1;
    onChange(choices[index % (choices.length || 1)] || '');
  }, [value, choices, onChange]);

  return (
    <div className='choice_box'>
      <button onClick={onClick}>{value}</button>
    </div>
  );
};
