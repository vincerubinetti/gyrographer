import React from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { setState } from '../actions';

import { ReactComponent as LoadIcon } from '../images/load.svg';

let LoadButton = ({ setState }) => {
  const ref = useRef(null);

  const onClick = useCallback(() => {
    if (ref.current)
      ref.current.click();
  }, []);

  const onChange = useCallback(
    async (event) => {
      const text = await event.target.files[0].text();
      let state = {};
      try {
        state = JSON.parse(text);
      } catch (error) {
        console.log(error);
      }

      setState({
        state: state,
        description: 'Load project from file'
      });
    },
    [setState]
  );

  return (
    <Button tooltip='Open project' onClick={onClick}>
      <input
        ref={ref}
        type='file'
        onChange={onChange}
        accept='.gyr, .json, .txt'
        style={{ display: 'none' }}
      />
      <LoadIcon />
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

LoadButton = connect(null, mapDispatchToProps)(LoadButton);

export { LoadButton };
