import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { setSelected } from '../actions/project';
import { TimeContext } from '../time';

let Path = ({ orb, selected, d }) => {
  const context = useContext(TimeContext);

  const time = context.time;

  // styles
  const opacity = orb.showPath ? 1 : 0;
  const fill = orb.computeProp('fill', time);
  const stroke = orb.computeProp('stroke', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const close = orb.close;
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const strokeLineCap = orb.strokeLineCap;
  const strokeLineJoin = orb.strokeLineJoin;

  return (
    <g
      className="path"
      opacity={
        orb.showPath && (selected === true || selected === undefined) ? 1 : 0
      }
    >
      <path
        fill={close ? fill.rgba : 'none'}
        stroke={stroke.rgba}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
        opacity={opacity}
        d={d}
      />
    </g>
  );
};

const mapStateToProps = (state, props) => ({
  selected: state.selected ?
    state.selected === props.orb.id ?
      true :
      false :
    undefined
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Path = connect(mapStateToProps, mapDispatchToProps)(Path);

export { Path };
