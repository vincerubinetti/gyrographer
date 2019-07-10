import React from 'react';
import { Component } from 'react';

import './button.css';

export class Button extends Component {
  render() {
    return (
      <button
        className={'button ' + this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
