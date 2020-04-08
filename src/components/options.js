import colours from "../ds/styles/sass/variables/colours.variables.scss";


export const labelStyle = {
  fontSize: "16px",
  colors: [colours.black]
};

export const dataLabelsSize = "15px";

export const tooltip = {
  followCursor: true,
  style: { ...labelStyle }
};

export const stroke = {
  width: 12,
  curve: "straight",
  dashArray: [0, 8, 5]
};

export const markers = {
  size: 7,
  colors: [colours.blue],
  strokeColors: "#fff",
  strokeWidth: 3,
  hover: {
    size: 9
  }
};

export const legend = {
    fontSize: dataLabelsSize,
    position: 'top',
    horizontalAlign: 'left',
    onItemClick: {
    toggleDataSeries: true
  },
  onItemHover: {
    highlightDataSeries: true
  }
};

export const responsive = [
    {
      breakpoint: 640,
      options: {
        chart: {
          height: "300px",
          width: "250%",
        },
        xaxis: {
            labels: {
              offsetY: 10,
              style: { ...labelStyle, fontSize: "14px" },
            },
        }
      }
    },
    {
        breakpoint: 1163,
        options: {
          chart: {
            height: "400px",
            width: "125%",
          },
          xaxis: {
            labels: {
              offsetY: 10,
              style: { ...labelStyle },
            },
            }
        }
      },
      {
        breakpoint: 1530,
        options: {
          chart: {
            height: "500px",
            width: "100%",
          },
          xaxis: {
            labels: {
              offsetY: 10,
              style: { ...labelStyle },
            },
            }
        }
      }
  ]

  