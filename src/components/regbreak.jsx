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
    var occ = Object.entries(occurrences);
    const region = occ.map(function (inst) {
      return inst[0];
    });
    console.log(region);
    const defaultRegions = region.map(function (reg) {
      return reg;
    });
    console.log(defaultRegions);
    const da = d.map(function (row) {
      return { region: row[6], status: row[5] };
    });

    // const dat = da.map(function (inst) {
    //   var wloo = inst.region.replace("Region of Waterloo, ", "Waterloo Region");
    //   return wloo;
    // });
    console.log(da);
    var datr = da.slice(1, da.length - 1);
    console.log(datr);

    const data = datr.sort(function (a, b) {
      if (a.region < b.region) {
        return -1;
      }
      if (a.region > b.region) {
        return 1;
      } else {
        return 0;
      }
    });
    var fatal = [];
    var active = [];
    var reso = [];

    data.reduce(function (prev, item) {
      var j = 0;

      if (item.region === prev) {
        if (item.status === "Fatal") {
          fatal[j]++;
        }
        if (item.status === "Resolved") {
          reso[j]++;
        }
        if (item.status === "Not Resolved") {
          active[j]++;
        }
      } else {
        j++;
        if (item.status === "Fatal") {
          fatal[j]++;
        }
        if (item.status === "Resolved") {
          reso[j]++;
        }
        if (item.status === "Not Resolved") {
          active[j]++;
        }
      }
      return item.region;
    }, data[0].region);

    // const darts = data.reduce(function (sum, item) {
    //   if (!sum[item.region]) {
    //     sum[item.region] = [item.region];
    //   }
    //   if (!sum[item.region][item.status]) {
    //     sum[item.region][item.status] = 1;
    //   } else {
    //     sum[item.region][item.status]++;
    //   }
    // }, {});
    // for (var i = 1; i < data.length; i++) {
    //   var j = 0;
    //   fatal[j] = 0;
    //   active[j] = 0;
    //   reso[j] = 0;
    //   do {
    //     if (data[i - 1].status === "Fatal") {
    //       fatal[j]++;
    //     }
    //     if (data[i - 1].status === "Not Resolved") {
    //       active[j]++;
    //     }
    //     if (data[i - 1].status === "Resolved") {
    //       reso[j]++;
    //     }
    //   } while (data[i].region === data[i - 1].region);
    //   j++;
    // }
    console.log(reso);

    //console.log(ordered);
    // const dead = data
    //   .map(function (row) {
    //     if (row[5] === "Fatal") {
    //       return row[6];
    //     }
    //   })
    //   .filter(function (result) {
    //     if (!result) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });

    // const active = data
    //   .map(function (row) {
    //     if (row[5] === "Not Resolved") {
    //       return row[6];
    //     }
    //   })
    //   .filter(function (result) {
    //     if (!result) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });

    // const done = data
    //   .map(function (row) {
    //     if (row[5] === "Resolved") {
    //       return row[6];
    //     }
    //   })
    //   .filter(function (result) {
    //     if (!result) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });
    // const deadLong = dead.map(function (report) {
    //   var wloo = report.replace("Region of Waterloo,", "Waterloo Region");
    //   return wloo;
    // });
    // const activeLong = active.map(function (report) {
    //   var wloo = report.replace("Region of Waterloo,", "Waterloo Region");
    //   return wloo;
    // });
    // const doneLong = done.map(function (report) {
    //   var wloo = report.replace("Region of Waterloo,", "Waterloo Region");
    //   return wloo;
    // });

    // var deadreg = {};
    // var actreg = {};
    // var donereg = {};

    // for (var i = 0, j = deadLong.length; i < j; i++) {
    //   deadreg[deadLong[i]] = (deadreg[deadLong[i]] || 0) + 1;
    // }
    // for (var t = 0, y = activeLong.length; t < y; t++) {
    //   actreg[activeLong[t]] = (actreg[activeLong[t]] || 0) + 1;
    // }
    // for (var x = 0, s = doneLong.length; x < s; x++) {
    //   donereg[doneLong[x]] = (donereg[doneLong[x]] || 0) + 1;
    // }
    //console.log(donereg);

    //this.setState({ regions: regions });
    // const deadord = {};
    // Object.keys(deadreg)
    //   .sort()
    //   .forEach(function (key) {
    //     deadord[key] = deadreg[key];
    //   });
    // var deaths = Object.entries(deadord);

    // const actord = {};
    // Object.keys(actreg)
    //   .sort()
    //   .forEach(function (key) {
    //     actord[key] = actreg[key];
    //   });
    // var actives = Object.entries(actord);

    // const resord = {};
    // Object.keys(donereg)
    //   .sort()
    //   .forEach(function (key) {
    //     resord[key] = donereg[key];
    //   });
    // var resolves = Object.entries(resord);

    // // const ordered = {};
    // // Object.keys(occurrences)
    // //   .sort()
    // //   .forEach(function (key) {
    // //     ordered[key] = occurrences[key];
    // //   });
    // // var occ = Object.entries(ordered);

    // const region = deaths.map(function (inst) {
    //   return inst[0];
    // });
    // const deadcases = deaths.map(function (inst) {
    //   return inst[1];
    // });
    // const activecases = actives.map(function (inst) {
    //   return inst[1];
    // });
    // const resolvedcases = resolves.map(function (inst) {
    //   return inst[1];
    // });
    // console.log(deaths);
    // console.log(region);

    this.setState({
      //   region: region,
      //   activecases: active,
      //   deadcases: deadcases,
      //   resolvedcases: resolvedcases,
      //   series: [
      //     {
      //       name: "Active Cases",
      //       data: activecases,
      //     },
      //     {
      //       name: "Resolved Cases",
      //       data: resolvedcases,
      //     },
      //     {
      //       name: "Fatal Cases",
      //       data: deadcases,
      //     },
      //   ],
      //   options: {
      //     chart: {
      //       height: 1000,
      //       width: "100%",
      //       type: "bar",
      //       stacked: true,
      //       zoom: { enabled: true },
      //     },
      //     //title: { text: "Cases by City" },
      //     dataLabels: {
      //       enabled: false,
      //       textAnchor: "end",
      //       offsetX: -30,
      //       style: { ...labelStyle },
      //     },
      //     colors: [colours.orange, colours.blue, colours.green],
      //     plotOptions: {
      //       bar: {
      //         horizontal: true,
      //         dataLabels: {
      //           position: "bottom",
      //         },
      //       },
      //     },
      //     tooltip: tooltip,
      //     grid: {
      //       xaxis: {
      //         lines: {
      //           show: true,
      //         },
      //       },
      //     },
      //     yaxis: {
      //       reversed: true,
      //       labels: {
      //         style: { ...labelStyle },
      //         maxWidth: 500,
      //       },
      //     },
      //     xaxis: {
      //       categories: region,
      //       labels: {
      //         show: true,
      //         style: { ...labelStyle },
      //       },
      //     },
      //   },
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
