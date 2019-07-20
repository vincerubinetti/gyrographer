import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { AppContext } from './app-context.js';
import { Graph } from './graph/graph.js';
import { Orb } from './util/orb.js';
import { TopPanel } from './top-panel/top-panel.js';
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
    const increment = this.props.speed;

    this.changeTime(
      Math.round((this.state.time + increment) / increment) * increment
    );
  };

  decrementTime = () => {
    const increment = -this.props.speed;

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
    switch (event.key) {
      case ' ':
        event.preventDefault();

        this.changePlaying(!this.state.playing);
        break;

      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();

        let increment = 1;
        if (event.ctrlKey)
          increment = 0.1;
        else if (event.shiftKey)
          increment = 5;
        if (event.key === 'ArrowLeft')
          increment *= -1;

        this.changeTime(
          Math.round((this.state.time + increment) / increment) * increment
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
        <TopPanel />
        <TimePanel />
      </AppContext.Provider>
    );
  }
}
App = connect((state) => ({
  orbs: state.present.orbs,
  fps: state.present.fps,
  length: state.present.length,
  loop: state.present.loop,
  speed: state.present.speed
}))(App);
