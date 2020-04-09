import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsive } from "./options";

class Hospital extends Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
  }
  state = {
    data: this.props.data,
    ready: false,
    dates: [],
    series: [],
    options: {},
  };

  componentDidMount() {
    this.setData();
  }

  setData() {
    //copy the array
    const d = [...this.props.data];
    const data = d.splice(57, d.length - 2);
    console.log(data);

    var datez = [];
    var notICU = [];
    var ICUwithv = [];
    var ICUwov = [];

    datez = data
      .map(function (row) {
        return row[0];
      })
      .filter(function (result) {
        if (!result) {
          return false;
        } else {
          return true;
        }
      });
    console.log(datez);
    notICU = data
      .map(function (row) {
        return row[10] - row[11];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });

    ICUwithv = data
      .map(function (row) {
        return row[12];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });

    ICUwov = data
      .map(function (row) {
        return row[11] - row[12];
      })
      .filter(function (result) {
        if (!result) {
          return 0;
        } else {
          return true;
        }
      });
    console.log(datez, ICUwithv, ICUwov, notICU);
    // for (var i = 1; i < data.length - 1; i++) {
    //   var row = data[i];

    //   dates[i - 1] = row[0];

    //   if (!row[5]) {
    //     if (!confPos[i - 2]) {
    //       confPos[i - 1] = 0;
    //     } else {
    //       confPos[i - 1] = confPos[i - 2];
    //     }
    //   } else {
    //     confPos[i - 1] = row[5];
    //   }

    //   if (!row[6]) {
    //     resolved[i - 1] = 0;
    //   } else {
    //     resolved[i - 1] = row[6];
    //   }

    //   if (!row[7]) {
    //     dead[i - 1] = 0;
    //   } else {
    //     dead[i - 1] = row[7];
    //   }
    // }

    this.setState({
      dates: datez,
      notICU: notICU,
      ICUwithv: ICUwithv,
      ICUwov: ICUwov,
      series: [
        {
          name: "Hospitalized, not in ICU",
          data: notICU,
        },
        {
          name: "In ICU without ventilator",
          data: ICUwov,
        },
        {
          name: "In ICU with ventilator",
          data: ICUwithv,
        },
      ],
      options: {
        // title: { text: "Summary of Cases in Ontario" },
        colors: [colours.blue, colours.yellow, colours.black],
        legend: legend,
        tooltip: tooltip,
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        stroke: {
          width: 2,
          colors: ["#fff"],
        },
        xaxis: {
          categories: datez,
          labels: {
            style: { ...labelStyle },
          },
        },
        responsive: responsive,
        fill: {
          opacity: 1,
        },
      },
      ready: true,
    });
  }

  render() {
    return (
      <div id="stacked" className="chart">
        {this.state.ready ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Hospital;
