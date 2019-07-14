import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

import './tooltip.css';

const delay = 500;

export class Tooltip extends Component {
  constructor() {
    super();

    this.state = {};
    this.state.open = false;
    this.state.x = 0;
    this.state.y = 0;
    this.state.opacity = 0;
  }

  onMouseEnter = (event) => {
    const target = event.currentTarget;
    window.setTimeout(() => this.openTooltip(target), delay);
    this.setState({ hover: true });
  };

  openTooltip = (target) => {
    if (!this.state.hover || !target) {
      this.setState({ open: false });
      return;
    }

    const left = target.getBoundingClientRect().left + window.scrollX;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const right = target.getBoundingClientRect().right + window.scrollX;
    const bottom = target.getBoundingClientRect().bottom + window.scrollY;

    this.setState({
      open: true,
      left: left,
      top: top,
      right: right,
      bottom: bottom
    });
  };

  onMouseLeave = () => {
    this.setState({ hover: false, open: false });
  };

  render() {
    if (!this.props.text)
      return <>{this.props.children}</>;

    const props = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };

    const children = React.Children.map(this.props.children, (element) => {
      if (React.isValidElement(element))
        return React.cloneElement(element, props);
      else if (typeof element === 'string')
        return <span {...props}>{element}</span>;
      else
        return element;
    });

    return (
      <>
        {children}
        {this.state.open && (
          <Popup
            text={this.props.text}
            open={this.state.open}
            left={this.state.left}
            top={this.state.top}
            right={this.state.right}
            bottom={this.state.bottom}
          />
        )}
      </>
    );
  }
}

class Popup extends Component {
  constructor() {
    super();

    this.ref = React.createRef();

    this.state = {};
    this.state.width = 0;
    this.state.height = 0;
  }

  componentDidMount() {
    this.getDimensions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text)
      this.getDimensions();
  }

  getDimensions = () => {
    const width = this.ref.current.getBoundingClientRect().width;
    const height = this.ref.current.getBoundingClientRect().height;
    this.setState({ width: width, height: height });
  };

  render() {
    let left = (this.props.left + this.props.right) / 2;
    let top = this.props.top;

    left -= this.state.width / 2;
    top -= this.state.height;
    top -= 5;

    if (left < 0)
      left = 0;
    if (left + this.state.width > window.innerWidth)
      left = this.props.right - this.state.width;

    return ReactDOM.createPortal(
      <div
        ref={this.ref}
        className="tooltip"
        style={{
          left: left + 'px',
          top: top + 'px'
        }}
      >
        {this.props.text}
      </div>,
      document.body
    );
  }
}
