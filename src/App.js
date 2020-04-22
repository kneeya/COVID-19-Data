import React, { Component, useRef } from "react";
import preval from "preval.macro";
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
          {/* <h3 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
            {props.title}
          </h3> */}
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
            <div>
              <p>
                Last updated:{" "}
                {preval`process.env.TZ = 'America/Toronto'; module.exports = new Date().toLocaleString();`}
                .
              </p>
              <div id="overview" className="item">
                <h2>{trans.overview.title[lang]}</h2>
                <Overview lang={this.state.lang} />
              </div>
              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  {trans.otp.title[lang]}
                </h2>
              </div>
              <div class="arow">
                <a
                  class="acol"
                  style={{ textDecoration: "none" }}
                  href="#casestatus"
                >
                  {trans.otp.casestatus[lang]}{" "}
                </a>
                <a class="acol" style={{ textDecoration: "none" }} href="#demo">
                  {trans.otp.demo[lang]}{" "}
                </a>
                <a
                  class="acol"
                  style={{ textDecoration: "none" }}
                  href="#testing"
                >
                  {trans.otp.testing[lang]}{" "}
                </a>
                <a class="acol" style={{ textDecoration: "none" }} href="#">
                  {trans.otp.future[lang]}{" "}
                </a>
                <a class="acol" style={{ textDecoration: "none" }} href="#">
                  {trans.otp.understand[lang]}{" "}
                </a>
              </div>
            </div>
            <hr class="hrule-a" />​
            <div className="ontario-row">
              <h2 id="casestatus" className="ontario-columns ontario-small-12">
                {trans.otp.casestatus[lang]}
              </h2>
              <div className="ontario-columns ontario-small-12">
                <p>
                  {trans.learn.a[lang]}
                  <a href="#">{trans.learn.b[lang]}</a>
                  {trans.learn.c[lang]}
                  <a href="#">{trans.learn.d[lang]}</a>
                </p>
              </div>
              <div
                id="CasesTotal"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.casesTotal.title[lang]}</h3>
                <p>{trans.casesTotal.desc[lang]}</p>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <CasesTotalTable lang={this.state.lang} />
                  ) : (
                    <CasesTotal lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div
                id="CasesDaily"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.casesDaily.title[lang]}</h3>
                <p>{trans.casesDaily.desc[lang]}</p>
                <ItemWrapper accessToggle={true}>
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
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.deathsTotal.title[lang]}</h3>
                <p>{trans.deathsTotal.desc[lang]}</p>

                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <DeathsTotalTable lang={this.state.lang} />
                  ) : (
                    <DeathsTotal lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div
                id="DeathsDaily"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.deathsDaily.title[lang]}</h3>
                <p>{trans.deathsDaily.desc[lang]}</p>

                <ItemWrapper accessToggle={true}>
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
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.hospital.active[lang]}</h3>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <ActiveHospitalTable lang={this.state.lang} />
                  ) : (
                    <ActiveHospital lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div
                id="Hospital"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.hospital.title[lang]}</h3>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <HospitalTable lang={this.state.lang} />
                  ) : (
                    <Hospital lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
            </div>
            <hr class="hrule" />​
            <div id="regbreak">
              <h2 id="demo">{trans.otp.demo[lang]}</h2>
              <p>
                {trans.learn.a[lang]}
                <a href="#">{trans.learn.b[lang]}</a>
                {trans.learn.c[lang]}
                <a href="#">{trans.learn.d[lang]}</a>
              </p>
              <div className="ontario-show-for-small-only">
                <h3 className="margins">{trans.reg.title[lang]}</h3>
                <p>{trans.reg.desc[lang]}</p>
                <ItemWrapper accessToggle={false}>
                  <RegBreakTable lang={this.state.lang} />
                </ItemWrapper>
              </div>
              <div className="ontario-hide-for-small-only">
                <h3 className="margins">{trans.reg.title[lang]}</h3>
                <p>{trans.reg.desc[lang]}</p>
                <ItemWrapper accessToggle={true}>
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
                className="ontario-columns ontario-small-12 ontario-medium-6"
                title={trans.casesByAge.title[lang]}
              >
                <h3 className="margins">{trans.casesByAge.title[lang]}</h3>
                <p>{trans.reg.desc[lang]}</p>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <CasesByAgeTable lang={this.state.lang} />
                  ) : (
                    <CasesByAge lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div
                id="CasesBySex"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.casesBySex.title[lang]}</h3>
                <p>{trans.reg.desc[lang]}</p>
                <ItemWrapper accessToggle={true}>
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
              <h2 id="testing" className="ontario-columns ontario-small-12">
                {trans.otp.testing[lang]}
              </h2>

              <div className="ontario-columns ontario-small-12">
                <p>
                  {trans.learn.a[lang]}
                  <a href="#">{trans.learn.b[lang]}</a>
                  {trans.learn.c[lang]}
                  <a href="#">{trans.learn.d[lang]}</a>
                </p>
              </div>
              <div
                id="TotalTests"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.testing.titleA[lang]}</h3>
                <p>{trans.testing.descA[lang]}</p>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <TestsTotalTable lang={this.state.lang} />
                  ) : (
                    <TestsTotal lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <div
                id="TotalTestsDaily"
                className="ontario-columns ontario-small-12 ontario-medium-6"
              >
                <h3 className="margins">{trans.testing.titleB[lang]}</h3>
                <p>{trans.testing.descB[lang]}</p>
                <ItemWrapper accessToggle={true}>
                  {accessible ? (
                    <TestsDailyTable lang={this.state.lang} />
                  ) : (
                    <TestsDaily lang={this.state.lang} />
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
      </div>
    );
  }
}

export default App;
