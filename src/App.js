import React, { Component, useRef } from "react";
//import { readRemoteFile } from "react-papaparse";
import "./ds.scss";
import "./App.css";
import Positive from "./components/positive.jsx";
import TotalTest from "./components/totaltest.jsx";
import Recovered from "./components/recovered";
import Deaths from "./components/deaths";
import Stacked from "./components/stacked.jsx";
import StackedTable from "./components/stacked-table.jsx";

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
import NewCases from "./components/newcases.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, ready: false, lang: "en", accessible: false };

  componentDidMount() {
    this.dataParse();
    this.dataParseCase();
  }

  componentDidUpdate(prevProps, prevState) {
    // this.refSetter();
    if (prevState.accessible !== this.state.accessible) {
      //alert("Changed")
      //this.scrollToRef(this.testRef)
    }
  }

  dataParseCase = () => {
    var csv = require("./casedataFile.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeCaseData,
    });

    // readRemoteFile(
    //   "https://cors-anywhere.herokuapp.com/https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv",
    //   {
    //     download: true,
    //     complete: this.storeCaseData,
    //   }
    // );
  };

  storeCaseData = (results) => {
    let parsedD = results.data;
    this.setState({ casedata: parsedD, ready: true });
    // console.log(this.state.casedata);
  };

  dataParse = () => {
    //reading a local file

    var csv = require("./dataFile.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeData,
    });

    //reading a remote file

    // readRemoteFile(
    //   "https://cors-anywhere.herokuapp.com/https://data.ontario.ca/dataset/f4f86e54-872d-43f8-8a86-3892fd3cb5e6/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11/download/covidtesting.csv",
    //   {
    //     download: true,
    //     complete: this.storeData,
    //   }
    // );
  };
  display = () => {
    //console.log(this.state.data);
    this.setState({ loaded: true });
  };

  storeData = (results) => {
    let parsedD = results.data;
    this.setState({ data: parsedD });
    this.display();
  };

  handleLangToggle = () => {
    this.setState({
      lang: this.state.lang === "en" ? "fr" : "en",
    });
  };

  handleAccesibleToggle = (e, executeScroll) => {
    e.preventDefault();
    this.setState({ accessible: !this.state.accessible });
  };

  scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  render() {
    const Accessible = (props) => (
      <p>
        {trans.accessible.select[lang]}
        <a
          className=""
          onClick={(e) => {
            this.handleAccesibleToggle(e);
            //Focus the item being viewed on toggle of accessibility
            //Todo: Fix strange scroll behaviour because heights of page change when toggle of charts and tables
            //props.executeScroll();
          }}
          href="#"
          style={{ margin: "10px" }}
        >
          {this.state.accessible
            ? trans.accessible.disable[lang]
            : trans.accessible.enable[lang]}
        </a>
      </p>
    );

    const ItemWrapper = (props) => {
      const myRef = useRef(null);
      const executeScroll = () => this.scrollToRef(myRef);
      //console.log('props',executeScroll)
      return (
        <div ref={myRef}>
          <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
            {props.title}
          </h2>
          <Accessible executeScroll={executeScroll} />
          {props.children}
        </div>
      );
    };

    const lang = this.state.lang,
      accessible = this.state.accessible;

    // console.log('accessible', accessible, this.testRef)

    return (
      <React.Fragment>
        {this.state.loaded && this.state.ready ? (
          <React.Fragment>
            <a
              className="ontario-button ontario-button--tertiary"
              href="#"
              onClick={this.handleLangToggle}
            >
              {lang === "en" ? "Français" : "English"}
            </a>

            <div className="ontario-row">
              <h1>{trans.hero.title[lang]}</h1>

              <p className="ontario-lead-statement">
                {trans.hero.lead[lang]} This page is available in accessible
                format <Accessible />
              </p>

              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  On this Page:
                </h2>
                <a style={{ textDecoration: "none" }} href="#stacked">
                  {trans.stacked.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#hospitalization">
                  {trans.hospital.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#regbreak">
                  {trans.reg.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#agebreak">
                  {trans.agebreak.title[lang]}
                </a>
                <br />
                <a style={{ textDecoration: "none" }} href="#sexbreak">
                  {trans.sexbreak.title[lang]}
                </a>
                <br />
              </div>

              <div id="stacked" className="item item-2">
                <ItemWrapper title={trans.totaltest.title[lang]}>
                  {accessible ? (
                    <StackedTable
                      data={this.state.data}
                      lang={this.state.lang}
                    />
                  ) : (
                    <TotalTest data={this.state.data} lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div id="newcases" className="item item-2">
                <ItemWrapper title={trans.newcases.title[lang]}>
                  {accessible ? (
                    <div>Future Table</div>
                  ) : (
                    <NewCases data={this.state.data} lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>

              <div id="hospitalization" className="item item-6">
                <ItemWrapper title={trans.hospital.title[lang]}>
                  {accessible ? (
                    <div>Future Table</div>
                  ) : (
                    <Hospital data={this.state.data} lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>

              <div id="regbreak" className="item item-6">
                <ItemWrapper title={trans.reg.title[lang]}>
                  {accessible ? (
                    <div>Future Table</div>
                  ) : (
                    <RegBreak
                      casedata={this.state.casedata}
                      lang={this.state.lang}
                    />
                  )}
                </ItemWrapper>
              </div>

              <div
                id="agebreak"
                className="item item-7"
                title={trans.agebreak.title[lang]}
              >
                <ItemWrapper title={trans.agebreak.title[lang]}>
                  {accessible ? (
                    <div>Future Table</div>
                  ) : (
                    <AgeBreak
                      casedata={this.state.casedata}
                      lang={this.state.lang}
                    />
                  )}
                </ItemWrapper>
              </div>

              <div id="sexbreak" className="item item-7">
                <ItemWrapper title={trans.sexbreak.title[lang]}>
                  {accessible ? (
                    <div>Future Table</div>
                  ) : (
                    <SexBreak
                      casedata={this.state.casedata}
                      lang={this.state.lang}
                    />
                  )}
                </ItemWrapper>
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
