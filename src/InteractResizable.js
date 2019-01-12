import React, { Component } from "react";
import PropTypes from "prop-types";
import InteractWrapper from "./InteractWrapper";

import "./styles.css";

class InteractResizable extends Component {
  static defaultProps = {
    insideScope: true,
    container: {},
    child: {},
    resizable: true,
    edges: {
      top: true,
      left: true,
      bottom: true,
      right: true
    },
    min: {
      width: 50,
      height: 50
    },
    preserveAspectRatio: false
  };

  constructor(props) {
    super(props);
    this.state = {
      container: {}
    };
  }

  componentDidMount() {
    this.setState({
      container: {
        width: this.container.clientWidth,
        height: this.container.clientHeight
      }
    });
  }

  render() {
    const resizableOptions = {
      edges: this.props.edges,
      preserveAspectRatio: this.props.preserveAspectRatio,

      // keep the edges inside the parent
      restrictEdges: {
        outer: "parent",
        endOnly: true
      },

      // minimum size
      restrictSize: {
        min: this.props.min
      },

      inertia: false,
      onmove: event => {
        let target = event.target;
        let x = parseFloat(target.getAttribute("data-x")) || 0;
        let y = parseFloat(target.getAttribute("data-y")) || 0;

        let width = event.rect.width;
        let height = event.rect.height;

        // height auto percent
        let originalHeightPercent = (height * 100) / width;

        if (this.props.insideScope && this.props.preserveAspectRatio) {
          if (width > this.state.container.width) {
            width = this.state.container.width;
            height = (this.state.container.width * originalHeightPercent) / 100;
          } else {
            height = (width * originalHeightPercent) / 100;
          }

          if (width <= this.props.min.width) {
            width = this.props.min.width;
            height = (this.props.min.width * originalHeightPercent) / 100;
          }
        }

        target.style.width = width + "px";
        target.style.height = height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);

        let widthRemain =
          ((this.state.container.width - width) / this.state.container.width) *
          100;
        let widthPercent = 100 - Math.round(widthRemain) + "%";
        let heightPercent = "auto";

        width = Math.round(width) + "px";
        height = Math.round(height) + "px";

        this.setState(
          {
            child: {
              width,
              height,
              widthPercent,
              heightPercent
            },
            container: {
              width: this.container.clientWidth,
              height: this.container.clientHeight
            }
          },
          () => {
            if (this.props.getValue) this.props.getValue(this.state.child);
          }
        );
      }
    };

    return (
      <div
        {...this.props.container}
        ref={container => (this.container = container)}
      >
        <InteractWrapper
          resizable={this.props.resizable}
          resizableOptions={resizableOptions}
        >
          <div {...this.props.child}>
            {this.props.children}

            {this.props.edges.top === ".resize-top" && (
              <div className="btn-resize resize-top" />
            )}

            {this.props.edges.bottom === ".resize-bottom" && (
              <div className="btn-resize resize-bottom" />
            )}

            {this.props.edges.left === ".resize-left" && (
              <div className="btn-resize resize-left" />
            )}

            {this.props.edges.right === ".resize-right" && (
              <div className="btn-resize resize-right" />
            )}
          </div>
        </InteractWrapper>
      </div>
    );
  }
}

InteractResizable.propTypes = {
  children: PropTypes.node.isRequired,
  resizable: PropTypes.bool,
  min: PropTypes.object,
  getValue: PropTypes.func
};

export default InteractResizable;
