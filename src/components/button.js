import React from 'react';
import { Component } from 'react';

import { Tooltip } from './tooltip.js';

import './button.css';

export class Button extends Component {
  render() {
    return (
      <Tooltip text={this.props.tooltip || ''}>
        <button
          className={'button ' + this.props.className}
          onClick={this.props.onClick}
          data-color={this.props.color}
          alt={this.props.tooltip || ''}
        >
          {this.props.children}
        </button>
      </Tooltip>
    );
  }
}
