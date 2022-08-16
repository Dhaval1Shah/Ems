import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import ClearIcon from "@mui/icons-material/Clear";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import Authapi from "../../Services/Authapi";
import { useState } from "react";
import "./tablefilter.css";

const Tableforfilter = () => {
  const [totalDurationTime, setTotalDurationTime] = useState([]);

  useEffect(() => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    Authapi.getAttandance(month, year).then((data) =>
      setTotalDurationTime(data.data)
    );
  }, []);

  let row = totalDurationTime.map((item) => ({
    date: item.date,
    hours: item.hours,
    attendance: item.attendance,
    dayType: item.dayType,
  }));

  const { data } = useDemoData({
    dataSet: "",
    rowLength: 10,
    maxColumns: 10,
  });

  const handleMonthChange = async (e) => {
    let select = e.target.value;
    let ds = new Date(select);

    let month = ds.getMonth() + 1;
    let year = ds.getFullYear();
    const attr = await Authapi.getAttandance(month, year);

    if (attr && attr.status === true) {
      setTotalDurationTime(attr.data);
    }
  };

  var month = new Array();
  month[0] = "01";
  month[1] = "02";
  month[2] = "03";
  month[3] = "04";
  month[4] = "05";
  month[5] = "06";
  month[6] = "07";
  month[7] = "08";
  month[8] = "09";
  month[9] = "10";
  month[10] = "11";
  month[11] = "12";

  var d = new Date();
  var dateString = d.getFullYear() + "-" + month[d.getMonth()];

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "hours", headerName: "Hours / Min", flex: 1 },
    { field: "attendance", headerName: "Attendance", flex: 1 },
    { field: "dayType", headerName: "Day-Type", flex: 1 },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <TextField
          id="datetime-local"
          label="Select Month/Year"
          views={["year", "month"]}
          variant="outlined"
          defaultValue={dateString}
          type="Month"
          onChange={handleMonthChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: "2020-01", max: dateString }}
        />
      </div>
      <>
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            {...data}
            columns={columns}
            rows={totalDurationTime}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </>
    </div>
  );
};

export default Tableforfilter;
