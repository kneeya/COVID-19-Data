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
    const chartData = cData.filter((item) => item[dict.totaCases] > 0);

    var dates = chartData.map((item) => {
      return [item[dict.reportedDate], item[dict.totaCases]];
    });

    //console.log("casesTotal Dates:", dates);

    this.setState({
      series: [
        {
          name: trans.casesTotal.total[this.props.lang],
          data: dates,
        },
      ],

      options: {
        legend: legend,
        tooltip: tooltip,
        stroke: stroke,
        markers: markers,
        responsive: responsiveFun().map((item) => {
          item.options.xaxis = { ...lineXaxis };
          return item;
        }),
        chart: {
          type: "line",
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
        <p>{trans.hideshow[this.props.lang]}</p>
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
