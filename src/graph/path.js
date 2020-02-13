import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { setSelected } from '../actions/project';
import { TimeContext } from '../time';

const precision = 2;

let Path = ({ orb, guideColor, select }) => {
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

  const { x, y } = points[points.length - 1];

  return (
    <>
      <g className='path' opacity={orb.showPath ? 1 : 0}>
        <path
          fill={close ? fillColor.rgba : 'none'}
          stroke={strokeColor.rgba}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={strokeLineCap}
          strokeLinejoin={strokeLineJoin}
          opacity={opacity}
          d={d}
        />
      </g>
      <g className='path_hitbox' opacity={0}>
        <path
          fill='none'
          stroke={guideColor.rgb}
          strokeWidth={strokeWidth + 10}
          strokeLinecap='round'
          strokeLinejoin='round'
          d={d}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            select({ id: orb.id });
          }}
        />
        <circle
          fill={guideColor.rgb}
          cx={x}
          cy={y}
          r={strokeWidth + 20}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            select({ id: orb.id });
          }}
        />
      </g>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  selected: state.selected ?
    state.selected.id === props.orb.id ?
      true :
      false :
    undefined,
  guideColor: state.guideColor
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Path = connect(mapStateToProps, mapDispatchToProps)(Path);

export { Path };
