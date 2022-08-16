// For Api data Store Into Json File With node

const { default: axios } = require("axios");
const fs = require("fs");
const requestOptions = {
  sEcho: 1,
  iDisplayStart: 0,
  iDisplayLength: 10000,
  iSortCol_0: 2,
  sSortDir_0: "asc",
  sSearch: "",
};
axios
  .post(
    `http://presolv360.localhost.com/v1/public/api/admin/arbitration/adminreview/direct`,
    requestOptions
  )
  .then((res) => {
    fs.writeFile("./data.json", JSON.stringify(res.data.aaData), (err) => {
      if (err) {
        console.log("Error writing file:", err);
      }
    });
  });
