import React, { Component } from "react";
import chart from "tui-chart";

class Positive extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {};

  componentDidMount() {
    this.makeChart();
  }

  makeChart() {
    setTimeout(() => {
      this.setState({ data: this.props.data });
      const data = this.state.data;

      var dates = [];

      var resolved = [];
      var confPos = [];
      var totaltest = [];
      var dead = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i] = row[0];

        if (!row[5]) {
          confPos[i] = 0;
        } else {
          confPos[i] = row[5];
        }
        if (!row[6]) {
          resolved[i] = 0;
        } else {
          resolved[i] = row[6];
        }
        if (!row[8]) {
          totaltest[i] = 0;
        } else {
          totaltest[i] = row[8];
        }
        if (!row[7]) {
          dead[i] = 0;
        } else {
          dead[i] = row[7];
        }
        console.log(row);
      }

      setTimeout(() => {
        var container = document.getElementById("positive");

        var data = {
          categories: dates,
          series: [
            {
              name: "Total Tested",
              data: totaltest
            },
            {
              name: "Confirmed Positives",
              data: confPos
            },
            {
              name: "Recovered",
              data: resolved
            },
            {
              name: "Deaths",
              data: dead
            }
          ]
        };
        var options = {
          chart: {
            width: 1160,
            height: 540,
            title: "Status of COVID-19 cases in Ontario"
          },
          yAxis: {
            title: "Number of Cases"
          },
          xAxis: {
            title: "Month",
            pointOnColumn: true,
            dateFormat: "MMM",
            tickInterval: "auto"
          },
          series: {
            showDot: false,
            zoomable: true
          },
          tooltip: {
            suffix: ""
          }
        };
        chart.lineChart(container, data, options);
      }, 0.001);
    }, 0.001);
  }

  render() {
    return <div id="positive"></div>;
  }
}
export default Positive;
