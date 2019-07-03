import React from 'react';
import { Component } from 'react';

export class Paths extends Component {
  render() {
    return <g id='paths'>{this.props.children}</g>;
  }
}
