import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Positive from "./components/positive.jsx";
import TotalTest from "./components/totaltest.jsx";
import Recovered from "./components/recovered";
import Deaths from "./components/deaths";
import Stacked from "./components/stacked.jsx";

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
        <div class="container">
          <div class="item item-1">
            <Positive data={this.state.data} />
          </div>
          <div class="item item-2">
            <TotalTest data={this.state.data} />
          </div>
          <div class="item item-3">
            <Recovered data={this.state.data} />
          </div>
          <div class="item item-4">
            <Deaths data={this.state.data} />
          </div>
        </div>
        <Stacked data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default App;
