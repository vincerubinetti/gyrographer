import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

import './text-box.css';

export const TextBox = ({ value = '', onChange = () => null }) => {
  const [edit, setEdit] = useState(false);

  const onInputRef = useCallback((element) => {
    if (document.activeElement !== element) {
      element?.focus();
      element?.select();
    }
    return element;
  }, []);

  const onClick = useCallback(() => {
    setEdit(true);
  }, []);

  const onKeyPress = useCallback((event) => {
    if (event.key === 'Esc' || event.key === 'Enter')
      event.target.blur();
  }, []);

  const onBlur = useCallback(
    (event) => {
      const newValue = event.target.value;
      if (newValue !== value)
        onChange(newValue);
      setEdit(false);
    },
    [value, onChange]
  );

  return (
    <div className='text_box'>
      {!edit &&
        <div tabIndex='0' onFocus={onClick} onClick={onClick}>
          {value}
        </div>
      }
      {edit &&
        <input
          ref={onInputRef}
          type='text'
          defaultValue={value}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
        />
      }
    </div>
  );
};
