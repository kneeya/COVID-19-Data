import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsive } from "./options";
import trans from "../translations.json";

class Stacked extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    data: this.props.data,
    ready: false,
    dates: [],
    series: [],
    options: {},
    lang: this.props.lang,
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setData();
    }
  }

  setData() {
    //copy the array
    const data = [...this.props.data];
    data.splice(1, 29);

    var dates = [];
    var confPos = [];
    var resolved = [];
    var dead = [];

    for (var i = 1; i < data.length - 1; i++) {
      var row = data[i];

      dates[i - 1] = row[0];

      if (!row[5]) {
        if (!confPos[i - 2]) {
          confPos[i - 1] = 0;
        } else {
          confPos[i - 1] = confPos[i - 2];
        }
      } else {
        confPos[i - 1] = row[5];
      }

      if (!row[6]) {
        resolved[i - 1] = 0;
      } else {
        resolved[i - 1] = row[6];
      }

      if (!row[7]) {
        dead[i - 1] = 0;
      } else {
        dead[i - 1] = row[7];
      }
    }

    this.setState({
      dates: dates,
      confPos: confPos,
      resolved: resolved,
      dead: dead,
      series: [
        {
          name: trans.stacked.positive[this.props.lang],
          data: confPos,
        },
        {
          name: trans.stacked.resolved[this.props.lang],
          data: resolved,
        },
        {
          name: trans.stacked.deaths[this.props.lang],
          data: dead,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: [colours.blue, colours.yellow, colours.black],
        legend: legend,
        tooltip: tooltip,
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        xaxis: {
          categories: dates,
          range: 20,
          labels: {
            style: { ...labelStyle },
          },
        },
        responsive: responsive,
        fill: {
          opacity: 1,
        },
      },
      ready: true,
    });
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div id="stacked" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Stacked;
