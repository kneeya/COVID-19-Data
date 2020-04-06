import React, { Component } from "react";
import chart from "tui-chart";

class Age extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {};

  componentDidMount() {
    this.makeChart();
  }

  makeChart() {
      const data = this.state.props;

      var below = [];
      var majority = [];
      var elder = [];

      var row = data[data.length - 2];

      console.log(row);

      if (!row[12]) {
        below = 0;
      } else {
        below = row[12];
      }
      if (!row[13]) {
        majority = 0;
      } else {
        majority = row[13];
      }
      if (!row[14]) {
        elder = 0;
      } else {
        elder = row[14];
      }

        var container = document.getElementById("age-gender");
        var data = {
          categories: ["> 64", "20-64", "< 20"],
          series: [
            {
              name: "Positive Cases",
              data: [below, majority, elder]
            }
          ]
        };
        var options = {
          chart: {
            width: 1160,
            height: 650,
            title: "Age Distribution of Positive COVID-19 Cases in Ontario",
            format: "1,000"
          },
          yAxis: {
            title: "Age"
          },
          xAxis: {
            title: "Number of Cases"
          },
          series: {
            showLabel: true
          }
        };
        chart.barChart(container, data, options);

  }

  render() {
    return <div id="age-gender"></div>;
  }
}
export default Age;
