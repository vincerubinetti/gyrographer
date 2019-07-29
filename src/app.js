import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from './app-context.js';
import { Graph } from './graph/graph.js';
import { Orb } from './util/orb.js';
import { TopPanel } from './top-panel/top-panel.js';
import { TimePanel } from './time-panel/time-panel.js';
import { undo } from './state/undoer.js';
import { redo } from './state/undoer.js';

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

  incrementTime = (multiplier) => {
    const increment = this.props.speed * (multiplier || 1);

    this.changeTime(
      Math.round((this.state.time + increment) / increment) * increment
    );
  };

  decrementTime = (multiplier) => {
    const increment = -this.props.speed * (multiplier || 1);

    this.changeTime(
      Math.round((this.state.time + increment) / increment) * increment
    );
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
    event.preventDefault();

    let multiplier = 1;
    if (event.shiftKey)
      multiplier = 10;
    else if (event.ctrlKey)
      multiplier = 0.1;

    switch (event.key) {
      case ' ':
        this.changePlaying(!this.state.playing);
        break;

      case 'ArrowLeft':
        this.decrementTime(multiplier);
        break;

      case 'ArrowRight':
        this.incrementTime(multiplier);
        break;

      case 'Home':
        this.changeTime(0);
        break;

      case 'End':
        event.preventDefault();

        this.changeTime(this.props.length);
        break;

      case 'z':
        if (event.ctrlKey && this.props.past.length)
          this.props.dispatch(undo());
        break;

      case 'y':
        if (event.ctrlKey && this.props.future.length)
          this.props.dispatch(redo());
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
        <TopPanel />
        <TimePanel />
      </AppContext.Provider>
    );
  }
}
App = connect((state) => ({
  past: state.past,
  future: state.future,
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop,
  speed: state.speed
}))(App);
