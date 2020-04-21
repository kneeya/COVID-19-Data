import colours from "../ds/styles/sass/variables/colours.variables.scss";

export const labelStyle = {
  fontSize: "12px",
  colors: [colours.black],
};

export const dataLabelsSize = "15px";

export const tooltip = {
  followCursor: true,
  style: { ...labelStyle },
};

export const stroke = {
  width: 2,
  curve: "straight",
  dashArray: [0, 8, 0, 15],
};

export const markers = {
  size: 3,
  colors: ["#00b2e3", "#4d4d4d"],
  strokeColors: "#fff",
  strokeWidth: 1,
  hover: {
    size: 9,
  },
};

export const legend = {
  fontSize: dataLabelsSize,
  position: "top",
  horizontalAlign: "left",
  onItemClick: {
    toggleDataSeries: true,
  },
  onItemHover: {
    highlightDataSeries: true,
  },
};

export const skipLabelsFormater = function (value, timestamp, index) {
  //console.log('object', value, index)

  if (index % 2 || index === undefined) {
    return value;
  } else {
    return "";
  }
};

export const lgXaxisLabels = {
  rotateAlways: true,
  rotate: -45,
  offsetY: 5,
  style: { ...labelStyle },
  formatter: skipLabelsFormater,
};

export const lineXaxis = {
  type: "datetime",
  labels: {
    hideOverlappingLabels: true,
    format: "MMM dd",
    rotateAlways: true,
    rotate: -45,
    offsetY: 5,
    style: { ...labelStyle },
  },
};

export const responsiveFun = () => [
  {
    breakpoint: 640,
    options: {
      chart: {
        offsetX: 10,
        height: "300px",
        //width: "100%",
        toolbar: {
          tools: {
            zoomin: false,
            zoomout: false,
          },
        },
      },
      yaxis: {
        labels: {
          style: { ...labelStyle, fontSize: "10px" },
        },
      },
      xaxis: {
        // max: 10,
        // min: 10,
        // tickAmount: 5,
        // axisTicks: {
        //   show: true,
        //   borderType: 'solid',
        //   color: '#78909C',
        //   height: 6,
        //   offsetX: 0,
        //   offsetY: 0
        // },
        labels: {
          hideOverlappingLabels: true,
          offsetY: 5,
          rotateAlways: true,
          rotate: -45,
          formatter: skipLabelsFormater,
          style: { ...labelStyle, fontSize: "12px" },
        },
      },
      legend: {
        fontSize: "10px",
      },
      dataLabels: {
        enabled: false,
      },
    },
  },
  {
    breakpoint: 1163,
    options: {
      chart: {
        height: "400px",
        width: "100%",
      },
      legend: {
        fontSize: "12px",
      },
      xaxis: {
        // max: 30,
        labels: {
          hideOverlappingLabels: true,
          offsetY: 5,
          rotateAlways: true,
          rotate: -45,
          style: { ...labelStyle },
        },
      },
      dataLabels: {
        style: { ...labelStyle, fontSize: "10px" },
        orientation: "horizontal",
      },
    },
  },
  {
    breakpoint: 1530,
    options: {
      chart: {
        height: "500px",
        width: "100%",
      },
      legend: {
        fontSize: "12px",
      },
      xaxis: {
        labels: {
          offsetY: 5,
          hideOverlappingLabels: true,
          rotateAlways: true,
          rotate: -45,
          style: { ...labelStyle },
        },
        dataLabels: {
          offsetX: 10,
          style: { ...labelStyle, fontSize: "12px" },
          orientation: "horizontal",
        },
      },
    },
  },
];
