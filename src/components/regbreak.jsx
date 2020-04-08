import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip } from "./options";

class RegBreak extends Component {
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
    const d = [...this.props.casedata];
    const regions = [];
    for (var i = 1; i < d.length - 1; i++) {
      var row = d[i];
      regions[i - 1] = row[6];
    }
    var occurrences = {};
    for (i = 0; i < regions.length; i++) {
      occurrences[regions[i]] = (occurrences[regions[i]] || 0) + 1;
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

    const Regions = region.map(function (reg) {
      return { region: reg, count: 0 };
    });

    let defaultRegions = Regions.reduce(
      (a, x) => ({ ...a, [x.region]: x.count }),
      {}
    );

    const da = d.map(function (row) {
      return { region: row[6], status: row[5] };
    });

    var datr = da.slice(1, da.length - 1);

    const items = datr.sort(function (a, b) {
      if (a.region < b.region) {
        return -1;
      }
      if (a.region > b.region) {
        return 1;
      } else {
        return 0;
      }
    });

    const reduced = items.reduce(
      (sum, item) => {
        sum[item.status][item.region]++;

        return sum;
      },
      {
        Resolved: {
          ...defaultRegions,
        },
        "Not Resolved": {
          ...defaultRegions,
        },
        Fatal: {
          ...defaultRegions,
        },
      }
    );

    const arrays = {
      active: [],
      fatal: [],
      resolved: [],
    };

    region.map((item) => {
      arrays.resolved.push(reduced.Resolved[item]);
      arrays.fatal.push(reduced.Fatal[item]);
      arrays.active.push(reduced["Not Resolved"][item]);
    });

    this.setState({
      region: region,

      series: [
        {
          name: "Active Cases",
          data: arrays.active,
        },
        {
          name: "Resolved Cases",
          data: arrays.resolved,
        },
        {
          name: "Fatal Cases",
          data: arrays.fatal,
        },
      ],
      options: {
        chart: {
          height: 1000,
          width: "100%",
          type: "bar",
          stacked: true,
          zoom: { enabled: true },
        },
        //title: { text: "Cases by City" },
        dataLabels: {
          enabled: false,
          textAnchor: "end",
          offsetX: -30,
          style: { ...labelStyle },
        },
        colors: [colours.orange, colours.blue, colours.green],
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
        stroke: {
          width: 2,
          colors: ["#fff"],
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
export default RegBreak;
