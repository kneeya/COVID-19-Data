import React, { Component } from "react";
import chart from "tui-chart";

class Stacked extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {};

  componentDidMount() {
    this.makeChart();
    this.setState({ data: this.props.data });
  }

  makeChart() {
    setTimeout(() => {
      this.setState({ data: this.props.data });
      const data = this.state.data;

      var dates = [];

      var confPos = [];
      var rec = [];
      var death = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        dates[i - 1] = row[0];
        if (!row[5]) {
          confPos[i - 1] = 0;
        } else {
          confPos[i - 1] = row[5];
        }
        if (!row[6]) {
          rec[i - 1] = 0;
        } else {
          rec[i - 1] = row[6];
        }
        if (!row[7]) {
          death[i - 1] = 0;
        } else {
          death[i - 1] = row[7];
        }
      }

      setTimeout(() => {
        var container = document.getElementById("stacked");

        var data = {
          categories: dates,
          series: [
            {
              name: "Confirmed Positives",
              data: confPos
            },
            {
              name: "Recovered",
              data: rec
            },
            {
              name: "Deaths",
              data: death
            }
          ]
        };
        var options = {
          chart: {
            width: 1160,
            height: 650,
            title: "Status of COVID-19 cases in Ontario",
            format: "1,000"
          },
          xAxis: {
            title: "Cases",
            tickInterval: "auto"
          },
          yAxis: {
            title: "Date"
          },
          series: {
            stackType: "normal"
          },
          legend: {
            align: "bottom"
          },
          tooltip: {
            grouped: true
          }
        };
        chart.columnChart(container, data, options);
      }, 0.001);
    }, 0.001);
  }

  render() {
    return <div id="stacked"></div>;
  }
}
export default Stacked;
