import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { TimeContext } from '../time';
import { Wheel } from './wheel';
import { Stick } from './stick';
import { Path } from './path';
import { PathHitbox } from './path-hitbox';

const precision = 2;

let Contents = ({ showPaths, showSticks, showWheels }) => {
  const context = useContext(TimeContext);
  const time = context.time;

  const wheels = [];
  const sticks = [];
  const paths = [];
  const pathHitboxes = [];

  for (const orb of context.orbTree) {
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
    if (orb.close)
      d += 'z';

    const lastPoint = points[points.length - 1];
    wheels.push(<Wheel key={wheels.length} orb={orb} lastPoint={lastPoint} />);
    sticks.push(<Stick key={sticks.length} orb={orb} lastPoint={lastPoint} />);
    paths.push(<Path key={paths.length} orb={orb} d={d} />);
    pathHitboxes.push(
      <PathHitbox
        key={pathHitboxes.length}
        orb={orb}
        d={d}
        lastPoint={lastPoint}
      />
    );
  }

  return (
    <g id="contents">
      <g id="wheels" opacity={showWheels ? 1 : 0}>
        {wheels}
      </g>
      <g id="sticks" opacity={showSticks ? 1 : 0}>
        {sticks}
      </g>
      <g id="paths" opacity={showPaths ? 1 : 0}>
        {paths}
      </g>
      <g id="path_hitboxes">{pathHitboxes}</g>
    </g>
  );
};

const mapStateToProps = (state) => ({
  showPaths: state.showPaths,
  showSticks: state.showSticks,
  showWheels: state.showWheels
});

Contents = connect(mapStateToProps)(Contents);

export default Contents;
