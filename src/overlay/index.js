import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { setState } from '../actions';

import { ReactComponent as LoadIcon } from '../images/load.svg';

import './index.css';

let Overlay = ({ setState }) => {
  const [hover, setHover] = useState(false);

  const onDrop = useCallback(async (event) => {
    event.persist();
    event.preventDefault();
    event.stopPropagation();

    const text = await event?.dataTransfer?.files[0]?.text();
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

    setHover(false);
  }, [setState]);

  return (
    <div
      id='overlay'
      data-hover={hover}
      onDragEnter={() => setHover(true)}
      onDragLeave={() => setHover(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <div>
        <span>Open Project</span>
        <LoadIcon />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setState: (...args) => dispatch(setState(...args))
});

Overlay = connect(null, mapDispatchToProps)(Overlay);

export default Overlay;
