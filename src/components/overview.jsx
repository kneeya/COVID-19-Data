import React, { Component } from "react";
import "../ds.scss";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = { ready: false };

  componentDidMount() {
    this.setData();
  }

  setData() {
    const data = this.props.data;

    var tday = data[data.length - 2];
    var yday = data[data.length - 3];

    const totaldelta = tday[9] - yday[9];
    this.setState({ total: tday[9], totaldelta: totaldelta });

    const activecalc = tday[5] - yday[5];
    var activedelta = "";
    if (activecalc > 0) {
      activedelta = "+ " + activecalc;
    } else {
      activedelta = activecalc;
    }
    this.setState({ active: tday[5], activedelta: activedelta });

    const resolveddelta = tday[6] - yday[6];
    this.setState({ resolved: tday[6], resolveddelta: resolveddelta });

    const deathsdelta = tday[7] - yday[7];
    this.setState({ deaths: tday[7], deathsdelta: deathsdelta });

    const hospitalcalc = tday[10] - yday[10];
    var hospitaldelta = "";
    if (hospitalcalc > 0) {
      hospitaldelta = "+ " + hospitalcalc;
    } else {
      hospitaldelta = hospitalcalc;
    }
    this.setState({ hospital: tday[10], hospitaldelta: hospitaldelta });

    const icucalc = tday[11] - yday[11];
    var icudelta = "";
    if (icucalc > 0) {
      icudelta = "+ " + icucalc;
    } else {
      icudelta = icucalc;
    }
    this.setState({ icu: tday[11], icudelta: icudelta });

    this.setState({ ready: true });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.ready ? (
          <div className="number-container">
            <div className="number-wrap">
              <p>Total</p>
              <p>{this.state.total}</p>
              <p>+ {this.state.totaldelta}</p>
            </div>
            <div className="number-wrap">
              <p>Active</p>
              <p>{this.state.active}</p>
              <p>{this.state.activedelta}</p>
            </div>
            <div className="number-wrap">
              <p>Resolved</p>
              <p>{this.state.resolved}</p>
              <p>+ {this.state.resolveddelta}</p>
            </div>
            <div className="number-wrap">
              <p>Deaths</p>
              <p>{this.state.deaths}</p>
              <p>+ {this.state.deathsdelta}</p>
            </div>
            <div className="number-wrap">
              <p>Hospitalized</p>
              <p>{this.state.hospital}</p>
              <p>{this.state.hospitaldelta}</p>
            </div>
            <div className="number-wrap">
              <p>In ICU</p>
              <p>{this.state.icu}</p>
              <p>{this.state.icudelta}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default Overview;
