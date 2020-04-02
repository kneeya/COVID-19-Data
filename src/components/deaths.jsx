import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Deaths extends Component {
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
      this.setState({ data: this.props.data });
      const data = this.state.data;

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

      this.setState({ dead: dead, dates: dates });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const dead = this.state.dead;
    const dates = this.state.dates;

    this.setState({
      series: [
        {
          name: "Total Deaths",
          data: dead
        }
      ]
    });
    this.setState({
      options: {
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        stroke: {
          width: 7,
          curve: "smooth"
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
        title: { text: "Total COVID-19 related Deaths in Ontario" },
        xaxis: {
          categories: dates
        },
        colors: ["#7B725C"]
      }
    });
    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="dead" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={650}
            width={1200}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Deaths;
