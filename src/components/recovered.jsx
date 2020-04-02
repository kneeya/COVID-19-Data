import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Recovered extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
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
    setTimeout(() => {
      const data = this.state.data;

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
      this.setState({ resolved: resolved, dates: dates });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const reso = this.state.resolved;
    const dates = this.state.dates;

    this.setState({
      series: [
        {
          name: "Resolved",
          data: reso
        }
      ]
    });
    this.setState({
      options: {
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        title: { text: "Total Resolved from COVID-19 in Ontario" },
        xaxis: {
          categories: dates
        }
      }
    });
    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="recovered">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={650}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Recovered;
