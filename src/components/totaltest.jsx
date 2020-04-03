import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class TotalTest extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.setData = this.setData.bind(this);
  }
  state = {
    data: this.props.data,
    ready: false,
    dates: [],
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
      var totaltest = [];
      var confPos = [];
      var resolved = [];
      var dead = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        if (!row[5]) {
          if (!confPos[i - 2]) {
            confPos[i - 1] = 0;
          } else {
            confPos[i - 1] = confPos[i - 2];
          }
        } else {
          confPos[i - 1] = row[5];
        }

        if (!row[9]) {
          if (!totaltest[i - 2]) {
            totaltest[i - 1] = 0;
          } else {
            totaltest[i - 1] = totaltest[i - 2];
          }
        } else {
          totaltest[i - 1] = row[9];
        }

        if (!row[6]) {
          resolved[i - 1] = 0;
        } else {
          resolved[i - 1] = row[6];
        }

        if (!row[7]) {
          dead[i - 1] = 0;
        } else {
          dead[i - 1] = row[7];
        }
      }

      this.setState({
        totaltest: totaltest,
        dates: dates,
        confPos: confPos,
        resolved: resolved,
        dead: dead
      });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const totalcases = this.state.totaltest;
    const dates = this.state.dates;
    const confPos = this.state.confPos;
    const reso = this.state.resolved;
    const dead = this.state.dead;

    this.setState({
      series: [
        {
          name: "Total Cases",
          data: totalcases
        },
        {
          name: "Confirmed Positives",
          data: confPos
        },
        {
          name: "Resolved",
          data: reso
        },
        {
          name: "Total Deaths",
          data: dead
        }
      ]
    });
    this.setState({
      options: {
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        title: { text: "Status of COVID-19 cases in Ontario" },
        xaxis: {
          categories: dates,
          range: 30
        },
        colors: ["#2B8737", "#1080A6", "#92278F", "#0369ac"],
        markers: {
          size: 4,
          colors: ["#c00264"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        }
      }
    });

    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="totaltest" className="chart">
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
export default TotalTest;
