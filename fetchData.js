const axios = require("axios");
const fs = require("fs");
axios
  .get(
    "https://data.ontario.ca/dataset/f4f86e54-872d-43f8-8a86-3892fd3cb5e6/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11/download/covidtesting.csv"
  )
  .then(function (response) {
    // handle success
    console.log(response);
    fs.writeFileSync("./src/dataFile.csv", response.data, {
      encoding: "utf8",
      flag: "w",
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

axios
  .get(
    "https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv"
  )
  .then(function (response) {
    // handle success
    console.log(response);
    fs.writeFileSync("./src/casedataFile.csv", response.data, {
      encoding: "utf8",
      flag: "w",
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
