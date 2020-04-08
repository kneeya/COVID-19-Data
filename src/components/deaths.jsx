import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { labelStyle, dataLabelsSize, tooltip, stroke, responsive } from "./options";
import colours from "../ds/styles/sass/variables/colours.variables.scss";

class Deaths extends Component {
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

    data.splice(1, 35);

    var dates = [];
    var dead = [];

    for (var i = 1; i < data.length - 1; i++) {
      var row = data[i];

      dates[i - 1] = row[0];

      if (!row[7]) {
        dead[i - 1] = 0;
      } else {
        dead[i - 1] = row[7];
      }
    }

    this.setState({
      dead: dead,
      dates: dates,
      series: [
        {
          name: "Total Deaths",
          data: dead
        }
      ],
      options: {
        chart: {
          type: "line",
          zoom: { enabled: true }
        },
        responsive: responsive,
        stroke: stroke,
        tooltip: tooltip,
        dataLabels: {
          enabled: true,
          style: { fontSize: dataLabelsSize },
          textAnchor: "middle"
        },
        markers: {
          size: 4,
          colors: ["#c00264"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        // title: { text: "Total COVID-19 related Deaths in Ontario" },
        yaxis: {
          labels: {
            style: { ...labelStyle }
          }
        },
        xaxis: {
          categories: dates,
          range: 20,
          labels: {
            style: { ...labelStyle }
          }
        },
        colors: [colours.black]
      },
      ready: true
    });
  }

  render() {
    return (
      <div id="dead" className="chart">
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
export default Deaths;
