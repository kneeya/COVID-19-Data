import React, { Component } from "react";
import { readRemoteFile } from "react-papaparse";
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
    this.disp = this.display.bind(this);
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
    // readRemoteFile(
    //   "https://cors-anywhere.herokuapp.com/https://data.ontario.ca/dataset/f4f86e54-872d-43f8-8a86-3892fd3cb5e6/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11/download/covidtesting.csv",
    //   {
    //     download: true,
    //     complete: this.storeData
    //   }
    // );
  }
  display() {
    console.log(this.state.data);
    this.setState({ loaded: true });
  }

  storeData(results) {
    let parsedD = results.data;
    this.setState({ data: parsedD });
    this.display();
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? (
          <React.Fragment>
            <Stacked data={this.state.data} />
            <div className="container">
              <div className="item item-1">
                <Positive data={this.state.data} />
              </div>
              <div className="item item-2">
                <TotalTest data={this.state.data} />
              </div>
              <div className="item item-3">
                <Recovered data={this.state.data} />
              </div>
              <div className="item item-4">
                <Deaths data={this.state.data} />
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default App;
