import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsiveFun } from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";
class AgeBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
    //this.makeChart = this.makeChart.bind(this);
  }
  state = {
    data: this.props.casedata,
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.sortByAge();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.sortByAge();
    }
  }

  sortByAge() {
    const data = this.props.casedata;

    const reso = data
      .map(function (row) {
        if (row[5] === "Resolved") {
          return row[2];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });

    const active = data
      .map(function (row) {
        if (row[5] === "Not Resolved") {
          return row[2];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });

    const fatal = data
      .map(function (row) {
        if (row[5] === "Fatal") {
          return row[2];
        }
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });
    //console.log(reso, active, fatal);

    var activeages = {};
    var resoages = {};
    var fatalages = {};

    for (var i = 0, j = active.length; i < j; i++) {
      activeages[active[i]] = (activeages[active[i]] || 0) + 1;
    }
    for (var t = 0, y = reso.length; t < y; t++) {
      resoages[reso[t]] = (resoages[reso[t]] || 0) + 1;
    }
    for (var x = 0, s = fatal.length; x < s; x++) {
      fatalages[fatal[x]] = (fatalages[fatal[x]] || 0) + 1;
    }
    //console.log(fatalages);

    const aage = activeages;
    const rage = resoages;
    const fage = fatalages;

    this.setState({
      series: [
        {
          name: trans.agebreak.active[this.props.lang],
          data: [
            aage["<20"],
            aage["20s"],
            aage["30s"],
            aage["40s"],
            aage["50s"],
            aage["60s"],
            aage["70s"],
            aage["80s"],
            aage["90s"],
          ],
        },
        {
          name: trans.agebreak.resolved[this.props.lang],
          data: [
            rage["<20"],
            rage["20s"],
            rage["30s"],
            rage["40s"],
            rage["50s"],
            rage["60s"],
            rage["70s"],
            rage["80s"],
            rage["90s"],
          ],
        },
        {
          name: trans.agebreak.fatal[this.props.lang],
          data: [
            fage["<20"] || 0,
            fage["20s"] || 0,
            fage["30s"] || 0,
            fage["40s"] || 0,
            fage["50s"] || 0,
            fage["60s"] || 0,
            fage["70s"] || 0,
            fage["80s"] || 0,
            fage["90s"] || 0,
          ],
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun(),
        chart: {
          //          height: 650,
          width: "100%",
          type: "bar",
          stacked: true,
          zoom: { enabled: true },
        },
        //title: { text: "Breakdown by Age and Sex" },
        dataLabels: {
          enabled: false,
        },
        // fill: {
        //   type: ["solid", "pattern"],
        //   opacity: 1,
        //   pattern: {
        //     style: "slantedLines",
        //   },
        // },

        colors: ["#00B2E3", "#39B54A", colours.black],
        plotOptions: {
          bar: { horizontal: true },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: [
            trans.agebreak.under20[this.props.lang],
            "20-29",
            "30-39",
            "40-49",
            "50-59",
            "60-69",
            "70-79",
            "80-89",
            "90-99",
          ],
          labels: {
            style: { ...labelStyle },
          },
        },
      },
    });

    var a = aage["Unknown"] || 0;
    var b = rage["Unknown"] || 0;
    var c = fage["Unknown"] || 0;

    var unknowns = a + b + c;
    this.setState({ ready: true, unk: unknowns });
    this.setState({ ready: true });
  }

  // makeChart() {
  //   aage = this.state.activeages;
  //   rage = this.state.resoages;
  //   fage = this.state.fatalages;

  //   this.setState({
  //     series: [
  //       {
  //         name: trans.agebreak.active[this.props.lang],
  //         data: [
  //           aage["<20"],
  //           aage["20s"],
  //           aage["30s"],
  //           aage["40s"],
  //           aage["50s"],
  //           aage["60s"],
  //           aage["70s"],
  //           aage["80s"],
  //           aage["90s"],
  //         ],
  //       },
  //       {
  //         name: trans.agebreak.resolved[this.props.lang],
  //         data: [
  //           rage["<20"],
  //           rage["20s"],
  //           rage["30s"],
  //           rage["40s"],
  //           rage["50s"],
  //           rage["60s"],
  //           rage["70s"],
  //           rage["80s"],
  //           rage["90s"],
  //         ],
  //       },
  //       {
  //         name: trans.agebreak.fatal[this.props.lang],
  //         data: [
  //           fage["<20"] || 0,
  //           fage["20s"] || 0,
  //           fage["30s"] || 0,
  //           fage["40s"] || 0,
  //           fage["50s"] || 0,
  //           fage["60s"] || 0,
  //           fage["70s"] || 0,
  //           fage["80s"] || 0,
  //           fage["90s"] || 0,
  //         ],
  //       },
  //     ],
  //   });
  //   this.setState({
  //     options: {
  //       legend: legend,
  //       tooltip: tooltip,
  //       responsive: responsiveFun(),
  //       chart: {
  //         height: 650,
  //         width: "100%",
  //         type: "bar",
  //         stacked: true,
  //         zoom: { enabled: true },
  //       },
  //       //title: { text: "Breakdown by Age and Sex" },
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       // fill: {
  //       //   type: ["solid", "pattern"],
  //       //   opacity: 1,
  //       //   pattern: {
  //       //     style: "slantedLines",
  //       //   },
  //       // },

  //       colors: [colours.blue, colours.green, colours.black],
  //       plotOptions: {
  //         bar: { horizontal: true },
  //       },
  //       stroke: {
  //         width: 2,
  //         colors: ["#fff"],
  //       },
  //       yaxis: {
  //         labels: {
  //           style: { ...labelStyle },
  //         },
  //       },
  //       xaxis: {
  //         categories: [
  //           trans.agebreak.under20[this.props.lang],
  //           "20-29",
  //           "30-39",
  //           "40-49",
  //           "50-59",
  //           "60-69",
  //           "70-79",
  //           "80-89",
  //           "90-99",
  //         ],
  //         labels: {
  //           style: { ...labelStyle },
  //         },
  //       },
  //     },
  //   });

  //   var a = aage["UNKNOWN"] || 0;
  //   var b = rage["UNKNOWN"] || 0;
  //   var c = fage["UNKNOWN"] || 0;

  //   var unknowns = a + b + c;
  //   this.setState({ ready: true, unk: unknowns });
  //   this.setState({ ready: true });
  // }

  render() {
    console.log("this", this);
    return (
      <div id="regional" className="chart">
        {this.state.ready ? (
          <React.Fragment>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
            />
            <p>
              {trans.agebreak.noteA[this.props.lang]} {this.state.unk}{" "}
              {trans.agebreak.noteB[this.props.lang]}
            </p>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default AgeBreak;
