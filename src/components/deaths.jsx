import React, { Component } from "react";
import chart from "tui-chart";

class Deaths extends Component {
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
      var dead = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        if (!row[8]) {
          dead[i - 1] = 0;
        } else {
          dead[i - 1] = row[8];
        }
      }

      setTimeout(() => {
        var container = document.getElementById("dead");

        var data = {
          categories: dates,
          series: [
            {
              name: "Deaths",
              data: dead
            }
          ]
        };
        var options = {
          chart: {
            width: 1160,
            height: 650,
            title: "Total COVID-19 related Deaths in Ontario"
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
    return <div id="dead"></div>;
  }
}
export default Deaths;
