export const formatDate = (date) => {
  date.slice(0, 10);
  var monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    monthStrings[parseInt(date.split("-")[1]) - 1] + " " + date.slice(8, 10)
  );
};
