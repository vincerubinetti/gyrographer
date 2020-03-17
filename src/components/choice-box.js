import React from 'react';

import './choice-box.css';

export const ChoiceBox = ({
  value = '',
  choices = [],
  onChange = () => null
}) => {
  return (
    <div className='choice_box'>
      <button
        onClick={() => {
          const index = choices.findIndex((choice) => choice === value) + 1;
          onChange(choices[index % (choices.length || 1)] || '');
        }}
      >
        {value}
      </button>
    </div>
  );
};
