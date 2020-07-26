import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { setState } from '../actions';

import { ReactComponent as LoadIcon } from '../images/load.svg';

import './index.css';

let Overlay = ({ setState }) => {
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    async (event) => {
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

      setDragging(false);
    },
    [setState]
  );

  useEffect(() => {
    const start = () => setDragging(true);
    window.addEventListener('dragover', start);
    return () => window.removeEventListener('dragover', start);
  }, []);

  return (
    <div
      id='overlay'
      data-dragging={dragging}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={() => setDragging(false)}
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
