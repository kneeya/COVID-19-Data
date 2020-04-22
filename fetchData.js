const dict = require("./src/dictionary");
const axios = require("axios");
const fs = require("fs");

try {
  axios
    .get(
      "https://data.ontario.ca/dataset/f4f86e54-872d-43f8-8a86-3892fd3cb5e6/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11/download/covidtesting.csv"
    )
    .then(function (response) {
      // handle success
      //console.log(response);
      fs.writeFileSync("./src/dataFile.csv", response.data, {
        encoding: "utf8",
        flag: "w",
      });
    })
    .catch(function (error) {
      // handle error
      //console.log(error);
      throw Error("FAILED TO FETCH DATA!!", error);
    });

  axios
    .get(
      "https://data.ontario.ca/dataset/f4112442-bdc8-45d2-be3c-12efae72fb27/resource/455fd63b-603d-4608-8216-7d8647f43350/download/conposcovidloc.csv"
    )
    .then(function (response) {
      // handle success
      //console.log(response);
      fs.writeFileSync("./src/casedataFile.csv", response.data, {
        encoding: "utf8",
        flag: "w",
      });
    })
    .catch(function (error) {
      // handle error
      //console.log(error);
      throw Error("FAILED TO FETCH DATA!!", error);
    });

  axios
    .get(
      "https://data.ontario.ca/api/3/action/datastore_search?resource_id=ed270bb8-340b-41f9-a7c6-e8ef587e6d11&limit=1000"
    )
    .then(function (response) {
      // handle success
      //console.log(response);
      fs.writeFileSync("./src/covidData.json", JSON.stringify(response.data), {
        encoding: "utf8",
        flag: "w",
      });
    })
    .catch(function (error) {
      // handle error
      //console.log(error);
      throw Error("FAILED TO FETCH DATA!!", error);
    });

  axios
    .get(
      "https://data.ontario.ca/en/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=1000000"
    )
    .then(function (response) {
      // handle success
      //console.log(response);
      fs.writeFileSync(
        "./src/covidDataCases.json",
        JSON.stringify(response.data),
        {
          encoding: "utf8",
          flag: "w",
        }
      );

      const records = response.data.result.records;

      const reduced = {
        reduceAges: reduceAges(records),
        reduceSex: reduceSex(records),
        reducePHU: reducePHU(records),
      };

      fs.writeFileSync("./src/reducedData.json", JSON.stringify(reduced), {
        encoding: "utf8",
        flag: "w",
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      throw Error("FAILED TO FETCH DATA!!", error);
    });

  const defaultItem = {
    [dict.resolved]: 0,
    [dict.NotResolved]: 0,
    [dict.deaths]: 0,
  };

  const reduceAges = (data) => {
    const ages = [
      "<20",
      "20s",
      "30s",
      "40s",
      "50s",
      "60s",
      "70s",
      "80s",
      "90s",
      "Unknown",
    ];

    const startObj = ages.map((item) => {
      return { ...defaultItem, Age_Group: item };
    });

    return data.reduce((sum, item) => {
      const index = ages.indexOf(item[dict.Age_Group]);
      const outcome = item[dict.OUTCOME1];

      if (outcome === dict.NotResolved) {
        sum[index][dict.NotResolved]++;
      }
      if (outcome === dict.resolved) {
        sum[index][dict.resolved]++;
      }
      if (outcome === dict.fatal) {
        sum[index][dict.deaths]++;
      }

      return sum;
    }, startObj);
  };

  const reduceSex = (data) => {
    const startObj = [
      {
        [dict.CLIENT_GENDER]: "MALE",
        [dict.resolved]: 0,
        [dict.NotResolved]: 0,
        [dict.deaths]: 0,
      },
      {
        [dict.CLIENT_GENDER]: "FEMALE",
        [dict.resolved]: 0,
        [dict.NotResolved]: 0,
        [dict.deaths]: 0,
      },
      {
        [dict.CLIENT_GENDER]: "TRANSGENDER",
        [dict.resolved]: 0,
        [dict.NotResolved]: 0,
        [dict.deaths]: 0,
      },
      {
        [dict.CLIENT_GENDER]: "OTHER",
        [dict.resolved]: 0,
        [dict.NotResolved]: 0,
        [dict.deaths]: 0,
      },
      {
        [dict.CLIENT_GENDER]: "UNKNOWN",
        [dict.resolved]: 0,
        [dict.NotResolved]: 0,
        [dict.deaths]: 0,
      },
    ];

    return data.reduce((sum, item) => {
      const outcome = item[dict.OUTCOME1];

      let index;

      if (item[dict.CLIENT_GENDER] === "MALE") {
        index = 0;
      } else if (item[dict.CLIENT_GENDER] === "FEMALE") {
        index = 1;
      } else if (item[dict.CLIENT_GENDER] === "TRANSGENDER") {
        index = 2;
      } else if (item[dict.CLIENT_GENDER] === "OTHER") {
        index = 3;
      } else if (item[dict.CLIENT_GENDER] === "UNKNOWN" || item[dict.CLIENT_GENDER] === "" || item[dict.CLIENT_GENDER] === "(blank)") {
        index = 4;
      }else{
        //testing
        //console.log('item[dict.CLIENT_GENDER]', item[dict.CLIENT_GENDER])
      }

      if (outcome === dict.NotResolved) {
        sum[index][dict.NotResolved]++;
      }
      if (outcome === dict.resolved) {
        sum[index][dict.resolved]++;
      }
      if (outcome === dict.fatal) {
        sum[index][dict.deaths]++;
      }

      return sum;
    }, startObj);
  };

  const reducePHU = (data) => {
    return data.reduce((sum, item) => {
      const outcome = item[dict.OUTCOME1],
        phu = item[dict.Reporting_PHU];

      try {
        if (!sum[phu]) {
          sum[phu] = { ...defaultItem, [dict.Reporting_PHU]: phu };
        }
      } catch (err) {
        console.error(err);
      }

      if (outcome === dict.NotResolved) {
        sum[phu][dict.NotResolved]++;
      }
      if (outcome === dict.resolved) {
        sum[phu][dict.resolved]++;
      }
      if (outcome === dict.fatal) {
        sum[phu][dict.deaths]++;
      }

      return sum;
    }, {});
  };
} catch (err) {
  console.error(err);
  throw new Error(err);
}
