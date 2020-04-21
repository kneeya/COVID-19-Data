import React, { Component, useRef } from "react";
import "./ds.scss";
import "./App.css";
import Loading from "./components/loading/loading";
import trans from "./translations.json";
import Overview from "./components/overview";
// import GoogleTagManager from "./components/tagManager/tagManager"
// charts & tables
import CasesTotal from "./components/casesTotal.jsx";
import CasesTotalTable from "./components/casesTotal-table.jsx";

import CasesDaily from "./components/casesDaily.jsx";
import CasesDailyTable from "./components/casesDaily-table.jsx";

import DeathsTotal from "./components/deathsTotal.jsx";
import DeathsTotalTable from "./components/deathsTotal-table.jsx";

import DeathsDaily from "./components/deathsDaily.jsx";
import DeathsDailyTable from "./components/deathsDaily-table.jsx";

import RegBreak from "./components/regbreak.jsx";
import RegBreakTable from "./components/regbreak-table.jsx";

import Hospital from "./components/hospital.jsx";
import HospitalTable from "./components/hospital-table.jsx";

import ActiveHospital from "./components/activeHospital.jsx";
import ActiveHospitalTable from "./components/activeHospital-table.jsx";

import CasesByAge from "./components/casesByAge.jsx";
import CasesByAgeTable from "./components/casesByAge-table.jsx";

import CasesBySex from "./components/casesBySex.jsx";
import CasesBySexTable from "./components/casesBySex-table.jsx";

import TestsTotal from "./components/testsTotal.jsx";
import TestsTotalTable from "./components/testsTotal-Table.jsx";

import TestsDaily from "./components/testsDaily.jsx";
import TestsDailyTable from "./components/testsDaily-Table.jsx";

var Url = require("url-parse");

const currLang = () => {
  const url = Url(window.location.href, true);
  console.log("url", url);
  if (url.query.lang === "fr") {
    return url.query.lang;
  } else {
    return "en";
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, lang: currLang(), accessible: false };
  }

  componentDidMount() {
    this.display();
  }

  componentDidUpdate(prevProps, prevState) {}

  display = () => {
    this.setState({ loaded: true });
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
          {props.accessToggle && <Accessible executeScroll={executeScroll} />}
          {props.children}
        </div>
      );
    };

    const lang = this.state.lang,
      accessible = this.state.accessible;

    // console.log('accessible', accessible, this.testRef)

    return (
      <div id="ontario-covid-viz">
        {/* <GoogleTagManager gtmId={'GTM-5G4CS4L'} /> */}
        {this.state.loaded ? (
          <React.Fragment>
            <div className="ontario-row">
              <a href="#test-link">Test Link</a>
              <div id="overview" className="item item-2">
                <h2>{trans.overview.title[lang]}</h2>
                <Overview lang={this.state.lang} />
              </div>
              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  {trans.otp.title[lang]}
                </h2>
              </div>
              <div class="ontario-row">
                <div class="ontario-columns ontario-small-12 ontario-medium-4">
                  <a style={{ textDecoration: "none" }} href="#CasesTotal">
                    {trans.casesTotal.title[lang]}{" "}
                  </a>{" "}
                  |{" "}
                  <a style={{ textDecoration: "none" }} href="#CasesDaily">
                    {trans.casesDaily.title[lang]}
                  </a>
                  <br />​
                  <a style={{ textDecoration: "none" }} href="#DeathsTotal">
                    {trans.deathsTotal.title[lang]}
                  </a>{" "}
                  |{" "}
                  <a style={{ textDecoration: "none" }} href="#DeathsDaily">
                    {trans.deathsDaily.title[lang]}
                  </a>
                  <br />​
                  <a style={{ textDecoration: "none" }} href="#InICU">
                    {trans.hospital.active[lang]}
                  </a>
                  <br />​
                  <a style={{ textDecoration: "none" }} href="#Hospital">
                    {trans.hospital.title[lang]}
                  </a>
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-4">
                  <a style={{ textDecoration: "none" }} href="#regbreak">
                    {trans.reg.title[lang]}
                  </a>
                  <br />​
                  <a style={{ textDecoration: "none" }} href="#CasesByAge">
                    {trans.casesByAge.title[lang]}
                  </a>
                  <br />
                  <a style={{ textDecoration: "none" }} href="#CasesBySex">
                    {trans.casesBySex.title[lang]}
                  </a>
                  <br />
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-4">
                  <a style={{ textDecoration: "none" }} href="#TotalTests">
                    {trans.testing.titleA[lang]}
                  </a>{" "}
                  |{" "}
                  <a style={{ textDecoration: "none" }} href="#TotalTestsDaily">
                    {trans.testing.titleB[lang]}
                  </a>
                  <br />
                  <a style={{ textDecoration: "none" }} href="#future">
                    {trans.future.title[lang]}
                  </a>
                  <br />
                  <a style={{ textDecoration: "none" }} href="#understand">
                    {trans.understand.title[lang]}
                  </a>
                </div>
              </div>
              <hr class="hrule-a" />​
              <div className="ontario-row">
                <div
                  id="CasesTotal"
                  className="item item-2 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.casesTotal.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <CasesTotalTable lang={this.state.lang} />
                    ) : (
                      <CasesTotal lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>

                <div
                  id="CasesDaily"
                  className="item item-2 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.casesDaily.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <CasesDailyTable lang={this.state.lang} />
                    ) : (
                      <CasesDaily lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />​
              <div className="ontario-row">
                <div
                  id="DeathsTotal"
                  className="item item-2 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.deathsTotal.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <DeathsTotalTable lang={this.state.lang} />
                    ) : (
                      <DeathsTotal lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>

                <div
                  id="DeathsDaily"
                  className="item item-2 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.deathsDaily.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <DeathsDailyTable lang={this.state.lang} />
                    ) : (
                      <DeathsDaily lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />​
              <div className="ontario-row">
                <div
                  id="InICU"
                  className="item item-6 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.hospital.active[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <ActiveHospitalTable lang={this.state.lang} />
                    ) : (
                      <ActiveHospital lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
                <div
                  id="Hospital"
                  className="item item-6 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.hospital.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <HospitalTable lang={this.state.lang} />
                    ) : (
                      <Hospital lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />​
              <div id="regbreak" className="item item-6">
                {/* show only on phones */}
                <div className="ontario-show-for-small-only">
                  <ItemWrapper
                    title={trans.reg.title[lang]}
                    accessToggle={false}
                  >
                    <RegBreakTable lang={this.state.lang} />
                  </ItemWrapper>
                </div>
                ​{/* show only on all else */}
                <div className="ontario-hide-for-small-only">
                  <ItemWrapper
                    title={trans.reg.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <RegBreakTable lang={this.state.lang} />
                    ) : (
                      <RegBreak lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />​
              <div className="ontario-row">
                <div
                  id="CasesByAge"
                  className="item item-7 ontario-columns ontario-small-12 ontario-medium-6"
                  title={trans.casesByAge.title[lang]}
                >
                  <ItemWrapper
                    title={trans.casesByAge.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <CasesByAgeTable lang={this.state.lang} />
                    ) : (
                      <CasesByAge lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
                <div
                  id="CasesBySex"
                  className="item item-7 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.casesBySex.title[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <CasesBySexTable lang={this.state.lang} />
                    ) : (
                      <CasesBySex lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />
              <div className="ontario-row">
                <div
                  id="TotalTests"
                  className="item item-7 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.testing.titleA[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <TestsTotalTable lang={this.state.lang} />
                    ) : (
                      <TestsTotal lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
                <div
                  id="TotalTestsDaily"
                  className="item item-7 ontario-columns ontario-small-12 ontario-medium-6"
                >
                  <ItemWrapper
                    title={trans.testing.titleB[lang]}
                    accessToggle={true}
                  >
                    {accessible ? (
                      <TestsDailyTable lang={this.state.lang} />
                    ) : (
                      <TestsDaily lang={this.state.lang} />
                    )}
                  </ItemWrapper>
                </div>
              </div>
              <hr class="hrule" />
              <div id="future" className="item item-7">
                <ItemWrapper title={trans.future.title[lang]}></ItemWrapper>
                <a href="https://files.ontario.ca/moh-covid-19-modelling-potential-scenarios-en-2020-04-20.pdf">
                  COVID-19: Modelling and Potential Scenarios
                </a>
                <p>[Insert text]</p>
              </div>
              <hr class="hrule" />
              <div id="understand">
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  {trans.understand.title[lang]}
                </h2>
                <p>[Insert text]</p>
                {/* <h3>{trans.understand.where[lang]}</h3>
                <p>{trans.understand.wheredesc1[lang]}</p>
                <p>{trans.understand.wheredesc2[lang]}</p>
                <p>{trans.understand.wheredesc3[lang]}</p>
                <h3>{trans.understand.terms[lang]}</h3>
                <p>{trans.understand.inICU[lang]}</p>
                <p>{trans.understand.ICUdesc[lang]}</p> */}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Loading />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
