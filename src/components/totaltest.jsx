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
    totaltest: [],
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

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];

        if (!row[10]) {
          if (!totaltest[i - 2]) {
            totaltest[i - 1] = 0;
          } else {
            totaltest[i - 1] = totaltest[i - 2];
          }
        } else {
          totaltest[i - 1] = row[10];
        }
      }

      console.log(totaltest);

      this.setState({ totaltest: totaltest, dates: dates });
      this.makeChart();
    }, 0.001);
  }

  makeChart() {
    const totalcases = this.state.totaltest;
    const dates = this.state.dates;

    this.setState({
      series: [
        {
          name: "Total Cases",
          data: totalcases
        }
      ]
    });
    this.setState({
      options: {
        chart: { height: 650, type: "line", zoom: { enabled: true } },
        title: { text: "Total Cases of COVID-19 in Ontario" },
        xaxis: {
          categories: dates
        },
        colors: ["#92278F"]
      }
    });

    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="totaltest">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={650}
            width={"75%"}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TotalTest;
