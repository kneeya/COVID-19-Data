import React, { Component } from "react";
//import { readRemoteFile } from "react-papaparse";
import "./ds.scss";
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
import trans from "./translations.json";
import AgeBreak from "./components/agebreak.jsx";
import SexBreak from "./components/sexbreak.jsx";
import RegBreak from "./components/regbreak.jsx";
import Overview from "./components/overview.jsx";
import Hospital from "./components/hospital.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.storeData = this.storeData.bind(this);
    this.disp = this.display.bind(this);
    this.dataParseCase = this.dataParseCase.bind(this);
    this.storeCaseData = this.storeCaseData.bind(this);
    this.handleClickFR = this.handleClickFR.bind(this);
    this.handleClickEN = this.handleClickEN.bind(this);
  }
  state = { loading: false, ready: false, lang: "en" };

  componentDidMount() {
    this.dataParse();
    this.dataParseCase();
  }

  dataParseCase() {
    var csv = require("./components/conposcovidloc.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeCaseData,
    });
  }

  storeCaseData(results) {
    let parsedD = results.data;
    this.setState({ casedata: parsedD, ready: true });
    // console.log(this.state.casedata);
  }

  dataParse() {
    //reading a local file

    var csv = require("./components/covidtesting.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeData,
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
    //console.log(this.state.data);
    this.setState({ loaded: true });
  }

  storeData(results) {
    let parsedD = results.data;
    this.setState({ data: parsedD });
    this.display();
  }

  handleClickFR() {
    this.setState((state) => ({
      lang: "fr",
    }));
  }

  handleClickEN() {
    this.setState((state) => ({
      lang: "en",
    }));
  }

  render() {
    const lang = this.state.lang;

    return (
      <React.Fragment>
        {this.state.loaded && this.state.ready ? (
          <React.Fragment>
            <div className="ontario-row">
              <h1>{trans.hero.title[lang]}</h1>
              <p className="ontario-lead-statement"></p>
              <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                Overview
              </h2>
              <Overview data={this.state.data} />

              <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                Summary of Cases in Ontario
              </h2>

              {/* <a
                class="ontario-button ontario-button--tertiary"
                href="#"
                onClick={this.handleClickEN}
              >
                EN
              </a> */}
              <a
                className="ontario-button ontario-button--tertiary"
                href="#"
                onClick={this.handleClickFR}
              >
                FR
              </a>
              <p className="ontario-lead-statement">{trans.hero.lead[lang]}</p>

              <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                Overview
              </h2>
              <Overview data={this.state.data} />

              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  On this Page:
                </h2>
                <a style={{ textDecoration: "none" }} href="#stacked">
                  {trans.stacked.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#totaltest">
                  {trans.totaltest.title[lang]}
                </a>
                <br />
                {/* <a style={{ textDecoration: "none" }} href="#regional">
                  {trans.regional.title[lang]}
                </a>
                <br /> */}
                <a style={{ textDecoration: "none" }} href="#regbreak">
                  Breakdown of Cases Reported by Public Health Units
                </a>
                <br />
                {/* <a style={{ textDecoration: "none" }} href="#age">
                  Breakdown by Age and Sex
                </a> */}
                <a style={{ textDecoration: "none" }} href="#agebreak">
                  {trans.agebreak.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#sexbreak">
                  {trans.sexbreak.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#positive">
                  {trans.positive.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#recovered">
                  {trans.resolved.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#deaths">
                  {trans.deaths.title[lang]}
                </a>
                <br />
              </div>
              <h2
                id="stacked"
                className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
              >
                {trans.stacked.title[lang]}
              </h2>
              <Stacked data={this.state.data} lang={this.state.lang} />
              <div className="item item-2">
                <h2
                  id="totaltest"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.totaltest.title[lang]}
                </h2>
                <TotalTest data={this.state.data} lang={this.state.lang} />
              </div>
              <div className="item item-6">
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  Total Hospitalizations Over Time
                </h2>
                <Hospital data={this.state.data} />
              </div>
              {/* <div className="item item-5">
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  Cases by City
                </h2>
                <City casedata={this.state.casedata} />
              </div> */}
              {/* <div className="item item-6">
                <h2
                  id="regional"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.regional.title[lang]}
                </h2>
                <Regional casedata={this.state.casedata} />
              </div>
                <Regional
                  casedata={this.state.casedata}
                  lang={this.state.lang}
                />
              </div> */}
              <div className="item item-6">
                <h2
                  id="regbreak"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  Breakdown of Cases Reported by Public Health Units
                </h2>
                <RegBreak casedata={this.state.casedata} />
              </div>
              {/* <div className="item item-7">
                <h2
                  id="age"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  Breakdown by Age and Sex
                </h2>
                <Age casedata={this.state.casedata} lang={lang} />
              </div>{" "} */}
              <div className="item item-7">
                <h2
                  id="agebreak"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.agebreak.title[lang]}
                </h2>
                <AgeBreak
                  casedata={this.state.casedata}
                  lang={this.state.lang}
                />
              </div>
              <div className="item item-7">
                <h2
                  id="sexbreak"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.sexbreak.title[lang]}
                </h2>
                <SexBreak
                  casedata={this.state.casedata}
                  lang={this.state.lang}
                />
              </div>
              <div className="item item-1">
                <h2
                  id="positive"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.positive.title[lang]}
                </h2>
                <Positive data={this.state.data} lang={this.state.lang} />
              </div>
              <div className="item item-3">
                <h2
                  id="recovered"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.resolved.title[lang]}
                </h2>
                <Recovered data={this.state.data} lang={this.state.lang} />
              </div>
              <div className="item item-4">
                <h2
                  id="deaths"
                  className="ontario-margin-bottom-32-! ontario-margin-top-32-!"
                >
                  {trans.deaths.title[lang]}
                </h2>
                <Deaths data={this.state.data} lang={this.state.lang} />
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
