import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { setSelected } from '../actions/actions';
import { TimeContext } from '../time';
import './path.css';

const precision = 2;

let Path = ({ orb, selected, select }) => {
  const context = useContext(TimeContext);

  const time = context.time;

  // styles
  const opacity = orb.showPath ? 1 : 0;
  const fillColor = orb.computeProp('fillColor', time);
  const strokeColor = orb.computeProp('strokeColor', time);
  const strokeWidth = orb.computeProp('strokeWidth', time);
  const close = orb.close;
  const dashArray = orb.computeProp('dashArray', time);
  const dashOffset = orb.computeProp('dashOffset', time);
  const strokeLineCap = orb.strokeLineCap;
  const strokeLineJoin = orb.strokeLineJoin;

  //  geometry
  const points = orb.computePath(time);
  let d = points
    .map((point, index) =>
      [
        '\n',
        index === 0 ? 'M' : 'L',
        point.x.toFixed(precision),
        point.y.toFixed(precision)
      ].join(' ')
    )
    .join(' ');
  if (close)
    d += 'z';

  return (
    <>
      <path
        className="path"
        fill={close ? fillColor : 'none'}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap={strokeLineCap}
        strokeLinejoin={strokeLineJoin}
        opacity={opacity}
        d={d}
      />
      <path
        className="path"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 5}
        data-hitbox="true"
        data-selected={selected === orb.id}
        onClick={(event) => {
          event.stopPropagation();
          select({ id: orb.id });
        }}
        d={d}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ selected: state.selected });

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Path = connect(mapStateToProps, mapDispatchToProps)(Path);

export { Path };
