import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsiveFun, stroke, lgXaxisLabels } from "./options";
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
    const datz = [...covidData.result.records]
    
    .filter(
      (item) => item[dict.patientHospitalizedCOVID19]
    );

    var datez = datz.map((item) => {
      var date = item[dict.reportedDate].slice(0, 10);
      var monthStrings = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      var result =
        monthStrings[parseInt(date.split("-")[1]) - 1] +
        " " +
        date.slice(8, 10);

      return result;
    });

    var notICU = datz.map((item) => {
      return item[dict.patientHospitalizedCOVID19];
    });

    var ICUwithv = datz.map((item) => {
      return item[dict.patientsICUventilatorwCOVID19];
    });

    var ICUwov = datz.map((item) => {
      return item[dict.patientsICUwCOVID19];
    });

    this.setState({
      dates: datez,
      notICU: notICU,
      ICUwithv: ICUwithv,
      ICUwov: ICUwov,
      series: [
        {
          name: trans.hospital.icu[this.props.lang],
          data: ICUwov,
        },
        {
          name: trans.hospital.icuv[this.props.lang],
          data: ICUwithv,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: ["#00B2E3", colours.yellow, colours.black],
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
        stroke: stroke,
        xaxis: {
          categories: datez,
          labels: {
           ...lgXaxisLabels
          },
        },
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
