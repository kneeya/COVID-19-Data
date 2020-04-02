import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Stacked extends Component {
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
      this.setState({ data: this.props.data });
      const data = this.state.data;

      var dates = [];

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
        dates: dates,
        confPos: confPos,
        resolved: resolved,
        dead: dead
      });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const dates = this.state.dates;
    const confPos = this.state.confPos;
    const reso = this.state.resolved;
    const dead = this.state.dead;

    this.setState({
      series: [
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
        title: { text: "Summary of Cases Ontario" },
        chart: {
          type: "bar",
          height: 650,
          stacked: true,
          toolbar: {
            show: true
          },

          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: dates
        },

        fill: {
          opacity: 1
        }
      }
    });

    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="stacked" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
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
export default Stacked;
