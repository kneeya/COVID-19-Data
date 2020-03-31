import React, { Component } from "react";
import "./loading.css";

class Loading extends Component {
  state = {};

  render() {
    return (
      <div className="case">
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        <div className="list"></div>
        {/* <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li> */}
      </div>
    );
  }
}

export default Loading;
