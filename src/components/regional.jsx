import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip } from "./options";

class City extends Component {
  constructor(props) {
    super(props);
    this.makeCities = this.makeCities.bind(this);
  }
  state = {
    data: this.props.casedata,
    ready: false,
    series: [{}],
    options: {},
  };

  componentDidMount() {
    this.makeCities();
  }

  makeCities() {
    const data = [...this.props.casedata];

    // console.log('casedata', data)

    const regions = [];
    for (var i = 1; i < data.length - 1; i++) {
      var row = data[i];
      regions[i - 1] = row[6];
    }
    this.setState({ regions: regions });
    const regionLong = regions.map(function (report) {
      var wloo = report.replace("Region of Waterloo,", "Waterloo Region");
      return wloo;
    });
    var occurrences = {};
    for (i = 0; i < regionLong.length; i++) {
      occurrences[regionLong[i]] = (occurrences[regionLong[i]] || 0) + 1;
    }

    const ordered = {};
    Object.keys(occurrences)
      .sort()
      .forEach(function (key) {
        ordered[key] = occurrences[key];
      });
    var occ = Object.entries(ordered);

    const region = occ.map(function (inst) {
      return inst[0];
    });
    const cases = occ.map(function (inst) {
      return inst[1];
    });

    this.setState({
      region: region,
      cases: cases,
      series: [
        {
          name: "Cases",
          data: cases,
        },
      ],
      options: {
        chart: {
          height: 1000,
          width: "100%",
          type: "bar",
          zoom: { enabled: true },
        },
        //title: { text: "Cases by City" },
        dataLabels: {
          enabled: true,
          textAnchor: "end",
          offsetX: -30,
          style: { ...labelStyle },
        },
        colors: [colours.orange],
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        tooltip: tooltip,
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: {
          reversed: true,
          labels: {
            style: { ...labelStyle },
            maxWidth: 500,
          },
        },
        xaxis: {
          categories: region,
          labels: {
            show: true,
            style: { ...labelStyle },
          },
        },
      },
      ready: true,
    });
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
export default City;
