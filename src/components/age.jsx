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
    setTimeout(() => {
      this.setState({ data: this.props.data });
      const data = this.state.data;

      var below = [];
      var majority = [];
      var elder = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        if (!row[12]) {
          below[i - 1] = 0;
        } else {
          below[i - 1] = row[12];
        }
        if (!row[13]) {
          majority[i - 1] = 0;
        } else {
          majority[i - 1] = row[13];
        }
        if (!row[14]) {
          elder[i - 1] = 0;
        } else {
          elder[i - 1] = row[14];
        }
      }

      setTimeout(() => {
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
      }, 0.001);
    }, 0.001);
  }

  render() {
    return <div id="age-gender"></div>;
  }
}
export default Age;
