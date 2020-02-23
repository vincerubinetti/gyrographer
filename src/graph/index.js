import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { setSelected } from '../actions/project';
import { useMounted } from '../util/hooks';
import { initViewHandler } from './view.js';
import { initDragHandler } from './drag.js';
import Guides from './guides';
import Contents from './contents';

import './index.css';

export let svg;
export let view;

let Graph = ({ backgroundColor, select }) => {
  const mounted = useMounted();

  useEffect(() => {
    svg = d3.select('#graph');
    view = d3.select('#view');

    initViewHandler();
    initDragHandler();
  }, [mounted]);

  return (
    <svg
      id="graph"
      style={{ background: backgroundColor.rgba }}
      onClick={() => select()}
    >
      <g id="view">
        <Guides />
        <Contents />
      </g>
    </svg>
  );
};

const mapStateToProps = (state) => ({
  backgroundColor: state.backgroundColor
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(setSelected(...args))
});

Graph = connect(mapStateToProps, mapDispatchToProps)(Graph);

export default Graph;
