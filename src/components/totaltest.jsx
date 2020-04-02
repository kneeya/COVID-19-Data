import React, { Component } from "react";
import chart from "tui-chart";

class TotalTest extends Component {
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
      var totaltest = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        if (!row[9]) {
          totaltest[i - 1] = totaltest[i - 2];
        } else {
          totaltest[i - 1] = row[9];
        }
      }

      setTimeout(() => {
        var container = document.getElementById("totaltest");

        var data = {
          categories: dates,
          series: [
            {
              name: "Total Cases",
              data: totaltest
            }
          ]
        };

        var theme = {
          series: {
            colors: ["#c00264"]
          }
        };
        chart.registerTheme("totaltest", theme);

        var options = {
          theme: "totaltest",
          chart: {
            width: 1160,
            height: 650,
            title: "Total Cases of COVID-19 in Ontario"
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
    return <div id="totaltest"></div>;
  }
}
export default TotalTest;
