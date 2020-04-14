import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsive, stroke } from "./options";
import trans from "../translations.json";

class Hospital extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    data: this.props.data,
    ready: false,
    dates: [],
    series: [],
    options: {},
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    //copy the array
    const d = [...this.props.data];
    const data = d.splice(57, d.length - 2);

    var datez = [];
    var notICU = [];
    var ICUwithv = [];
    var ICUwov = [];

    datez = data
      .map(function (row) {
        return row[0];
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });

    notICU = data
      .map(function (row) {
        return row[10] - row[11];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });

    ICUwithv = data
      .map(function (row) {
        return row[12];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });

    ICUwov = data
      .map(function (row) {
        return row[11] - row[12];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });

    this.setState({
      dates: datez,
      notICU: notICU,
      ICUwithv: ICUwithv,
      ICUwov: ICUwov,
      series: [
        {
          name: trans.hospital.hospitalized[this.props.lang],
          data: notICU,
        },
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
        colors: [colours.blue, colours.yellow, colours.black],
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
          labels: {
            style: { ...labelStyle },
          },
        },
        stroke: stroke,
        xaxis: {
          categories: datez,
          labels: {
            style: { ...labelStyle },
          },
        },
        responsive: responsive,
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
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Hospital;
