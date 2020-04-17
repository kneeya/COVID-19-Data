import React, { Component, useRef } from "react";
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
        {this.state.loaded ? (
          <React.Fragment>
            <div className="ontario-row">
              <h1>{trans.hero.title[lang]}</h1>

              <p className="ontario-lead-statement">{trans.hero.lead[lang]}</p>
              <div id="overview" className="item item-2">
                <h2>{trans.overview.title[lang]}</h2>
                <Overview lang={this.state.lang} />
              </div>

              <div>
                <h2 className="ontario-margin-bottom-32-! ontario-margin-top-32-!">
                  {trans.understand.title[lang]}
                </h2>
                <h3>{trans.understand.where[lang]}</h3>
                <p>{trans.understand.wheredesc[lang]}</p>
                <h3>{trans.understand.terms[lang]}</h3>
                <p>{trans.understand.inICU[lang]}</p>
                <p>{trans.understand.ICUdesc[lang]}</p>
              </div>

              <hr class="hrule-a"></hr>

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
                <a style={{ textDecoration: "none" }} href="#future">
                  {trans.future.title[lang]}
                </a>
                <br />
              </div>

              <hr class="hrule-a" />
              <div id="stacked" className="item item-2">
                <ItemWrapper title={trans.totaltest.title[lang]}>
                  {accessible ? (
                    <TotalTable lang={this.state.lang} />
                  ) : (
                    <TotalTest lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule" />
              <div id="newcases" className="item item-2">
                <ItemWrapper title={trans.newcases.title[lang]}>
                  {accessible ? (
                    <NewCasesTable lang={this.state.lang} />
                  ) : (
                    <NewCases lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule-b" />
              <div id="regbreak" className="item item-6">
                <ItemWrapper title={trans.reg.title[lang]}>
                  {accessible ? (
                    <RegBreakTable lang={this.state.lang} />
                  ) : (
                    <RegBreak lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule" />
              <div id="hospitalization" className="item item-6">
                <ItemWrapper title={trans.hospital.title[lang]}>
                  {accessible ? (
                    <HospitalTable lang={this.state.lang} />
                  ) : (
                    <Hospital lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule" />
              <div
                id="agebreak"
                className="item item-7"
                title={trans.agebreak.title[lang]}
              >
                <ItemWrapper title={trans.agebreak.title[lang]}>
                  {accessible ? (
                    <AgeBreakTable lang={this.state.lang} />
                  ) : (
                    <AgeBreak lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule" />
              <div id="sexbreak" className="item item-7">
                <ItemWrapper title={trans.sexbreak.title[lang]}>
                  {accessible ? (
                    <SexBreakTable lang={this.state.lang} />
                  ) : (
                    <SexBreak lang={this.state.lang} />
                  )}
                </ItemWrapper>
              </div>
              <hr class="hrule" />
              <div id="future" className="item item-7">
                <ItemWrapper title={trans.future.title[lang]}></ItemWrapper>
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
