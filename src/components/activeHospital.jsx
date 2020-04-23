import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  responsiveFun,
  stroke,
  lineXaxis,
} from "./options";
import dict from "../dictionary";
import covidData from "../covidData.json";
import trans from "../translations.json";

class Hospital extends Component {
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

  setData() {
    const datz = [...covidData.result.records].filter(
      (item) => item[dict.patientHospitalizedCOVID19]
    );

    var hospital = datz.map((item) => {
      return [item[dict.reportedDate], item[dict.patientHospitalizedCOVID19]];
    });

    var active = datz.map((item) => {
      return [item[dict.reportedDate], item[dict.confirmedPositive]];
    });

    this.setState({
      series: [
        {
          name: trans.hospital.positive[this.props.lang],
          data: active,
          type: "area",
        },
        {
          name: trans.hospital.hospitalized[this.props.lang],
          data: hospital,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: ["#00B2E3", "#4d4d4d"],
        legend: legend,
        stroke: stroke,
        markers: {
          size: 3,
          colors: ["#00b2e3", "#4d4d4d"],
          strokeColors: "#fff",
          strokeWidth: 1,
          hover: {
            size: 9,
          },
        },
        tooltip: tooltip,
        chart: {
          type: "line",
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
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          title: {
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },

        xaxis: {
          ...lineXaxis,
        },
        responsive: responsiveFun().map((item) => {
          item.options.xaxis = { ...lineXaxis };
          return item;
        }),
        fill: {
          opacity: [0.5, 1],
        },
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="stacked" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            height="500px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Hospital;
