import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsiveFun } from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";

class AgeBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
    //this.makeChart = this.makeChart.bind(this);
  }
  state = {
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
    var cD = Object.values(ReducedData.reduceAges);

    var a, b, c;
    const reso = cD
      .filter((item) => {
        if (item[dict.Age_Group] === "Unknown") {
          a = item[dict.resolved];
          return false;
        } else {
          return true;
        }
      })
      .map((item) => {
        return item[dict.resolved];
      });

    const active = cD
      .filter((item) => {
        if (item[dict.Age_Group] === "Unknown") {
          b = item[dict.NotResolved];
          return false;
        } else {
          return true;
        }
      })
      .map((item) => {
        return item[dict.NotResolved];
      });

    const fatal = cD
      .filter((item) => {
        if (item[dict.Age_Group] === "Unknown") {
          c = item[dict.deaths];
          return false;
        } else {
          return true;
        }
      })
      .map((item) => {
        return item[dict.deaths];
      });

    this.setState({
      series: [
        {
          name: trans.agebreak.active[this.props.lang],
          data: active,
        },
        {
          name: trans.agebreak.resolved[this.props.lang],
          data: reso,
        },
        {
          name: trans.agebreak.fatal[this.props.lang],
          data: fatal,
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun(),
        chart: {
          height: 650,
          width: "100%",
          type: "bar",
          stacked: true,
          zoom: { enabled: true },
        },
        //title: { text: "Breakdown by Age and Sex" },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          offsetX: 25,
          style: { ...labelStyle },
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            let indices = w.config.series.map((item, i) => i);
            indices = indices.filter(
              (i) =>
                !w.globals.collapsedSeriesIndices.includes(i) &&
                w.config.series[i].data[dataPointIndex] > 0
            );
            if (seriesIndex === indices[indices.length - 1])
              return w.globals.stackedSeriesTotals[dataPointIndex];
            return "";
          },
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
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
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

    var unknowns = a + b + c;
    this.setState({ ready: true, unk: unknowns });
    this.setState({ ready: true });
  }

  render() {
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
