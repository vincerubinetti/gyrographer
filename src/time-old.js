import React from 'react';
import { PureComponent } from 'react';
import { createContext } from 'react';
import { connect } from 'react-redux';

import { Orb } from './util/orb.js';

const TimeContext = createContext({});

class Time extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.playing = false;
    this.state.time = 0;
    this.state.orbTree = Orb.buildTree(this.props.orbs);

    this.state.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.orbs !== prevProps.orbs)
      this.setState({ orbTree: Orb.buildTree(this.props.orbs) });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }

  changePlaying = (newPlaying) => {
    const newState = {};
    newState.playing = newPlaying;
    if (newPlaying && this.state.time >= this.props.length)
      newState.time = 0;

    window.clearInterval(this.state.timer);
    if (newPlaying) {
      newState.timer = window.setInterval(
        this.incrementTime,
        Math.floor(1000 / this.props.fps)
      );
    }
    this.setState(newState);
  };

  changeTime = (newTime) => {
    if (newTime < 0) {
      if (this.props.loop)
        newTime = (newTime % this.props.length) + this.props.length;
      else
        newTime = 0;
    }
    if (newTime > this.props.length) {
      if (this.props.loop)
        newTime = newTime % this.props.length;
      else {
        newTime = this.props.length;
        this.changePlaying(false);
      }
    }
    this.setState({ time: newTime });
  };

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

  render() {
    return (
      <TimeContext.Provider
        value={{
          orbTree: this.state.orbTree,
          playing: this.state.playing,
          time: this.state.time,
          changePlaying: this.changePlaying,
          changeTime: this.changeTime,
          incrementTime: this.incrementTime,
          decrementTime: this.decrementTime
        }}
      >
        {this.props.children}
      </TimeContext.Provider>
    );
  }
}

Time.contextType = TimeContext;

const mapStateToProps = (state) => ({
  orbs: state.orbs,
  fps: state.fps,
  length: state.length,
  loop: state.loop,
  speed: state.speed
});

Time = connect(mapStateToProps)(Time);

export { Time };

export { TimeContext };
