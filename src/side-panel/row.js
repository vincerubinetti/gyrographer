import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { Tooltip } from '../components/tooltip';
import { createAction } from '../actions/';

import projectSpec from '../project.spec.json';
import orbSpec from '../orb.spec.json';

import './row.css';

const spec = { ...projectSpec, ...orbSpec };

let Row = ({ state, dispatch, prop, Icon, Control, orb }) => {
  const { selected } = useContext(SelectedContext);

  const name = spec[prop].name;
  const description = spec[prop].description;
  const value = (orb ? state.orbs[selected] : state)[prop];
  const step = spec[prop].step;
  const choices = spec[prop].choices;
  const action = spec[prop].action;
  const type = 'set_' + prop;

  return (
    <div className='side_panel_row'>
      <div>
        <Icon />
      </div>
      <Tooltip content={description}>
        <div>{name}</div>
      </Tooltip>
      <Tooltip content={action}>
        <div>
          <Control
            value={value}
            step={step}
            choices={choices}
            onNudge={(value) => {
              dispatch(
                createAction(type)({
                  value,
                  selected,
                  description: action,
                  noUndo: true
                })
              );
            }}
            onChange={(value) => {
              dispatch(
                createAction(type)({
                  value,
                  selected,
                  description: action
                })
              );
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({ dispatch });

Row = connect(mapStateToProps, mapDispatchToProps)(Row);

export { Row };
