import React from 'react';

import './choice-box.css';

export const ChoiceBox = ({
  value = '',
  choices = [],
  onChange = () => null
}) => {
  return (
    <div className='choice_box'>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {choices.map((choice, index) =>
          <option key={index} value={choice}>
            {choice}
          </option>)}
      </select>
    </div>
  );
};
