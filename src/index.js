import React, { Component } from "react";
import ReactDOM from "react-dom";
import InteractResizable from "./InteractResizable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        widthPercent: "100%"
      }
    };
  }

  getValue = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <div
          style={{
            border: "1px solid #000",
            width: "400px",
            lineHeight: "0"
          }}
        >
          <InteractResizable
            child={{
              className: "resize-container",
              style: {
                margin: "0 auto"
              }
            }}
            preserveAspectRatio
            min={{ width: 100 }}
            getValue={this.getValue}
            edges={{
              top: false,
              left: false,
              bottom: ".resize-bottom",
              right: ".resize-right"
            }}
          >
            <img
              className="resize-img"
              src="https://s3-ap-southeast-1.amazonaws.com/images.apps.com/places/2019/01/08/cjqn79xcd0000v8tt4z265jxq_l.jpg"
            />
          </InteractResizable>
        </div>

        <p>
          width : {this.state.value.width} ({this.state.value.widthPercent})
        </p>
        <p>height : {this.state.value.height}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
