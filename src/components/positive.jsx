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
    // var dates = [
    //   "2020-01-28",
    //   "2020-01-29",
    //   "2020-01-30",
    //   "2020-01-31",
    //   "2020-02-01",
    //   "2020-02-02",
    //   "2020-02-03",
    //   "2020-02-04",
    //   "2020-02-05",
    //   "2020-02-06",
    //   "2020-02-07",
    //   "2020-02-08",
    //   "2020-02-09",
    //   "2020-02-10",
    //   "2020-02-11",
    //   "2020-02-12",
    //   "2020-02-13",
    //   "2020-02-14",
    //   "2020-02-15",
    //   "2020-02-16",
    //   "2020-02-17",
    //   "2020-02-18",
    //   "2020-02-19",
    //   "2020-02-20",
    //   "2020-02-21",
    //   "2020-02-22",
    //   "2020-02-23",
    //   "2020-02-24",
    //   "2020-02-25",
    //   "2020-02-26",
    //   "2020-02-27",
    //   "2020-02-28",
    //   "2020-02-29",
    //   "2020-03-01",
    //   "2020-03-02",
    //   "2020-03-03",
    //   "2020-03-04",
    //   "2020-03-05",
    //   "2020-03-06",
    //   "2020-03-07",
    //   "2020-03-08",
    //   "2020-03-09",
    //   "2020-03-10",
    //   "2020-03-11",
    //   "2020-03-12",
    //   "2020-03-13"
    // ];
    // var confPos = [
    //   1,
    //   2,
    //   2,
    //   3,
    //   3,
    //   3,
    //   3,
    //   3,
    //   3,
    //   3,
    //   2,
    //   2,
    //   2,
    //   2,
    //   2,
    //   2,
    //   1,
    //   0,
    //   1,
    //   1,
    //   1,
    //   2,
    //   3,
    //   15,
    //   17,
    //   17,
    //   18,
    //   22,
    //   24,
    //   25,
    //   31,
    //   31,
    //   37,
    //   54,
    //   74,
    //   98,
    //   140,
    //   172,
    //   183,
    //   208,
    //   251,
    //   311,
    //   369,
    //   412,
    //   489,
    //   572
    // ];
    const data = results.data;
    console.log(data);
    var dates = [];
    var confPos = [];

    // for (var i = 0; i < csv.length; i++) {
    //   var points = csv.split(",");
    //   dates[i] = points[0];
    //   confPos[i] = points[5];
    // }

    // setTimeout(() => {
    //   var container = document.getElementById("positive");
    //   var conf = confPos;
    //   var datez = dates;
    //   var data = {
    //     categories: datez,
    //     series: [
    //       {
    //         name: "Total Tested",
    //         data: [
    //           3.8,
    //           5.6,
    //           7.0,
    //           9.1,
    //           12.4,
    //           15.3,
    //           17.5,
    //           17.8,
    //           15.0,
    //           10.6,
    //           6.4,
    //           3.7
    //         ]
    //       },
    //       {
    //         name: "Confirmed Positives",
    //         data: conf
    //       },
    //       {
    //         name: "Recovered",
    //         data: [
    //           -10.3,
    //           -9.1,
    //           -4.1,
    //           4.4,
    //           12.2,
    //           16.3,
    //           18.5,
    //           16.7,
    //           10.9,
    //           4.2,
    //           -2.0,
    //           -7.5
    //         ]
    //       },
    //       {
    //         name: "Deaths",
    //         data: [
    //           -13.2,
    //           -13.7,
    //           -13.1,
    //           -10.3,
    //           -6.1,
    //           -3.2,
    //           0.0,
    //           -0.1,
    //           -1.8,
    //           -4.5,
    //           -9.0,
    //           -10.9
    //         ]
    //       }
    //     ]
    //   };
    //   var options = {
    //     chart: {
    //       width: 1160,
    //       height: 540,
    //       title: "Status of COVID-19 cases in Ontario"
    //     },
    //     yAxis: {
    //       title: ""
    //     },
    //     xAxis: {
    //       title: "Month",
    //       pointOnColumn: true,
    //       dateFormat: "MMM",
    //       tickInterval: "auto"
    //     },
    //     series: {
    //       showDot: false,
    //       zoomable: true
    //     },
    //     tooltip: {
    //       suffix: "°C"
    //     }
    //   };
    //   chart.lineChart(container, data, options);
    // }, 0.001);
  }

  render() {
    return <div id="positive"></div>;
  }
}
export default Positive;
