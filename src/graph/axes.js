import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { SelectedContext } from '../controllers/selected';
import { dim } from './';

const strokeWidth = 3;

let Axes = ({ axes, left, top, right, bottom, guides }) => {
  const context = useContext(SelectedContext);

  const opacity = axes ? context.selected ? dim : 1 : 0;

  return (
    <g id='axes' opacity={opacity}>
      {top < 0 && bottom > 0 &&
        <line
          x1={left}
          y1='0'
          x2={right}
          y2='0'
          stroke={guides.rgb}
          strokeWidth={strokeWidth}
          strokeLinecap='square'
        />
      }
      {left < 0 && right > 0 &&
        <line
          x1='0'
          y1={top}
          x2='0'
          y2={bottom}
          stroke={guides.rgb}
          strokeWidth={strokeWidth}
          strokeLinecap='square'
        />
      }
    </g>
  );
};

const mapStateToProps = (state) => ({
  axes: state.axes,
  left: state.left,
  top: state.top,
  right: state.right,
  bottom: state.bottom,
  guides: state.guides
});

Axes = connect(mapStateToProps)(Axes);

export { Axes };
