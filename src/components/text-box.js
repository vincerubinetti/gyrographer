import React from 'react';

import './text-box.css';

export const TextBox = ({
  value = '',
  onChange = () =>
    null,
  onNudge = () =>
    null
}) => {
  return (
    <div className='text_box'>
      <input
        type='text'
        value={value}
        onChange={(event) =>
          onNudge(event.target.value)}
        onBlur={(event) =>
          onChange(event.target.value)}
      />
    </div>
  );
};
