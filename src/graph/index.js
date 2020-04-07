import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { SelectedContext } from '../controllers/selected';
import { useMounted } from '../util/hooks';
import { initViewHandler } from './view.js';
import { initDragHandler } from './drag.js';
import { fitView } from './view.js';
import { Guides } from './guides';
import { Contents } from './contents';

import './index.css';

export const dim = 0.1;

export let svg;
export let view;

let Graph = ({ background }) => {
  const { changeSelected } = useContext(SelectedContext);
  const mounted = useMounted();

  useEffect(() => {
    svg = d3.select('#graph');
    view = d3.select('#view');

    initViewHandler();
    initDragHandler();
  }, [mounted]);

  useEffect(() => {
    window.addEventListener('resize', fitView);
    return () => window.removeEventListener('resize', fitView);
  }, []);

  return (
    <svg
      id='graph'
      style={{ background: background.rgba }}
      onClick={() => changeSelected()}
    >
      <g id='view'>
        <Guides />
        <Contents />
      </g>
    </svg>
  );
};

const mapStateToProps = (state) => ({
  background: state.background
});

Graph = connect(mapStateToProps)(Graph);

export default Graph;
