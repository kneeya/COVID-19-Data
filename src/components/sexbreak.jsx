import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsiveFun } from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";

class SexBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
    // this.makeChart = this.makeChart.bind(this);
  }
  state = {
    data: this.props.casedata,
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.sortByAge();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.sortByAge();
    }
  }

  sortByAge() {
    const data = this.props.casedata;

    const reso = data
      .map(function (row) {
        if (row[5] === "Resolved") {
          return row[3];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });

    const active = data
      .map(function (row) {
        if (row[5] === "Not Resolved") {
          return row[3];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });

    const fatal = data
      .map(function (row) {
        if (row[5] === "Fatal") {
          return row[3];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });
    // console.log(reso, active, fatal);

    var activesex = {};
    var resosex = {};
    var fatalsex = {};

    for (var i = 0, j = active.length; i < j; i++) {
      activesex[active[i]] = (activesex[active[i]] || 0) + 1;
    }
    for (var t = 0, y = reso.length; t < y; t++) {
      resosex[reso[t]] = (resosex[reso[t]] || 0) + 1;
    }
    for (var x = 0, s = fatal.length; x < s; x++) {
      fatalsex[fatal[x]] = (fatalsex[fatal[x]] || 0) + 1;
    }

    const asex = activesex;
    const rsex = resosex;
    const fsex = fatalsex;

    this.setState({
      series: [
        {
          name: trans.sexbreak.active[this.props.lang],
          data: [asex["MALE"], asex["FEMALE"]],
        },
        {
          name: trans.sexbreak.resolved[this.props.lang],
          data: [rsex["MALE"], rsex["FEMALE"]],
        },
        {
          name: trans.sexbreak.fatal[this.props.lang],
          data: [fsex["MALE"], fsex["FEMALE"]],
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun().map((item, z) => {
          item.options.chart.height = "200px";
          return item;
        }),
        chart: {
          type: "bar",
          stacked: true,
          // zoom: { enabled: true },
        },
        dataLabels: {
          enabled: false,
        },

        colors: ["#00B2E3", "#39B54A", colours.black],
        plotOptions: {
          bar: { horizontal: true, barHeight: "60%" },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: [
            trans.sexbreak.male[this.props.lang],
            trans.sexbreak.female[this.props.lang],
          ],
          labels: {
            style: { ...labelStyle },
          },
        },
      },
    });
    var a = asex["UNKNOWN"] || 0;
    var b = rsex["UNKNOWN"] || 0;
    var c = fsex["UNKNOWN"] || 0;

    var d = asex["TRANSGENDER"] || 0;
    var e = rsex["TRANSGENDER"] || 0;
    var f = fsex["TRANSGENDER"] || 0;

    var unknowns = a + b + c;
    var trand = d + e + f;
    this.setState({ ready: true, unk: unknowns, trank: trand });
  }

  render() {
    return (
      <div id="regional" className="chart">
        {this.state.ready ? (
          <React.Fragment>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="250"
            />
            <p>
              {trans.agebreak.noteA[this.props.lang]} {this.state.trank}
              {trans.sexbreak.noteC[this.props.lang]}
              {this.state.unk} {trans.sexbreak.noteB[this.props.lang]}
            </p>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default SexBreak;
