import React from 'react';

import { ReactComponent as EyeIcon } from '../images/eye.svg';

import './check-box.css';

const CheckBox = ({
  value = '', onChange = () =>
    null
}) =>

  <div className='check_box'>
    <button
      type='text'
      onClick={() =>
        onChange(!value)}
      data-color={value ? 'blue' : 'gray'}
    >
      <EyeIcon />
    </button>
  </div>;
export { CheckBox };
