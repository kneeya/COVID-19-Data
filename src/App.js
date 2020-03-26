import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Positive from "./components/positive.jsx";
import Stacked from "./components/stacked.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.storeData = this.storeData.bind(this);
  }
  state = {};

  componentDidMount() {
    this.dataParse();
  }

  dataParse() {
    var csv = require("./components/covidtesting.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeData
    });
  }

  storeData(results) {
    let parsedD = results.data;
    this.setState({ data: parsedD });
  }
  render() {
    return (
      <React.Fragment>
        <Positive data={this.state.data} />
        <Stacked data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default App;
