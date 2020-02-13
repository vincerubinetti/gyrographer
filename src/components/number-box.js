import React from 'react';

import './number-box.css';

export const NumberBox = () => {
  return (
    <div className='number_box'>
      <input type='number' value={100} />
    </div>
  );
};
