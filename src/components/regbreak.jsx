import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import colours from "../ds/styles/sass/variables/colours.variables.scss";
import { labelStyle, tooltip } from "./options";
import trans from "../translations.json";

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

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setData();
    }
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
    var ordered = {};
    // Object.keys(occurrences)
    //   .sort()
    //   .forEach(function (key) {
    //     ordered[key] = occurrences[key];
    //   });

    ordered = Object.keys(occurrences).sort(function (a, b) {
      return occurrences[b] - occurrences[a];
    });
    var occ = Object.entries(ordered);
    const region = occ.map(function (inst) {
      return inst[1];
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
          name: trans.reg.active[this.props.lang],
          data: arrays.active,
        },
        {
          name: trans.reg.resolved[this.props.lang],
          data: arrays.resolved,
        },
        {
          name: trans.reg.deaths[this.props.lang],
          data: arrays.fatal,
        },
      ],
      options: {
        legend: {
          position: "top",
        },
        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                width: "680px",
                height: "1000px",
              },
            },
          },
          {
            breakpoint: 1163,
            options: {
              chart: {
                height: "1000px",
                width: "100%",
              },
            },
          },
          {
            breakpoint: 1530,
            options: {
              chart: {
                height: "1000px",
                width: "100%",
              },
            },
          },
        ],
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
        colors: ["#00B2E3", "#39B54A", colours.black],
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
