import React, { Component } from "react";
import "../ds.scss";
import trans from "../translations.json";
import dict from "../dictionary";
import covidData from "../covidData.json";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = { ready: false };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setData();
    }
  }

  setData() {
    const chartData = [...covidData.result.records];

    var tday = chartData[chartData.length - 1];
    var yday = chartData[chartData.length - 2];

    const totaldelta = tday[dict.totaCases] - yday[dict.totaCases];
    this.setState({
      total: tday[dict.totaCases].toLocaleString(),
      totaldelta: totaldelta.toLocaleString(),
    });

    const activecalc =
      tday[dict.confirmedPositive] - yday[dict.confirmedPositive];
    var activedelta = "";
    if (activecalc > 0) {
      activedelta = "+ " + activecalc;
    } else {
      activedelta = activecalc;
    }
    this.setState({
      active: tday[dict.confirmedPositive].toLocaleString(),
      activedelta: activedelta.toLocaleString(),
    });

    const resolveddelta = tday[dict.resolved] - yday[dict.resolved];
    this.setState({
      resolved: tday[dict.resolved].toLocaleString(),
      resolveddelta: resolveddelta.toLocaleString(),
    });

    const deathsdelta = tday[dict.deaths] - yday[dict.deaths];
    this.setState({
      deaths: tday[dict.deaths].toLocaleString(),
      deathsdelta: deathsdelta.toLocaleString(),
    });

    const hospitalcalc =
      tday[dict.patientHospitalizedCOVID19] -
      yday[dict.patientHospitalizedCOVID19];
    var hospitaldelta = "";
    if (hospitalcalc > 0) {
      hospitaldelta = "+ " + hospitalcalc;
    } else {
      hospitaldelta = hospitalcalc;
    }
    this.setState({
      hospital: tday[dict.patientHospitalizedCOVID19].toLocaleString(),
      hospitaldelta: hospitaldelta.toLocaleString(),
    });

    const icucalc =
      tday[dict.patientsICUwCOVID19] - yday[dict.patientsICUwCOVID19];
    var icudelta = "";
    if (icucalc > 0) {
      icudelta = "+ " + icucalc;
    } else {
      icudelta = icucalc;
    }
    this.setState({
      icu: tday[dict.patientsICUwCOVID19].toLocaleString(),
      icudelta: icudelta.toLocaleString(),
    });

    this.setState({ ready: true });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.ready ? (
          <div className="ontario-small-12">
            <ul className="ontario-no-bullet ontario-flex ontario-flex--justify-content ontario-covid-stats">
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.total[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.total}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.totaldelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.active[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.active}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.activedelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.res[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.resolved}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.resolveddelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.deaths[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.deaths}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.deathsdelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.hos[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.hospital}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.hospitaldelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">
                  {trans.overview.icu[this.props.lang]}
                </div>
                <div className="ontario-infographic-number">
                  {this.state.icu}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.icudelta}
                </div>
              </li>
            </ul>
            <p>{trans.overview.bottom[this.props.lang]}</p>
            <a href="https://data.ontario.ca/dataset?keywords_en=COVID-19">
              {trans.catalogue[this.props.lang]}
            </a>
            <br />
            <a href="#">{trans.summaries[this.props.lang]}</a>
            <hr class="hrule-special"></hr>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default Overview;
