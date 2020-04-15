import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsive, stroke } from "./options";
import trans from "../translations.json";

class NewCases extends Component {
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
    const data = d.splice(d.length - 22, d.length - 2);

    var datez = [];
    var delta = [];

    // datez = data
    //   .map(function (row) {
    //     return row[0];
    //   })
    //   .filter(function (result) {
    //     if (!result) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });

    for (var i = 1; i < data.length - 1; i++) {
      var tday = data[i];
      var yday = data[i - 1];
      datez[i - 1] = tday[0];
      delta[i - 1] = tday[9] - yday[9];
    }

    this.setState({
      dates: datez,
      delta: delta,
      series: [
        {
          name: trans.newcases.newcase[this.props.lang],
          data: delta,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: [colours.yellow],
        legend: legend,
        tooltip: tooltip,
        chart: {
          type: "bar",

          toolbar: {
            show: true,
          },
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          //textAnchor: "start",
          offsetY: -30,
          style: { ...labelStyle },
          formatter: function (val) {
            if (val < 0) {
              return val;
            } else {
              return "+" + val;
            }
          },
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
            type="bar"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default NewCases;
