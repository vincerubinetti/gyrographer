import React from 'react';
import { useContext } from 'react';

import { TreeContext } from '../controllers/tree';
import { SelectedContext } from '../controllers/selected';
import { avg } from '../util/math';

import './tree.css';

const size = 20;
const hSpacing = 30;
const vSpacing = 40;

const Tree = () => {
  const { root } = useContext(TreeContext);
  const { changeSelected } = useContext(SelectedContext);

  const table = [];
  const traverse = (leaf) => {
    if (leaf.children) {
      for (const child of leaf.children)
        traverse(child);
    }

    if (!table[leaf.depth])
      table[leaf.depth] = [];
    table[leaf.depth].push(leaf);
  };
  traverse(root);

  for (const [rowIndex, row = []] of Object.entries(table)) {
    for (const [colIndex, col] of Object.entries(row)) {
      col.x = Number(colIndex) * hSpacing;
      col.y = Number(rowIndex) * vSpacing;
    }
  }

  for (const row of table) {
    const avgX = avg((row || []).map((col) => col.x));
    for (const col of row || [])
      col.x -= avgX;
  }

  const width = 250;
  const height = (table.length + 1) * vSpacing;
  const x = -width / 2;
  const y = -hSpacing;

  const list = table.flat();

  return (
    <svg
      id='tree_panel'
      width={width + 'px'}
      height={height + 'px'}
      viewBox={`${x} ${y} ${width} ${height}`}
      onClick={() => changeSelected()}
    >
      {list
        .filter((orb) => orb.path === false)
        .map((leaf, index) => (
          <Node key={index} leaf={leaf} opacity={0.25} />
        ))}
      {list.map((leaf, index) => (
        <Link key={index} leaf={leaf} />
      ))}
      {list
        .filter((orb) => orb.path !== false)
        .map((leaf, index) => (
          <Node key={index} leaf={leaf} opacity={1} />
        ))}
    </svg>
  );
};

export { Tree };

const Link = ({ leaf }) => (
  <line
    className='tree_link'
    x1={leaf.parent?.x || 0}
    y1={leaf.parent?.y || 0}
    x2={leaf.x}
    y2={leaf.y}
  />
);

const Node = ({ leaf, opacity }) => {
  const { selected, changeSelected } = useContext(SelectedContext);

  return (
    <>
      <circle
        className='tree_node'
        data-selected={leaf.id === selected}
        opacity={opacity}
        fill={
          (leaf.fill?.a ? leaf.fill?.rgb : leaf.stroke?.rgb) || 'var(--black)'
        }
        r={size / 2}
        cx={leaf.x}
        cy={leaf.y}
      />
      <foreignObject
        x={leaf.x - size / 2}
        y={leaf.y - size / 2}
        width={size}
        height={size}
      >
        <button
          xmlns='http://www.w3.org/1999/xhtml'
          className='tree_button'
          onClick={(event) => {
            event.stopPropagation();
            changeSelected(leaf.id);
          }}
        />
      </foreignObject>
    </>
  );
};
