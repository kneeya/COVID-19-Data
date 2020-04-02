import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Regional extends Component {
  constructor(props) {
    super(props);
    this.dataParse = this.dataParse.bind(this);
    this.storeData = this.storeData.bind(this);
    this.makeCities = this.makeCities.bind(this);
    this.makeOccurences = this.makeOccurences.bind(this);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {
    ready: false,
    series: [{}],
    options: {}
  };

  componentDidMount() {
    this.dataParse();
  }

  dataParse() {
    var csv = require("./conposcovidloc.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csv, {
      download: true,
      complete: this.storeData
    });
  }

  storeData(results) {
    let parsedD = results.data;
    this.setState({ data: parsedD });
    this.makeCities();
  }

  makeCities() {
    const data = this.state.data;
    const cities = [];
    for (var i = 1; i < data.length - 1; i++) {
      var row = data[i];
      cities[i - 1] = row[7];
    }
    this.setState({ cities: cities });
    console.log(this.state.cities);
    this.makeOccurences();
  }
  makeOccurences() {
    var cities = this.state.cities;
    var occurrences = {};
    for (var i = 0, j = cities.length; i < j; i++) {
      occurrences[cities[i]] = (occurrences[cities[i]] || 0) + 1;
    }

    const ordered = {};
    Object.keys(occurrences)
      .sort()
      .forEach(function(key) {
        ordered[key] = occurrences[key];
      });
    var occ = Object.entries(ordered);
    console.log(occ);

    const city = [];
    const cases = [];

    for (var i = 0; i < occ.length - 1; i++) {
      var inst = occ[i];
      city[i] = inst[0];
      cases[i] = inst[1];
    }

    console.log(city, cases);
    this.setState({ city: city, cases: cases });

    this.makeChart();
  }

  makeChart() {
    const city = this.state.city;
    const cases = this.state.cases;
    this.setState({
      series: [
        {
          name: "Cases",
          data: cases
        }
      ]
    });
    this.setState({
      options: {
        chart: { height: 650, type: "bar", zoom: { enabled: true } },
        title: { text: "Cases by Region" },
        dataLabels: {
          enabled: false
        },
        colors: ["#92278F"],
        plotOptions: {
          bar: { horizontal: true }
        },
        xaxis: {
          categories: city
        }
      }
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
            height={650}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Regional;
