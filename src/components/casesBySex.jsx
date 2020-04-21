import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import {
  labelStyle,
  tooltip,
  legend,
  lgXaxisLabels,
  responsiveFun,
} from "./options";
import { findAllByAltText } from "@testing-library/react";
import trans from "../translations.json";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";

class SexBreak extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
  }
  state = {
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.sortByAge();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.sortByAge();
    }
  }

  sortByAge() {
    var cD = Object.values(ReducedData.reduceSex);
    var a = 0;
    var b = 0;
    var c = 0;

    const reso = cD
      // .filter((item) => {
      //   if (item[dict.CLIENT_GENDER] === "UNKNOWN") {
      //     a = a + item[dict.resolved];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
      //     b = b + item[dict.resolved];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "OTHER") {
      //     c = c + item[dict.resolved];
      //     return false;
      //   } else {
      //     return true;
      //   }
      // })
      .map((item) => {
        return item[dict.resolved];
      });

    const active = cD
      // .filter((item) => {
      //   if (item[dict.CLIENT_GENDER] === "UNKNOWN") {
      //     a = a + item[dict.NotResolved];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
      //     b = b + item[dict.NotResolved];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "OTHER") {
      //     c = c + item[dict.NotResolved];
      //     return false;
      //   } else {
      //     return true;
      //   }
      // })
      .map((item) => {
        return item[dict.NotResolved];
      });
    const fatal = cD
      // .filter((item) => {
      //   if (item[dict.CLIENT_GENDER] === "UNKNOWN") {
      //     a = a + item[dict.deaths];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
      //     b = b + item[dict.deaths];
      //     return false;
      //   } else if (item[dict.CLIENT_GENDER] === "OTHER") {
      //     c = c + item[dict.deaths];
      //     return false;
      //   } else {
      //     return true;
      //   }
      // })
      .map((item) => {
        return item[dict.deaths];
      });

    this.setState({
      series: [
        {
          name: trans.casesBySex.active[this.props.lang],
          data: active,
        },
        {
          name: trans.casesBySex.resolved[this.props.lang],
          data: reso,
        },
        {
          name: trans.casesBySex.fatal[this.props.lang],
          data: fatal,
        },
      ],
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun().map((item) => {
          item.options.chart.height = "300px";
          return item;
        }),
        chart: {
          type: "bar",
          stacked: true,
          // zoom: { enabled: true },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          offsetX: 35,
          style: { ...labelStyle },
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            let indices = w.config.series.map((item, i) => i);
            indices = indices.filter(
              (i) =>
                !w.globals.collapsedSeriesIndices.includes(i) &&
                w.config.series[i].data[dataPointIndex] > 0
            );
            if (seriesIndex === indices[indices.length - 1])
              return w.globals.stackedSeriesTotals[dataPointIndex];
            return "";
          },
        },

        colors: ["#00B2E3", "#8dc63f", "#1a1a1a"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "60%",
            dataLabels: {
              position: "bottom",
            },
          },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        yaxis: {
          title: {
            text: trans.casesBySex.sex[this.props.lang],
          },
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          title: {
            offsetY: 20,
            text: trans.casesTotal.yaxis[this.props.lang],
          },
          categories: [
            trans.casesBySex.male[this.props.lang],
            trans.casesBySex.female[this.props.lang],
            trans.casesBySex.trans[this.props.lang],
            trans.casesBySex.other[this.props.lang],
            trans.casesBySex.unknown[this.props.lang],
          ],
          labels: {
            ...lgXaxisLabels,
          },
        },
      },
    });

    var unknowns = a;
    var trand = b;
    var other = c;
    this.setState({ ready: true, unk: unknowns, trank: trand, other: other });
  }

  render() {
    return (
      <div id="regional" className="chart">
        <p>{trans.hideshow[this.props.lang]}</p>
        {this.state.ready ? (
          <React.Fragment>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="250"
            />
            {/* <p>
              {trans.casesByAge.noteA[this.props.lang]} {this.state.trank}
              {trans.casesBySex.noteTran[this.props.lang]}
              {this.state.other} {trans.casesBySex.noteOth[this.props.lang]}
              {this.state.unk} {trans.casesBySex.noteUnk[this.props.lang]}
            </p> */}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default SexBreak;
