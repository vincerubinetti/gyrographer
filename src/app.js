import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Graph } from './graph.js';
import { Orb } from './orb.js';
import { Timebar } from './timebar.js';
import './app.css';

// import { Graph } from './graph.js';

export class App extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.time = 0;
    this.state.orbTree = [];
  }

  componentDidMount() {
    this.setState({ orbTree: Orb.buildTree(this.props.orbs) });
  }

  componentDidUpdate(prevProps) {
    if (this.props.orbs !== prevProps.orbs)
      this.setState({ orbTree: Orb.buildTree(this.props.orbs) });
  }

  incrementTime = () => {
    const increment = 100 / (this.props.length * this.props.fps);
    this.setState({ time: this.state.time + increment });
  };

  changeTime = (time) => {
    if (time < 0) {
      time = this.props.loop
        ? (time % this.props.length) + this.props.length
        : 0;
    }
    if (time > this.props.length)
      time = this.props.loop ? time % this.props.length : this.props.length;
    this.setState({ time: time });
  };

  render() {
    return (
      <>
        <Graph time={this.state.time} orbTree={this.state.orbTree} />
        <Timebar onChange={this.changeTime} time={this.state.time} />
      </>
    );
  }
}
App = connect((state) => ({
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop
}))(App);
