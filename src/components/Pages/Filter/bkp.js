/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Authapi from "../../Services/Authapi";
import { CardContent, Grid, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
// import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./tablefilter.css";

let counter = 0;
function createData(date, hours, attendance, dayType) {
  counter += 1;
  return { id: counter, date, hours, attendance, dayType };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } =
      this.props;
    const rows = [
      { id: "date", numeric: false, disablePadding: true, label: "Date" },
      {
        id: "hours",
        numeric: true,
        disablePadding: false,
        label: "Hours / Min",
      },
      {
        id: "attendance",
        numeric: true,
        disablePadding: false,
        label: "Attendance",
      },
      {
        id: "dayType",
        numeric: true,
        disablePadding: false,
        label: "Day-Type",
      },
    ];

    return (
      <TableHead>
        <StyledTableRow>
          {rows.map(
            (row) => (
              <StyledTableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
                style={{ padding: "10px" }}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </StyledTableCell>
            ),
            this
          )}
        </StyledTableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}></div>
      <div className={classes.spacer} />
      <div className={classes.actions}></div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
  },
});

class Tableforfilter extends Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    totalDurationTime: [],
    value: "",
  };

  componentDidMount() {
    this.getAttr();
  }

  async getAttr() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const attr = await Authapi.getAttandance(month, year);
    if (attr && attr.status === true) {
      this.setState({
        totalDurationTime: attr.data,
      });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  handleMonthChange = async (e) => {
    let select = e.target.value;
    let ds = new Date(select);

    let month = ds.getMonth() + 1;
    let year = ds.getFullYear();
    const attr = await Authapi.getAttandance(month, year);

    if (attr && attr.status === true) {
      this.setState({
        totalDurationTime: attr.data,
      });
    }
  };

  handleSearch = async (e) => {
    this.setState({
      value: e.target.value,
    });

    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const serachData = await Authapi.getAttandance(
      month,
      year,
      this.state.value
    );

    if (serachData && serachData.status === true) {
      this.setState({
        totalDurationTime: serachData.data,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      totalDurationTime,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      value,
    } = this.state;

    // const filterData = totalDurationTime.filter((country) => {
    //   return (
    //     country.attendance.toLowerCase().indexOf(value.toLowerCase()) !== -1
    //   );
    // });

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

    return (
      <div>
        <Grid
          container
          justify="space-between"
          className="selectmonth"
          // style={{ top: '20px', paddingBottom: '10px',marginLeft:'449px' }}
        >
          <TextField
            placeholder="Search"
            type="text"
            name="value"
            variant="standard"
            className="serachData"
            size="small"
            onChange={(e) => {
              this.handleSearch(e);
            }}
            value={this.state.value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),

              endAdornment: this.state.value && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    this.setState({
                      value: "",
                    })
                  }
                >
                  <CancelRoundedIcon />
                </IconButton>
              ),
            }}
          />

          <TextField
            id="datetime-local"
            label="Select Month/Year"
            views={["year", "month"]}
            variant="outlined"
            defaultValue={dateString}
            type="Month"
            onChange={this.handleMonthChange}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: "2020-01", max: dateString }}
          />
        </Grid>
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={totalDurationTime.length}
          />
          <TableBody>
            {stableSort(totalDurationTime, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = this.isSelected(n.id);
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n}
                    selected={isSelected}
                  >
                    <StyledTableCell component="th" scope="row">
                      {n.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">{n.hours}</StyledTableCell>
                    <StyledTableCell align="right">
                      {n.attendance}
                    </StyledTableCell>
                    <StyledTableCell align="right">{n.dayType}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {totalDurationTime.length === 0 && (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Data Not Found{" "}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalDurationTime.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}
export default Tableforfilter;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1B6E95",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// =================================================================

// import * as React from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import { DataGrid } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import ClearIcon from "@mui/icons-material/Clear";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import SearchIcon from "@mui/icons-material/Search";
// import { useEffect } from "react";
// import Authapi from "../../Services/Authapi";
// import { useState } from "react";
// import "./tablefilter.css";

// function escapeRegExp(value) {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }

// function QuickSearchToolbar(props) {
//   return (
//     <Box
//       sx={{
//         p: 0.5,
//         pb: 0,
//       }}
//     >
//       <TextField
//         variant="standard"
//         value={props.value}
//         onChange={props.onChange}
//         placeholder="Search…"
//         className="textBox"
//         style={{ float: "left" }}
//         InputProps={{
//           startAdornment: <SearchIcon fontSize="small" />,
//           endAdornment: (
//             <IconButton
//               title="Clear"
//               aria-label="Clear"
//               size="small"
//               style={{ visibility: props.value ? "visible" : "hidden" }}
//               onClick={props.clearSearch}
//             >
//               <CancelPresentationIcon fontSize="small" />
//             </IconButton>
//           ),
//         }}
//         sx={{
//           width: {
//             xs: 1,
//             sm: "auto",
//           },
//           m: (theme) => theme.spacing(1, 0.5, 1.5),
//           "& .MuiSvgIcon-root": {
//             mr: 0.5,
//           },
//           "& .MuiInput-underline:before": {
//             borderBottom: 1,
//             borderColor: "divider",
//           },
//         }}
//       />
//     </Box>
//   );
// }

// QuickSearchToolbar.propTypes = {
//   clearSearch: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

// const Tableforfilter = () => {
//   const [totalDurationTime, setTotalDurationTime] = useState();

//   useEffect(() => {
//     let today = new Date();
//     let month = today.getMonth() + 1;
//     let year = today.getFullYear();
//     Authapi.getAttandance(month, year).then((data) =>
//       setTotalDurationTime(data.data)
//     );
//   }, []);

//   const handleMonthChange = async (e) => {
//     let select = e.target.value;
//     let ds = new Date(select);

//     let month = ds.getMonth() + 1;
//     let year = ds.getFullYear();
//     const attr = await Authapi.getAttandance(month, year);

//     if (attr && attr.status === true) {
//       setTotalDurationTime(attr.data);
//     }
//   };

//   // const { data } = useDemoData({
//   //   dataSet: "Employee",
//   //   visibleFields: VISIBLE_FIELDS,
//   //   rowLength: 100,
//   // });

//   const columns = [
//     { field: "date", headerName: "Date", flex: 1 },
//     { field: "hours", headerName: "Hours / Min", flex: 1 },
//     { field: "attendance", headerName: "Attendance", flex: 1 },
//     { field: "dayType", headerName: "Day-Type", flex: 1 },
//   ];

//   const [searchText, setSearchText] = React.useState("");
//   // const [rows, setRows] = React.useState(data.rows);

//   const requestSearch = (searchValue) => {
//     setSearchText(searchValue);
//     const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

//     const filteredRows = totalDurationTime.filter((row) => {
//       return Object.keys(row).some((field) => {
//         return searchRegex.test(row[field].toString());
//       });
//     });
//     setTotalDurationTime(filteredRows);
//   };

//   // const clearSearch = () => {
//   //   setSearchText("");
//   //   requestSearch(searchText);
//   // };

//   var month = new Array();
//   month[0] = "01";
//   month[1] = "02";
//   month[2] = "03";
//   month[3] = "04";
//   month[4] = "05";
//   month[5] = "06";
//   month[6] = "07";
//   month[7] = "08";
//   month[8] = "09";
//   month[9] = "10";
//   month[10] = "11";
//   month[11] = "12";

//   var d = new Date();
//   var dateString = d.getFullYear() + "-" + month[d.getMonth()];

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: "10px",
//         }}
//       >
//         <TextField
//           id="datetime-local"
//           label="Select Month/Year"
//           views={["year", "month"]}
//           variant="outlined"
//           defaultValue={dateString}
//           type="Month"
//           onChange={handleMonthChange}
//           // className={classes.textField}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           inputProps={{ min: "2020-01", max: dateString }}
//         />
//       </div>
//       <>
//         <Box sx={{ height: 400, width: 1 }}>
//           {/* <DataGrid
//             components={{ Toolbar: QuickSearchToolbar }}
//             rows={totalDurationTime}
//             columns={columns}
//             pageSize={25}
//             componentsProps={{
//               toolbar: {
//                 value: searchText,
//                 onChange: (event) => requestSearch(event.target.value),
//                 clearSearch: () => requestSearch(""),
//               },
//             }}
//           /> */}
//         </Box>
//       </>
//     </div>
//   );
// };

// export default Tableforfilter;
