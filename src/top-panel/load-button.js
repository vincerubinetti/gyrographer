import React from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { Button } from '../components/button';
import { ReactComponent as LoadIcon } from '../images/load.svg';
import { setState } from '../actions';

let LoadButton = ({ state, setState }) => {
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
        description: 'Load state from file'
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

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

LoadButton = connect(mapStateToProps, mapDispatchToProps)(LoadButton);

export { LoadButton };
