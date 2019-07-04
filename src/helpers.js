import React from 'react';
import { Component } from 'react';

import './helpers.css'

export class Helpers extends Component {
  render() {
    return <g id='helpers'>{this.props.children}</g>;
  }
}
