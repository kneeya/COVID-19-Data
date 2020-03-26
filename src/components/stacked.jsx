import React, { Component } from "react";
import chart from "tui-chart";

class Stacked extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
  }

  makeChart(results) {
    // const data = results.data;

    setTimeout(() => {
      var container = document.getElementById("stacked");

      var data = {
        categories: ["June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [
          {
            name: "Budget",
            data: [5000, 3000, 5000, 7000, 6000, 4000, 1000]
          },
          {
            name: "Income",
            data: [8000, 1000, 7000, 2000, 6000, 3000, 5000]
          },
          {
            name: "Expenses",
            data: [4000, 4000, 6000, 3000, 4000, 5000, 7000]
          },
          {
            name: "Debt",
            data: [6000, 3000, 3000, 1000, 2000, 4000, 3000]
          }
        ]
      };
      var options = {
        chart: {
          width: 1160,
          height: 650,
          title: "Monthly Revenue",
          format: "1,000"
        },
        yAxis: {
          title: "Month"
        },
        xAxis: {
          title: "Amount",
          max: 24000
        },
        series: {
          stackType: "normal"
        }
      };
      chart.barChart(container, data, options);
    }, 0.001);
  }

  render() {
    return <div id="stacked"></div>;
  }
}
export default Stacked;
