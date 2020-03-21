import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { createAction } from '../actions/';
import { Tooltip } from '../components/tooltip';
import { TextBox } from '../components/text-box';

import spec from '../project.spec.json';

import './title-box.css';

let TitleBox = ({ title, dispatch }) => {
  const description = spec.title.description;
  const action = spec.title.action;
  const type = 'SET_TITLE';

  const onChange = useCallback(
    (value) => {
      dispatch(createAction(type)({
        value,
        description: action
      }));
    },
    [action, dispatch]
  );

  return (
    <Tooltip content={description}>
      <span className='title_box'>
        <TextBox value={title} onChange={onChange} />
      </span>
    </Tooltip>
  );
};

const mapStateToProps = (state) => ({
  title: state.title
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

TitleBox = connect(mapStateToProps, mapDispatchToProps)(TitleBox);

export { TitleBox };
