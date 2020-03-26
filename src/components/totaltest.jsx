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

        dates[i] = row[0];

        if (!row[8]) {
          totaltest[i] = 0;
        } else {
          totaltest[i] = row[8];
        }

        console.log(row);
      }

      setTimeout(() => {
        var container = document.getElementById("totaltest");

        var data = {
          categories: dates,
          series: [
            {
              name: "Total Tested",
              data: totaltest
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
    return <div id="totaltest"></div>;
  }
}
export default TotalTest;
