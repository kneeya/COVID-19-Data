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
          <div className="ontario-small-12 ontario-columns">
            <ul className="ontario-no-bullet ontario-flex ontario-flex--justify-content ontario-covid-stats">
              <li>
                <div className="ontario-infographic-text">Total</div>
                <div className="ontario-infographic-number">
                  {this.state.total}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.totaldelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">Active</div>
                <div className="ontario-infographic-number">
                  {this.state.active}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.activedelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">Resolved</div>
                <div className="ontario-infographic-number">
                  {this.state.resolved}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.resolveddelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">Deaths</div>
                <div className="ontario-infographic-number">
                  {this.state.deaths}
                </div>
                <div className="ontario-infographic-subtext">
                  + {this.state.deathsdelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">Hospitalized</div>
                <div className="ontario-infographic-number">
                  {this.state.hospital}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.hospitaldelta}
                </div>
              </li>
              <li>
                <div className="ontario-infographic-text">In ICU</div>
                <div className="ontario-infographic-number">
                  {this.state.icu}
                </div>
                <div className="ontario-infographic-subtext">
                  {this.state.icudelta}
                </div>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default Overview;
