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
    const chartData = [...covidData.result.records];

    var dates = chartData.map((item) => {
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

    var totaltest = chartData.map((item) => {
      return item[dict.totaCases];
    });

    var confPos = chartData.map((item) => {
      return item[dict.confirmedPositive];
    });
    var resolved = chartData.map((item) => {
      return item[dict.resolved];
    });
    var dead = chartData.map((item) => {
      return item[dict.deaths];
    });

    this.setState({
      totaltest: totaltest,
      dates: dates,
      confPos: confPos,
      resolved: resolved,
      dead: dead,
      series: [
        {
          name: trans.totaltest.total[this.props.lang],
          data: totaltest,
        },
        {
          name: trans.totaltest.positive[this.props.lang],
          data: confPos,
        },
        {
          name: trans.totaltest.resolved[this.props.lang],
          data: resolved,
        },
        {
          name: trans.totaltest.deaths[this.props.lang],
          data: dead,
        },
      ],

      options: {
        legend: legend,
        tooltip: tooltip,
        stroke: stroke,
        responsive: responsiveFun(),
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: dates,
          range: 30,
          labels: {
            style: { ...labelStyle },
          },
        },
        colors: ["#C64A1C", colours.blue, colours.green, colours.black],
        //markers: markers,
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="totaltest" className="chart">
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
export default TotalTest;
