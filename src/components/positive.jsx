import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, stroke, responsive } from "./options";
import trans from "../translations.json";

class Positive extends Component {
  constructor(props) {
    super(props);
    // this.makeChart = this.makeChart.bind(this);
    this.setData = this.setData.bind(this);
  }
  state = {
    dataz: this.props.data,
    ready: false,
    datez: [],
    confPosi: [],
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    //copy the array
    const data = [...this.props.data];

    console.log("positive", data);

    const confi = data.map(function (row) {
      if (!row[5]) {
        return 0;
      } else {
        return row[5];
      }
    });
    const confiPos = confi.slice(1, confi.length - 1);

    const datez = data.map(function (row) {
      return row[0];
    });
    const dates = datez.slice(1, datez.length - 1);

    this.setState({
      confPosi: confiPos,
      datez: dates,
      series: [
        {
          name: trans.positive.confpos[this.props.lang],
          data: confiPos,
        },
      ],

      options: {
        chart: {
          type: "line",
          zoom: { enabled: true },
        },
        stroke: stroke,
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
        dataLabels: {
          enabled: true,
          style: { fontSize: "14px" },
          textAnchor: "end",
        },
        tooltip: tooltip,
        colors: [colours.red],
        responsive: responsive,
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="positive" className="chart">
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
export default Positive;
