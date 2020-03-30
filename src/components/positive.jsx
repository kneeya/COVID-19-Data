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
      var confPos = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];
        if (!row[5]) {
          confPos[i - 1] = confPos[i - 2];
        } else {
          confPos[i - 1] = row[5];
        }
      }

      setTimeout(() => {
        var container = document.getElementById("positive");

        var data = {
          categories: dates,
          series: [
            {
              name: "Confirmed Positives",
              data: confPos
            }
          ]
        };
        var options = {
          chart: {
            width: 400,
            height: 150,
            title: "Positive Cases of COVID-19 in Ontario"
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
