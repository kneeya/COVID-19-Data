import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Positive from "./components/positive.jsx";

class App extends Component {
  render() {
    return (
      <ReactFragment>
        <Positive />
      </ReactFragment>
    );
  }
}

export default App;
