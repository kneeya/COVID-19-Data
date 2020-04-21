import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  responsiveFun,
  stroke,
  lgXaxisLabels,
} from "./options";
import dict from "../dictionary";
import covidData from "../covidData.json";
import trans from "../translations.json";

class TestingYday extends Component {
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
      (item) => item[dict.totalTestsCompletedinthelastday]
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

    var testsDoneYesterday = datz.map((item) => {
      if (!item[dict.totalTestsCompletedinthelastday]) {
        return 0;
      }
      return item[dict.totalTestsCompletedinthelastday];
    });

    this.setState({
      dates: datez,
      testsDoneYesterday: testsDoneYesterday,
      series: [
        {
          name: trans.testing.testsDoneYesterday[this.props.lang],
          data: testsDoneYesterday,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: ["#00b2e3"],
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
          //   bar: {
          //     horizontal: false,
          //   },
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
            ...lgXaxisLabels,
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
            type="bar"
            height="500px"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TestingYday;
