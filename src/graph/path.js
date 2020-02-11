import React from 'react';
import { connect } from 'react-redux';
import { useContext } from 'react';

import { setSelected } from '../actions/actions';
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

  return (
    <g className="path" opacity={orb.showPath ? 1 : 0}>
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
      <path
        fill="none"
        stroke={guideColor.rgb}
        strokeWidth={strokeWidth + 20}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0"
        onClick={(event) => {
          event.stopPropagation();
          select({ id: orb.id });
        }}
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
    undefined,
  guideColor: state.guideColor
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Path = connect(mapStateToProps, mapDispatchToProps)(Path);

export { Path };
