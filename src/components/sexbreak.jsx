import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend } from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";

class SexBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
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
    var cD = Object.values(ReducedData.reduceSex);
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    const reso = cD
      .filter((item) => {
        if (
          item[dict.CLIENT_GENDER] === "UNKNOWN" ||
          item[dict.CLIENT_GENDER] === "OTHER"
        ) {
          a = a + item[dict.resolved];
          return false;
        } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
          d = d + item[dict.resolved];
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
        if (
          item[dict.CLIENT_GENDER] === "UNKNOWN" ||
          item[dict.CLIENT_GENDER] === "OTHER"
        ) {
          a = a + item[dict.NotResolved];
          return false;
        } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
          e = e + item[dict.NotResolved];
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
        if (
          item[dict.CLIENT_GENDER] === "UNKNOWN" ||
          item[dict.CLIENT_GENDER] === "TRANSGENDER" ||
          item[dict.CLIENT_GENDER] === "OTHER"
        ) {
          a = a + item[dict.deaths];
          return false;
        } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
          f = f + item[dict.deaths];
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
          name: trans.sexbreak.active[this.props.lang],
          data: active,
        },
        {
          name: trans.sexbreak.resolved[this.props.lang],
          data: reso,
        },
        {
          name: trans.sexbreak.fatal[this.props.lang],
          data: fatal,
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                offsetX: 10,
                height: "200px",
                width: "100%",
                toolbar: {
                  tools: {
                    zoomin: false,
                    zoomout: false,
                  },
                },
              },
              yaxis: {
                labels: {
                  style: { ...labelStyle, fontSize: "12px" },
                },
              },
              xaxis: {
                labels: {
                  hideOverlappingLabels: true,
                  offsetY: 10,
                  style: { ...labelStyle, fontSize: "12px" },
                },
              },
              legend: {
                fontSize: "12px",
              },
              dataLabels: {
                offsetX: -4,
                style: { ...labelStyle, fontSize: "12px" },
                orientation: "horizontal",
              },
            },
          },
          {
            breakpoint: 1163,
            options: {
              chart: {
                height: "200px",
                width: "100%",
              },
              xaxis: {
                labels: {
                  hideOverlappingLabels: true,
                  offsetY: 10,
                  style: { ...labelStyle },
                },
              },
            },
          },
          {
            breakpoint: 1530,
            options: {
              chart: {
                height: "200px",
                width: "100%",
              },
              xaxis: {
                labels: {
                  offsetY: 10,
                  style: { ...labelStyle },
                },
              },
            },
          },
        ],
        chart: {
          type: "bar",
          stacked: true,
          // zoom: { enabled: true },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          offsetX: 20,
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

        colors: ["#00B2E3", "#39B54A", colours.black],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
            dataLabels: {
              position: "bottom",
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
          title: {
            text: trans.totaltest.yaxis[this.props.lang],
          },
          categories: [
            trans.sexbreak.male[this.props.lang],
            trans.sexbreak.female[this.props.lang],
          ],
          labels: {
            style: { ...labelStyle },
          },
        },
      },
    });

    var unknowns = a + b + c;
    var trand = d + e + f;
    this.setState({ ready: true, unk: unknowns, trank: trand });
  }

  render() {
    return (
      <div id="regional" className="chart">
        <p>{trans.hideshow[this.props.lang]}</p>
        {this.state.ready ? (
          <React.Fragment>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="250"
            />
            <p>
              {trans.agebreak.noteA[this.props.lang]} {this.state.trank}
              {trans.sexbreak.noteC[this.props.lang]}
              {this.state.unk} {trans.sexbreak.noteB[this.props.lang]}
            </p>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default SexBreak;
