import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import dict from "../dictionary";
import covidData from "../covidData.json";

import {
  labelStyle,
  tooltip,
  stroke,
  markers,
  legend,
  responsiveFun,
  lgXaxisLabels,
  lineXaxis,
} from "./options";
import trans from "../translations.json";

class TotalTest extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    ready: false,
    dates: [],
    series: [],
    options: {},
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setData();
    }
  }

  setData() {
    const cData = [...covidData.result.records];
    const chartData = cData
      .filter((item) => item[dict.deaths] > 0)
      .map((item) => {
        return [item[dict.reportedDate], item[dict.deaths]];
      });

    this.setState({
      series: [
        {
          name: trans.deathsTotal.deaths[this.props.lang],
          data: chartData,
        },
      ],

      options: {
        legend: legend,
        tooltip: tooltip,
        stroke: stroke,
        responsive: responsiveFun().map((item) => {
          item.options.xaxis = { ...lineXaxis };
          return item;
        }),
        chart: {
          zoom: { enabled: true },
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
        },
        yaxis: {
          title: {
            text: trans.deathsTotal.yaxis[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            hideOverlappingLabels: true,
            format: "MMM dd",
            rotateAlways: true,
            rotate: -45,
            offsetY: 5,
            style: { ...labelStyle },
          },
        },
        colors: ["#00B2E3"],
        markers: markers,
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="casesTotal" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TotalTest;
