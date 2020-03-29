import React from 'react';
import { Fragment } from 'react';
import { useContext } from 'react';

import { TreeContext } from '../controllers/tree';
import { avg } from '../util/math';

import './tree.css';

const size = 20;
const spacing = 40;

const traverse = (leaf, depth) => {
  if (depth === undefined)
    depth = 0;
  return leaf.parent ? traverse(leaf.parent, depth + 1) : depth;
};

const Tree = () => {
  const context = useContext(TreeContext);

  const table = [];
  for (const leaf of context.orbTree) {
    const depth = traverse(leaf);
    table[depth] = table[depth] || [];
    table[depth].push(leaf);
  }

  for (const [rowIndex, row] of Object.entries(table)) {
    for (const [colIndex, col] of Object.entries(row)) {
      col.x = Number(colIndex) * spacing;
      col.y = (Number(rowIndex) + 1) * spacing;
    }
  }

  for (const row of table) {
    const avgX = avg(row.map((col) => col.x));
    for (const col of row)
      col.x -= avgX;
  }

  const width = 250;
  const height = (table.length + 2) * spacing;
  const x = -width / 2;
  const y = -spacing;

  return (
    <svg
      id='tree_panel'
      width={width + 'px'}
      height={height + 'px'}
      viewBox={`${x} ${y} ${width} ${height}`}
    >
      {table.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((leaf, colIndex) => (
            <line
              key={colIndex}
              className='tree_link'
              stroke='var(--white)'
              strokeLinecap='round'
              strokeLinejoin='round'
              x1={leaf.parent?.x || 0}
              y1={leaf.parent?.y || 0}
              x2={leaf.x}
              y2={leaf.y}
            />
          ))}
        </Fragment>
      ))}
      {table.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((leaf, colIndex) => (
            <circle
              key={colIndex}
              className='tree_node'
              fill={leaf.fill.a ? leaf.fill.rgb : leaf.stroke.rgb}
              r={size / 2}
              cx={leaf.x}
              cy={leaf.y}
            />
          ))}
        </Fragment>
      ))}
    </svg>
  );
};

export { Tree };
