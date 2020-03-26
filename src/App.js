import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Positive from "./components/positive.jsx";
import TotalTest from "./components/totaltest.jsx";
import Recovered from "./components/recovered";

class App extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.storeData = this.storeData.bind(this);
  }
  state = {};

  componentWillMount() {
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
        <TotalTest data={this.state.data} />
        <Recovered data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default App;
