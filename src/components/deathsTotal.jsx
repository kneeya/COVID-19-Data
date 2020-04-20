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
  lineXaxis
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
    const chartData = cData.splice(cData.length - 35, cData.length - 1).map((item) => {
      return [item[dict.reportedDate], item[dict.deaths]];
    });

    this.setState({
      series: [
        {
          name: trans.casesTotal.deaths[this.props.lang],
          data: chartData,
        },
      ],

      options: {
        legend: legend,
        tooltip: tooltip,
        stroke: stroke,
        responsive: responsiveFun().map(item=>{
          item.options.xaxis = {...lineXaxis};
          return item;
        }),
        chart: {zoom: { enabled: true } },
        yaxis: {
          title: {
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            hideOverlappingLabels: true,
            format: 'MMM dd',
            rotateAlways: true,
            rotate: -45,
            offsetY: 5,
            style: { ...labelStyle },
          },
        },
        colors: ["#C64A1C", "#00B2E3", "#39B54A", colours.black],
        markers: markers,
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
