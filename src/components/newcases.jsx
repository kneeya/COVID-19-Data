import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, stroke, responsiveFun,lgXaxisLabels } from "./options";
import trans from "../translations.json";
import dict from "../dictionary";
import covidData from "../covidData.json";

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
    const cData = [...covidData.result.records];
    const chartData = cData.splice(cData.length - 22, cData.length - 1);

    var datez = chartData.map((item) => {
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

    var delta = chartData
      .map((item, z) => {
        if (chartData[z - 1]) {
          var result = item[dict.totaCases] - chartData[z - 1][dict.totaCases];
          return result;
        }
      })
      .filter((item) => {
        if (!item) {
          return false;
        } else {
          return true;
        }
      });

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
        // dataLabels: {
        //   enabled: true,
        //   //textAnchor: "start",
        //   offsetY: -30,
        //   style: { ...labelStyle },
        //   formatter: function (val, opt) {
        //     if (opt.dataPointIndex % 2) {
        //       return "+" + val;
        //     } else {
        //       return "";
        //     }
        //   },
        // },
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
          labels: {...lgXaxisLabels },
        },
        // responsive: [
        //   {
        //     breakpoint: 640,
        //     options: {
        //       chart: {
        //         height: "300px",
        //         width: "100%",
        //         toolbar: {
        //           tools: {
        //             zoomin: false,
        //             zoomout: false,
        //           },
        //         },
        //       },
        //       xaxis: {
        //         labels: {
        //           hideOverlappingLabels: true,
        //           offsetY: 10,
        //           style: { ...labelStyle, fontSize: "12px" },
        //         },
        //       },
        //       legend: {
        //         fontSize: "12px",
        //       },
        //       dataLabels: {
        //         offsetY: -18,
        //         style: { ...labelStyle, fontSize: "10px" },
        //         orientation: "horizontal",
        //         background: {
        //           enabled: true,
        //           foreColor: "#fff",
        //           padding: 2,
        //           borderRadius: 1,
        //           borderWidth: 1,
        //           borderColor: "#fff",
        //           opacity: 0.8,
        //         },
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 1163,
        //     options: {
        //       chart: {
        //         height: "400px",
        //         width: "100%",
        //       },
        //       xaxis: {
        //         labels: {
        //           hideOverlappingLabels: true,
        //           offsetY: 10,
        //           style: { ...labelStyle },
        //         },
        //       },
        //     },
        //   },
        //   {
        //     breakpoint: 1530,
        //     options: {
        //       chart: {
        //         height: "500px",
        //         width: "100%",
        //       },
        //       xaxis: {
        //         labels: {
        //           offsetY: 10,
        //           style: { ...labelStyle },
        //         },
        //       },
        //     },
        //   },
        // ],
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
export default NewCases;
