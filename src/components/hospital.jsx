import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  responsiveFun,
  stroke,
  markers,
  lgXaxisLabels,
  lineXaxis
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

    var notICU = datz.map((item) => {
      return [
        item[dict.reportedDate],item[dict.patientHospitalizedCOVID19]];
    });

    var ICUwithv = datz.map((item) => {
      return [
        item[dict.reportedDate],item[dict.patientsICUventilatorwCOVID19]];
    });

    var ICUwov = datz.map((item) => {
      return [
        item[dict.reportedDate],item[dict.patientsICUwCOVID19]];
    });

    this.setState({
      series: [
        {
          name: trans.hospital.hospitalized[this.props.lang],
          data: notICU,
        },
        {
          name: trans.hospital.icu[this.props.lang],
          data: ICUwov,
        },
        // {
        //   name: trans.hospital.icuv[this.props.lang],
        //   data: ICUwithv,
        // },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: ["#00B2E3", "#1A1A1A"],
        markers: markers,
        stroke: stroke,
        legend: legend,
        tooltip: tooltip,
        chart: {
          type: "line",

          toolbar: {
            show: true,
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
        xaxis: {...lineXaxis },
        responsive: responsiveFun(),
        fill: {
          opacity: 1,
        },
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="stacked" className="chart">
        <p>{trans.hideshow[this.props.lang]}</p>
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
