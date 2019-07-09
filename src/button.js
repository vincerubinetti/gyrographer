import React from 'react';
import { Component } from 'react';

import './button.css';

export class Button extends Component {
  render() {
    let contents = this.props.icon1;
    return (
      <button className={'button ' + this.props.className}>{contents}</button>
    );
  }
}
