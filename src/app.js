import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from './app-context.js';
import { Graph } from './graph/graph.js';
import { Orb } from './util/orb.js';
import { TimePanel } from './time-panel/time-panel.js';
import './app.css';

export class App extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.time = 0;
    this.state.playing = false;
    this.state.playTimer = null;
    this.state.orbTree = [];

    window.addEventListener('keydown', this.onKeyDown);
  }

  componentDidMount() {
    this.setState({ orbTree: Orb.buildTree(this.props.orbs) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.orbs !== prevProps.orbs)
      this.setState({ orbTree: Orb.buildTree(this.props.orbs) });
  }

  incrementTime = () => {
    this.changeTime(Math.floor(this.state.time + 1));
  };

  decrementTime = () => {
    this.changeTime(Math.ceil(this.state.time - 1));
  };

  changePlaying = (play) => {
    const newState = {};

    if (play) {
      newState.playTimer = window.setInterval(
        this.incrementTime,
        Math.floor(1000 / this.props.fps)
      );
      newState.playing = true;
    } else {
      window.clearInterval(this.state.playTimer);
      newState.playTimer = null;
      newState.playing = false;
    }

    if (play && !this.state.playing && this.state.time >= this.props.length)
      newState.time = 0;

    this.setState(newState);
  };

  changeTime = (time) => {
    if (time < 0) {
      if (this.props.loop)
        time = (time % this.props.length) + this.props.length;
      else
        time = 0;
    }
    if (time > this.props.length) {
      if (this.props.loop)
        time = time % this.props.length;
      else {
        time = this.props.length;
        this.changePlaying(false);
      }
    }
    this.setState({ time: time });
  };

  onKeyDown = (event) => {
    switch (event.key) {
      case ' ':
        event.preventDefault();

        this.changePlaying(!this.state.playing);
        break;

      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();

        let factor = 1;
        if (event.ctrlKey)
          factor = 0.1;
        else if (event.shiftKey)
          factor = 5;
        if (event.key === 'ArrowLeft')
          factor *= -1;

        this.changeTime(
          Math.round((this.state.time + factor) / factor) * factor
        );
        break;

      case 'Home':
        event.preventDefault();

        this.changeTime(0);
        break;

      case 'End':
        event.preventDefault();

        this.changeTime(this.props.length);
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          orbTree: this.state.orbTree,
          changeTime: this.changeTime,
          changePlaying: this.changePlaying,
          playing: this.state.playing,
          time: this.state.time,
          incrementTime: this.incrementTime,
          decrementTime: this.decrementTime
        }}
      >
        <Graph />
        <TimePanel />
      </AppContext.Provider>
    );
  }
}
App = connect((state) => ({
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop
}))(App);
