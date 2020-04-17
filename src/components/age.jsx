import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip, legend, responsiveFun } from "./options";

class Age extends Component {
  constructor(props) {
    super(props);
    this.sortByAge = this.sortByAge.bind(this);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {
    data: this.props.casedata,
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.sortByAge();
  }

  sortByAge() {
    setTimeout(() => {
      const data = this.props.casedata;

      const m = data
        .map(function (row) {
          if (row[3] === "MALE") {
            return row[2];
          }
        })
        .filter(function (result) {
          if (!result) {
            return false;
          } else {
            return true;
          }
        });

      const f = data
        .map(function (row) {
          if (row[3] === "FEMALE") {
            return row[2];
          }
        })
        .filter(function (result) {
          if (!result) {
            return false;
          } else {
            return true;
          }
        });

      const tran = data
        .map(function (row) {
          if (row[3] === "TRANSGENDER") {
            return row[2];
          }
        })
        .filter(function (result) {
          if (!result) {
            return false;
          } else {
            return true;
          }
        });
      const unk = data
        .map(function (row) {
          if (row[3] === "UNKNOWN") {
            return row[2];
          }
        })
        .filter(function (result) {
          if (!result) {
            return false;
          } else {
            return true;
          }
        });

      var maleages = {};
      var femages = {};
      var tranages = {};
      var unkages = {};

      for (var i = 0, j = m.length; i < j; i++) {
        maleages[m[i]] = (maleages[m[i]] || 0) + 1;
      }
      for (var t = 0, y = f.length; t < y; t++) {
        femages[f[t]] = (femages[f[t]] || 0) + 1;
      }
      for (var x = 0, s = tran.length; x < s; x++) {
        tranages[tran[x]] = (tranages[tran[x]] || 0) + 1;
      }
      for (var k = 0, c = unk.length; k < c; k++) {
        unkages[unk[k]] = (unkages[unk[k]] || 0) + 1;
      }
      this.setState({
        maleages: maleages,
        femages: femages,
        tranages: tranages,
        unkages: unkages,
      });
      this.makeChart();
    }, 0.01);
  }

  makeChart() {
    const mage = this.state.maleages;
    const fage = this.state.femages;
    const tage = this.state.tranages;
    const uage = this.state.unkages;

    this.setState({
      series: [
        {
          name: "Male",
          data: [
            mage["<20"],
            mage["20s"],
            mage["30s"],
            mage["40s"],
            mage["50s"],
            mage["60s"],
            mage["70s"],
            mage["80s"],
            mage["90s"],
            mage["Unknown"],
          ],
        },
        {
          name: "Female",
          data: [
            fage["<20"],
            fage["20s"],
            fage["30s"],
            fage["40s"],
            fage["50s"],
            fage["60s"],
            fage["70s"],
            fage["80s"],
            fage["90s"],
            fage["Unknown"],
          ],
        },
        {
          name: "Transgender",
          data: [
            tage["<20"],
            tage["20s"],
            tage["30s"],
            tage["40s"],
            tage["50s"],
            tage["60s"],
            tage["70s"],
            tage["80s"],
            tage["90s"],
            tage["Unknown"],
          ],
        },
        {
          name: "Unknown",
          data: [
            uage["<20"],
            uage["20s"],
            uage["30s"],
            uage["40s"],
            uage["50s"],
            uage["60s"],
            uage["70s"],
            uage["80s"],
            uage["90s"],
            uage["Unknown"],
          ],
        },
      ],
    });
    this.setState({
      options: {
        legend: legend,
        tooltip: tooltip,
        responsive: responsiveFun(),
        chart: {
          height: 650,
          width: "100%",
          type: "bar",
          zoom: { enabled: true },
        },
        //title: { text: "Breakdown by Age and Sex" },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: ["solid", "pattern"],
          opacity: 1,
          pattern: {
            style: "slantedLines",
          },
        },

        colors: ["#39B54A", "#00B2E3", colours.magenta, colours.black],
        plotOptions: {
          bar: { horizontal: false },
        },
        yaxis: {
          labels: {
            style: { ...labelStyle },
          },
        },
        xaxis: {
          categories: [
            "Under 20",
            "20-29",
            "30-39",
            "40-49",
            "50-59",
            "60-69",
            "70-79",
            "80-89",
            "90-99",
            "Unknown",
          ],
          labels: {
            style: { ...labelStyle },
          },
        },
      },
    });
    this.setState({ ready: true });
  }

  render() {
    return (
      <div id="regional" className="chart">
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
export default Age;
