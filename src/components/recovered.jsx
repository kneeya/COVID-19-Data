import React, { Component } from "react";
import chart from "tui-chart";

class Recovered extends Component {
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

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        if (!row[6]) {
          resolved[i - 1] = 0;
        } else {
          resolved[i - 1] = row[6];
        }
      }

      setTimeout(() => {
        var container = document.getElementById("recovered");

        var data = {
          categories: dates,
          series: [
            {
              name: "Recovered",
              data: resolved
            }
          ]
        };
        var options = {
          chart: {
            width: 1160,
            height: 540,
            title: "Total Recovered from COVID-19 in Ontario"
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
    return <div id="recovered"></div>;
  }
}
export default Recovered;
