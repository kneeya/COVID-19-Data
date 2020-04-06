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
  onItemClick: {
    toggleDataSeries: true
  },
  onItemHover: {
    highlightDataSeries: true
  }
};
