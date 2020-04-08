import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsive } from "./options";
import { findAllByAltText } from "@testing-library/react";

class SexBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
    this.makeChart = this.makeChart.bind(this);
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

  sortByAge() {
    setTimeout(() => {
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

      this.setState({
        activesex: activesex,
        resosex: resosex,
        fatalsex: fatalsex,
      });
      this.makeChart();
    }, 0.01);
  }

  makeChart() {
    const asex = this.state.activesex;
    const rsex = this.state.resosex;
    const fsex = this.state.fatalsex;

    this.setState({
      series: [
        {
          name: "Active",
          data: [asex["MALE"], asex["FEMALE"], asex["TRANSGENDER"]],
        },
        {
          name: "Resolved",
          data: [rsex["MALE"], rsex["FEMALE"], rsex["TRANSGENDER"]],
        },
        {
          name: "Fatal",
          data: [fsex["MALE"], fsex["FEMALE"], fsex["TRANSGENDER"]],
        },
      ],
    });
    this.setState({
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsive,
        chart: {
          height: 650,
          width: "100%",
          type: "bar",
          stacked: true,
          zoom: { enabled: true },
        },
        //title: { text: "Breakdown by Age and Sex" },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: ["solid", "pattern"],
          opacity: 1,
          pattern: {
            style: "slantedLines",
          },
        },

        colors: [colours.magenta, colours.green, colours.blue, colours.black],
        plotOptions: {
          bar: { horizontal: false },
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: ["Male", "Female", "Transgender"],
          labels: {
            style: { ...labelStyle },
          },
        },
      },
    });
    var a = asex["UNKNOWN"] || 0;
    var b = rsex["UNKNOWN"] || 0;
    var c = fsex["UNKNOWN"] || 0;

    var unknowns = a + b + c;
    this.setState({ ready: true, unk: unknowns });
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
            />
            <p>There are {this.state.unk} cases of unknown sex. </p>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default SexBreak;
