import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip } from "./options";
import trans from "../translations.json";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";

class RegBreak extends Component {
  constructor(props) {
    super(props);
    this.makeCities = this.makeCities.bind(this);
  }
  state = {
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.makeCities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setData();
    }
  }

  makeCities() {
    var cD = Object.values(ReducedData.reducePHU);
    cD.sort(function (a, b) {
      return parseFloat(
        b[dict.resolved] +
          b[dict.NotResolved] +
          b[dict.deaths] -
          (a[dict.resolved] + a[dict.NotResolved] + a[dict.deaths])
      );
    });

    const region = cD.map((item) => {
      return item[dict.Reporting_PHU];
    });

    const active = cD.map((item) => {
      return item[dict.NotResolved];
    });
    const resolved = cD.map((item) => {
      return item[dict.resolved];
    });

    const fatal = cD.map((item) => {
      return item[dict.deaths];
    });

    this.setState({
      region: region,

      series: [
        {
          name: trans.reg.active[this.props.lang],
          data: active,
        },
        {
          name: trans.reg.resolved[this.props.lang],
          data: resolved,
        },
        {
          name: trans.reg.deaths[this.props.lang],
          data: fatal,
        },
      ],
      options: {
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                width: "680px",
                height: "1000px",
              },
              yaxis: {
                reversed: true,
                labels: {
                  style: { color: colours.black, fontSize: "12px" },
                  maxWidth: 300,
                  offsetX: -5,
                },
              },
            },
          },
          {
            breakpoint: 1163,
            options: {
              chart: {
                height: "1000px",
                width: "100%",
              },
            },
          },
          {
            breakpoint: 1530,
            options: {
              chart: {
                height: "1000px",
                width: "100%",
              },
            },
          },
        ],
        chart: {
          height: 1000,
          width: "100%",
          type: "bar",
          stacked: true,
          zoom: { enabled: true },
        },
        //title: { text: "Cases by City" },
        dataLabels: {
          enabled: true,

          textAnchor: "end",
          offsetX: -20,
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
        colors: ["#00B2E3", "#8dc63f", "#4d4d4d"],
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        tooltip: tooltip,
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        yaxis: {
          reversed: true,
          labels: {
            style: { ...labelStyle },
            maxWidth: 500,
          },
        },
        xaxis: {
          title: {
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          categories: region,
          labels: {
            show: true,
            style: { ...labelStyle },
          },
          max:
            Math.ceil(
              (cD[0][dict.NotResolved] +
                cD[0][dict.resolved] +
                cD[0][dict.deaths]) /
                1000
            ) * 1000,
        },
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="regional" className="chart">
        <p>{trans.reg.hideshow[this.props.lang]}</p>
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default RegBreak;
