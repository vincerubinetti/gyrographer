import React from 'react';
import { Component } from 'react';

export class View extends Component {
  render() {
    return <g id='view'>{this.props.children}</g>;
  }
}
