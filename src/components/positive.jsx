import React, { Component } from "react";
import chart from "tui-chart";
//import covid from "covidtesting.csv";

class Positive extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {
    datez: [],
    confPos: []
  };
  componentDidMount() {
    this.dataParse();
  }

  dataParse() {
    var csv = require("./covidtesting.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.makeChart
    });
  }

  makeChart(results) {
    const data = results.data;

    var dates = [];
    var confPos = [];

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (row[0]) {
        dates[i] = row[0];
      }
      if (row[5]) {
        confPos[i] = row[5];
      }
    }
    console.log(dates, confPos);

    setTimeout(() => {
      var container = document.getElementById("positive");
      var conf = confPos;
      var datez = dates;
      var data = {
        categories: datez,
        series: [
          {
            name: "Total Tested",
            data: [
              3.8,
              5.6,
              7.0,
              9.1,
              12.4,
              15.3,
              17.5,
              17.8,
              15.0,
              10.6,
              6.4,
              3.7
            ]
          },
          {
            name: "Confirmed Positives",
            data: conf
          },
          {
            name: "Recovered",
            data: [
              -10.3,
              -9.1,
              -4.1,
              4.4,
              12.2,
              16.3,
              18.5,
              16.7,
              10.9,
              4.2,
              -2.0,
              -7.5
            ]
          },
          {
            name: "Deaths",
            data: [
              -13.2,
              -13.7,
              -13.1,
              -10.3,
              -6.1,
              -3.2,
              0.0,
              -0.1,
              -1.8,
              -4.5,
              -9.0,
              -10.9
            ]
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
          title: ""
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
  }

  render() {
    return <div id="positive"></div>;
  }
}
export default Positive;
