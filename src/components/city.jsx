import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class City extends Component {
  constructor(props) {
    super(props);
    this.makeCities = this.makeCities.bind(this);
    this.makeOccurences = this.makeOccurences.bind(this);
    this.makeChart = this.makeChart.bind(this);
  }
  state = {
    data: this.props.casedata,
    ready: false,
    series: [{}],
    options: {}
  };

  componentDidMount() {
    this.makeCities();
  }

  makeCities() {
    setTimeout(() => {
      const data = this.state.data;

      const cities = [];
      for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];
        cities[i - 1] = row[7];
      }
      this.setState({ cities: cities });
      this.makeOccurences();
    }, 0.001);
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

    const city = [];
    const cases = [];

    for (var q = 0; q < occ.length - 1; q++) {
      var inst = occ[q];
      city[q] = inst[0];
      cases[q] = inst[1];
    }
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
        title: { text: "Cases by City" },
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
            width={1200}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default City;
