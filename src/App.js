import React, { Component, useRef } from "react";
//import { readRemoteFile } from "react-papaparse";
import "./ds.scss";
import "./App.css";
import TotalTest from "./components/totaltest.jsx";
import TotalTable from "./components/total-table.jsx";
import Loading from "./components/loading/loading.jsx";
import trans from "./translations.json";
import AgeBreak from "./components/agebreak.jsx";
import SexBreak from "./components/sexbreak.jsx";
import RegBreak from "./components/regbreak.jsx";
import Overview from "./components/overview.jsx";
import Hospital from "./components/hospital.jsx";
import NewCases from "./components/newcases.jsx";
import AgeBreakTable from "./components/agebreak-table.jsx";
import SexBreakTable from "./components/sexbreak-table.jsx";
import RegBreakTable from "./components/regbreak-table.jsx";
import HospitalTable from "./components/hospital-table.jsx";
import NewCasesTable from "./components/newcases-table.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { loading: false, ready: false, lang: "en", accessible: false };

  componentDidMount() {
    this.dataParse();
    this.dataParseCase();
  }

  componentDidUpdate(prevProps, prevState) {}

  dataParseCase = () => {
    var csv = require("./casedataFile.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeCaseData,
    });
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
        <a
          className=""
          onClick={(e) => {
            this.handleAccesibleToggle(e);
            //Focus the item being viewed on toggle of accessibility
            //Todo: Fix strange scroll behaviour because heights of page change when toggle of charts and tables
            //props.executeScroll();
          }}
          href="#"
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

              <p className="ontario-lead-statement">{trans.hero.lead[lang]}</p>
              <div id="overview" className="item item-2">
                <h2>{trans.overview.title[lang]}</h2>
                <Overview data={this.state.data} lang={this.state.lang} />
              </div>

              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  {trans.otp.title[lang]}
                </h2>
                <a style={{ textDecoration: "none" }} href="#stacked">
                  {trans.stacked.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#newcases">
                  {trans.newcases.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#regbreak">
                  {trans.reg.title[lang]}
                </a>
                <br />

                <a style={{ textDecoration: "none" }} href="#hospitalization">
                  {trans.hospital.title[lang]}
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
                    <TotalTable lang={this.state.lang} />
                  ) : (
                    <TotalTest data={this.state.data} lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div id="newcases" className="item item-2">
                <ItemWrapper title={trans.newcases.title[lang]}>
                  {accessible ? (
                    <NewCasesTable lang={this.state.lang} />
                  ) : (
                    <NewCases data={this.state.data} lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>

              <div id="regbreak" className="item item-6">
                <ItemWrapper title={trans.reg.title[lang]}>
                  {accessible ? (
                    <RegBreakTable lang={this.state.lang} />
                  ) : (
                    <RegBreak
                      casedata={this.state.casedata}
                      lang={this.state.lang}
                    />
                  )}
                </ItemWrapper>
              </div>

              <div id="hospitalization" className="item item-6">
                <ItemWrapper title={trans.hospital.title[lang]}>
                  {accessible ? (
                    <HospitalTable lang={this.state.lang} />
                  ) : (
                    <Hospital data={this.state.data} lang={this.state.lang} />
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
                    <AgeBreakTable lang={this.state.lang} />
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
                    <SexBreakTable lang={this.state.lang} />
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
