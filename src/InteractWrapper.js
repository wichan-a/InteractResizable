import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import Interact from "interactjs";

class InteractWrapper extends Component {
  static defaultProps = {
    draggable: false,
    resizable: false,
    draggableOptions: {},
    resizableOptions: {}
  };

  componentDidMount() {
    this.interact = Interact(findDOMNode(this.node));
    this.setInteractions();
  }

  componentDidUpdate() {
    this.interact = Interact(findDOMNode(this.node));
    this.setInteractions();
  }

  setInteractions() {
    if (this.props.draggable)
      this.interact.draggable(this.props.draggableOptions);
    if (this.props.resizable)
      this.interact.resizable(this.props.resizableOptions);
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: node => (this.node = node),
      draggable: false
    });
  }
}

InteractWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  draggable: PropTypes.bool,
  draggableOptions: PropTypes.object,
  resizable: PropTypes.bool,
  resizableOptions: PropTypes.object
};

export default InteractWrapper;
