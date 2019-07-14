import React from 'react';
import { Component } from 'react';

import { Tooltip } from './tooltip.js';

import './button.css';

export class Button extends Component {
  onClick = (event) => {
    if (event.ctrlKey)
      (this.props.onCtrlClick || (() => null))();
    else
      (this.props.onClick || (() => null))();
  };

  render() {
    return (
      <Tooltip text={this.props.tooltip || ''}>
        <button
          className={'button ' + this.props.className}
          onClick={this.onClick}
          data-color={this.props.color}
          alt={this.props.tooltip || ''}
        >
          {this.props.children}
        </button>
      </Tooltip>
    );
  }
}
