import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time.js';
import './path.css';

const precision = 2;

let Path = ({ orb, edit }) => {
  const context = useContext(TimeContext);

  const time = context.time;

  // styles
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
    <path
      data-edit={edit}
      className="path"
      fill={close ? fillColor : 'none'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      strokeDashoffset={dashOffset}
      strokeLinecap={strokeLineCap}
      strokeLinejoin={strokeLineJoin}
      d={d}
    />
  );
};

const mapStateToProps = (state) => ({
  edit: state.edit
});

Path = connect(mapStateToProps)(Path);

export { Path };
