import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { labelStyle, tooltip, dataLabelsSize, stroke } from "./options";
import colours from "../ds/styles/sass/variables/colours.variables.scss";

class Recovered extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    data: this.props.data,
    ready: false,
    series: [],
    options: {}
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    const data = [...this.props.data];

    var dates = [];
    var resolved = [];

    for (var i = 1; i < data.length - 1; i++) {
      var row = data[i];

      dates[i - 1] = row[0];

      if (!row[6]) {
        resolved[i - 1] = 0;
      } else {
        resolved[i - 1] = row[6];
      }
    }
    this.setState({
      resolved: resolved,
      dates: dates,
      series: [
        {
          name: "Resolved",
          data: resolved
        }
      ],
      options: {
        tooltip: tooltip,
        dataLabels: {
          enabled: true,
          style: { fontSize: dataLabelsSize },
          textAnchor: "middle"
        },
        stroke: stroke,
        chart: {
          height: 650,
          width: "100%",
          type: "line",
          zoom: { enabled: true }
        },
        // title: { text: "Total Resolved from COVID-19 in Ontario" },
        yaxis: {
          labels: {
            style: { ...labelStyle }
          }
        },
        xaxis: {
          categories: dates,
          range: 30,
          labels: {
            style: { ...labelStyle }
          }
        },
        colors: [colours.blue],
        dataLabels: {
          enabled: true,
          style: { fontSize: dataLabelsSize }
        }
      },
      ready: true
    });
  }

  render() {
    return (
      <div id="recovered" className="chart">
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
export default Recovered;
