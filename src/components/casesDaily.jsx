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

class CasesDaily extends Component {
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
    const chartData = cData.filter((item) => item[dict.totaCases] > 0);

    var dailydata = chartData
      .map((item, z) => {
        if (chartData[z - 1]) {
          return [
            item[dict.reportedDate],
            item[dict.totaCases] - chartData[z - 1][dict.totaCases],
          ];
        }
      })
      .filter((item) => item !== undefined);

    this.setState({
      series: [
        {
          name: "New cases",
          data: dailydata,
        },
      ],
      plotOptions: {
        bar: {
          // horizontal: true,
          dataLabels: {
            //position: "top",
          },
        },
      },
      options: {
        legend: legend,
        tooltip: tooltip,
        //stroke: stroke,
        dataLabels: {
          enabled: false,
        },
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
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: { ...lineXaxis },
        colors: ["#00B2E3"],
        //markers: markers,
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
            type="bar"
            height="400px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default CasesDaily;
