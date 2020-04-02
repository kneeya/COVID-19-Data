import React, { Component } from "react";
import chart from "tui-chart";
import ReactApexChart from "react-apexcharts";

class Positive extends Component {
  constructor(props) {
    super(props);
    this.makeChart = this.makeChart.bind(this);
    this.setData = this.setData.bind(this);
  }
  state = {
    ready: false,
    datez: [],
    confPosi: [],
    series: [
      {
        name: "Confirmed Positives"
      }
    ],
    options: {
      chart: { height: 650, type: "line", zoom: { enabled: true } },
      title: { text: "Positive Cases of COVID-19 in Ontario" }
    }
  };

  componentDidMount() {
    this.setData();
    this.setState({ dataz: this.props.data });
  }

  setData() {
    setTimeout(() => {
      const data = this.state.dataz;

      const dates = [];
      const confPos = [];

      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];

        dates[i - 1] = row[0];
        if (!row[5]) {
          confPos[i - 1] = confPos[i - 2];
        } else {
          confPos[i - 1] = row[5];
        }
      }

      this.setState({ confPosi: confPos, datez: dates });
      console.log(this.state.confPosi, this.state.datez);
      this.makeChart();

      //setTimeout(() => {
      // this.setState({
      //   series: [{ name: "Confirmed Positives", data: confPos }],
      //   options: {
      //     chart: { height: 650, type: "line", zoom: { enabled: true } },
      //     dataLabels: { enabled: false },
      //     stroke: { curve: "straight" },
      //     title: { text: "Positive Cases of COVID-19 in Ontario" },
      //     grid: { row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 } },
      //     xaxis: { categories: dates }
      //   }
      // });
      // var container = document.getElementById("positive");
      // var data = {
      //   categories: dates,
      //   series: [
      //     {
      //       name: "Confirmed Positives",
      //       data: confPos
      //     }
      //   ]
      // };
      // var theme = {
      //   series: {
      //     colors: ["#C64A1C"]
      //   }
      // };
      // chart.registerTheme("positive", theme);
      // var options = {
      //   theme: "positive",
      //   chart: {
      //     width: 1160,
      //     height: 650,
      //     title: "Positive Cases of COVID-19 in Ontario"
      //   },
      //   yAxis: {
      //     title: "Number of Cases"
      //   },
      //   xAxis: {
      //     title: "Month",
      //     pointOnColumn: true,
      //     dateFormat: "MMM",
      //     tickInterval: "auto"
      //   },
      //   series: {
      //     showDot: false,
      //     zoomable: true
      //   },
      //   tooltip: {
      //     suffix: ""
      //   }
      // };
      // chart.lineChart(container, data, options);
      //}, 0.01);
    }, 0.001);
  }

  makeChart() {
    const confPos = this.state.confPosi;
    const dates = this.state.datez;

    this.setState({
      series: [
        {
          name: "Confirmed Positives",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          //data: confPos
        }
      ]
    });
    this.setState({
      options: {
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
          //categories: dates
        }
      }
    });
    console.log(this.state.ready);
    this.setState({ ready: true });
    console.log(this.state.ready);
  }

  render() {
    return (
      <div id="positive">
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
export default Positive;
