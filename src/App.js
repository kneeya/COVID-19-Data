import React, { Component } from "react";
//import { readRemoteFile } from "react-papaparse";
import "./App.css";
import Positive from "./components/positive.jsx";
import TotalTest from "./components/totaltest.jsx";
import Recovered from "./components/recovered";
import Deaths from "./components/deaths";
import Stacked from "./components/stacked.jsx";
import Loading from "./components/loading/loading.jsx";
import Age from "./components/age.jsx";
import City from "./components/city.jsx";
import Regional from "./components/regional.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.storeData = this.storeData.bind(this);
    this.disp = this.display.bind(this);
    this.dataParseCase = this.dataParseCase.bind(this);
    this.storeCaseData = this.storeCaseData.bind(this);
  }
  state = { loading: false, ready: false };

  componentDidMount() {
    this.dataParse();
    this.dataParseCase();
  }

  dataParseCase() {
    var csv = require("./components/conposcovidloc.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeCaseData
    });
  }

  storeCaseData(results) {
    let parsedD = results.data;
    this.setState({ casedata: parsedD, ready: true });
    console.log(this.state.casedata);
  }

  dataParse() {
    //reading a local file

    var csv = require("./components/covidtesting.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeData
    });

    // reading a remote file

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
        {this.state.loaded && this.state.ready ? (
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
              <div className="item item-5">
                <City casedata={this.state.casedata} />
              </div>
              <div className="item item-6">
                <Regional casedata={this.state.casedata} />
              </div>

              <div className="item item-7">
                <Age casedata={this.state.casedata} />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Loading />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
