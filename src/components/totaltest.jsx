import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  stroke,
  markers,
  legend,
  responsive,
} from "./options";
import trans from "../translations.json";

class TotalTest extends Component {
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
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    const data = [...this.props.data];

    var dates = [];
    var totaltest = [];
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

      if (!row[9]) {
        if (!totaltest[i - 2]) {
          totaltest[i - 1] = 0;
        } else {
          totaltest[i - 1] = totaltest[i - 2];
        }
      } else {
        totaltest[i - 1] = row[9];
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
      totaltest: totaltest,
      dates: dates,
      confPos: confPos,
      resolved: resolved,
      dead: dead,
      series: [
        {
          name: trans.totaltest.total[this.props.lang],
          data: totaltest,
        },
        {
          name: trans.totaltest.positive[this.props.lang],
          data: confPos,
        },
        {
          name: trans.totaltest.resolved[this.props.lang],
          data: resolved,
        },
        {
          name: trans.totaltest.deaths[this.props.lang],
          data: dead,
        },
      ],

      options: {
        legend: legend,
        tooltip: tooltip,
        stroke: stroke,
        responsive: responsive,
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: dates,
          range: 30,
          labels: {
            style: { ...labelStyle },
          },
        },
        colors: [colours.teal, colours.magenta, colours.orange, colours.green],
        markers: markers,
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="totaltest" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TotalTest;
