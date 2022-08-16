import React, { useState, useEffect, useRef } from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Breadcrumb from "../../Layouts/Breadcrumb";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import LoadderButton from "../../Layouts/LoadderButton";
import AuthApi from "../../Services/Authapi";
import Paper from "@material-ui/core/Paper";
import FontAwesomeIconComponent from "../../Layouts/FontAwesomeIconComponent";
import { SignalCellularNull } from "@material-ui/icons";
import Authapi from "../../Services/Authapi";
import swal from "sweetalert";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { months, now } from "moment";
import moment from "moment";
import ls from "local-storage";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Pdfdownload } from "../../../TableAction";
import { isEmptyArray } from "formik";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Logo from "../../../Images/logo.png";

let length;

let ds;

const columns = [
  { id: "BasicSalary", label: "BasicSalary", minWidth: 170 },
  { id: "DA", label: "DA", minWidth: 100 },
  { id: "HRA", label: "HRA", minWidth: 170, align: "right" },
  { id: "CA", label: "CA", minWidth: 170, align: "right" },
  { id: "Tax", label: "Tax", minWidth: 170, align: "right" },
  { id: "netSalary", label: "NetSalary", minWidth: 170, align: "right" },
  { label: "Actions", buttons: [Pdfdownload] },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "left",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  hr: {
    borderTop: "3px solid #1B6E95",
  },
  container: {
    maxHeight: 440,
  },
  spacing: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const iniuser = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dob: "",
  photo: "",
  qualification: "",
  last_organization: "",
  uploadedImgName: "",
  roleName: "",
  user: false,
  user_id: 0,
};

const iniSalary = {
  salary: "",
};

const DataForSal = {
  getData: [],
};

let inipdf = [];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Profile = (props) => {
  const classes = props;
  const classes1 = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [editValues, setEditValues] = useState(iniuser);
  const [shown, setShown] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sal, setSal] = useState(iniSalary);
  const [data, setData] = useState(DataForSal);
  const [click, setClick] = useState(false);

  const handleChangePage1 = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setEditValues({ ...editValues, [name]: value });
  };

  // const handleSalary = (e) => {
  //     const { name, value } = e.target;
  //     setSal({ ...sal, [name]: value });
  //     console.log(sal.salary)
  // }

  // const addSalary1 = async () => {
  //     let userId = ls('user').id
  //     console.log(userId)
  //     const gh = await AuthApi.addSalary(sal, userId);
  //     if (gh && gh.status === true) {
  //         console.log("ds")
  //         props.history.push("/dashboard")
  //     }
  // }

  // const AllSalaryData = async (e) => {
  //     const select = e.target.value
  //     console.log(select)
  //     // let today = new Date(select);
  //     // let month = today.getMonth() + 1;
  //     // let year = today.getFullYear();
  //     // console.log(month)
  //     // const AllData = await AuthApi.getAllSalaryData(month, year);
  //     // console.log(AllData)

  //     // // length = AllData.data.length
  //     // if (AllData && AllData.status === true) {
  //     //     setData({
  //     //         ...data,
  //     //         getData: AllData.data
  //     //     })

  //     //     console.log(data)
  //     // }

  // }
  // useEffect(
  //     () =>
  //         setTimeout(
  //             () => AllSalaryData(),
  //             10), []);

  function createData(BasicSalary, DA, HRA, CA, Tax, netSalary) {
    return { BasicSalary, DA, HRA, CA, Tax, netSalary };
  }

  ds = [data.getData];

  const rows = [];

  if (ds[0].length !== 0) {
    ds[0].forEach((element1) => {
      rows.push(
        createData(
          element1.BasicSalary,
          element1.DA,
          element1.HRA,
          element1.CA,
          element1.Tax,
          element1.netSalary
        )
      );
    });
  } else {
    rows.push(createData("Data Not Found"));
  }

  const getFormData = async () => {
    let userId = ls("user").id;
    let user = await AuthApi.singleUser(userId);
    // console.log(user)
    // editUser = editValues;

    let user_id = userId;
    let firstName =
      user.status === true &&
      user.data &&
      user.data.firstName &&
      (user.data.firstName !== null || user.data.firstName !== false)
        ? user.data.firstName
        : null;
    let lastName =
      user.status === true && user.data && user.data.lastName
        ? user.data.lastName
        : null;
    let email =
      user.status === true && user.data && user.data.email
        ? user.data.email
        : null;
    let gender =
      user.status === true && user.data && user.data.gender
        ? user.data.gender
        : null;
    let dob =
      user.status === true && user.data && user.data.dob ? user.data.dob : null;
    let photo =
      user.status === true && user.data && user.data.photo
        ? user.data.photo
        : null;
    let qualification =
      user.status === true && user.data && user.data.qualification
        ? user.data.qualification
        : null;
    let last_organization =
      user.status === true && user.data && user.data.last_organization
        ? user.data.last_organization
        : null;
    let userRole =
      user.status === true &&
      user.data &&
      user.data.roles &&
      Object.keys(user.data.roles).length > 0
        ? user.data.roles
        : [];
    let roleName = Object.keys(userRole).length > 0 ? userRole[0].name : null;
    let imageName =
      user.data.photo !== null
        ? user.data.photo.substr(user.data.photo.lastIndexOf("/") + 1)
        : "";
    let uploadedImgName = imageName;
    setEditValues({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      dob: dob,
      photo: photo,
      qualification: qualification,
      last_organization: last_organization,
      roleName: roleName,
      uploadedImgName: uploadedImgName,
      user_id: user_id,
    });
  };
  useEffect(() => setTimeout(() => getFormData(), 10), []);

  const imgUpload = async (e) => {
    const postData = new FormData();
    postData.append("file", e.target.files[0]);
    let updateImg = await AuthApi.updateImg(postData);
    if (updateImg && updateImg.status === true) {
      setEditValues({
        ...editValues,
        photo: updateImg.data.image_url,
        uploadedImgName: updateImg.data.image_name,
      });
    }
  };

  const removeImg = () => {
    setEditValues({
      ...editValues,
      photo: null,
      uploadedImgName: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const editUser1 = async (id) => {
    let status = await AuthApi.updateUser(editValues, ls("user").id);
    if (status && status.status === true) {
      ls.set("user", false);
      ls.set("user", status.data);
      props.history.push("/dashboard");
    }
  };

  const call1 = async (e) => {
    if (shown === false) {
      setShown({ shown: shown });
    } else {
      handleSubmit(e);
      await editUser1();
    }
  };

  console.warn = console.error = () => {};

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

  const handleMonthChange = async (e) => {
    let select = e.target.value;

    let today = new Date(select);
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    const AllData = await AuthApi.getAllSalaryData(month, year);
    // console.log(AllData.salarySlip)

    // length = AllData.data.length
    if (AllData && AllData.status === true) {
      setData({
        ...data,
        getData: AllData.salarySlip,
      });
    }
  };

  const allData = async (e) => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const dis = await AuthApi.getAllSalaryData(month, year);
    if (dis && dis.status === true) {
      setData({
        ...data,
        getData: dis.salarySlip,
      });
    }

    const input = document.getElementById("datetime-local");
    input.value = dateString;
  };

  const pdfGenrate = async () => {
    const input = document.getElementById("datetime-local");
    let today = new Date(input.value);
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    const pdfGen = await AuthApi.getAllSalaryData(month, year);
    var cuurentMonth = new Array();
    cuurentMonth[1] = "January";
    cuurentMonth[2] = "February";
    cuurentMonth[3] = "March";
    cuurentMonth[4] = "April";
    cuurentMonth[5] = "May";
    cuurentMonth[6] = "June";
    cuurentMonth[7] = "July";
    cuurentMonth[8] = "August";
    cuurentMonth[9] = "September";
    cuurentMonth[10] = "October";
    cuurentMonth[11] = "November";
    cuurentMonth[12] = "December";

    var cMonth = cuurentMonth[month];

    if (pdfGen) {
      var dd = {
        background: function (currentPage, pageSize) {
          return {
            image: Logo,
            width: 420,
            height: 350,
            absolutePosition: { x: 77, y: 40 },
            opacity: 0.2,
          };
        },
        content: [
          {
            nodeName: "TABLE",
            table: {
              body: [
                [
                  {
                    image: Logo,
                    width: 50,
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#356631",
                    alignment: "center",
                    color: "white",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 2,
                  },
                  {
                    text: "",
                  },
                  {
                    nodeName: "TH",
                    stack: [
                      {
                        text: "Cherrypik Software Inc.",
                        nodeName: "H2",
                        bold: true,
                        fillColor: "#356631",
                        alignment: "center",
                        color: "white",
                        fontSize: 22,
                        marginBottom: 5,
                        marginTop: 12,
                        style: [
                          "html-h2",
                          "html-th",
                          "html-tr",
                          "html-tbody",
                          "html-table",
                        ],
                      },
                    ],
                    colSpan: 14,
                    bold: true,
                    fillColor: "#356631",
                    alignment: "center",
                    color: "white",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    nodeName: "TD",
                    stack: [
                      {
                        text: "Payslip for" + " " + cMonth + " " + year,
                        nodeName: "H6",
                        alignment: "center",
                        fontSize: 14,
                        bold: true,
                        marginBottom: 5,
                        style: [
                          "html-h6",
                          "html-td",
                          "html-tr",
                          "html-tbody",
                          "html-table",
                        ],
                      },
                    ],
                    colSpan: 16,
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Mobile Number",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    width: 151,
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.mobileNo,
                    nodeName: "TD",
                    width: 151,
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Name",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    width: 151,
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.firstName + " " + pdfGen.user.lastName,
                    nodeName: "TD",
                    width: 151,
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Bank Name",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.bankName,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Bank A/c No",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.bankAccNo,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Date of Join",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.doj,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "location",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.user.location,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Working Days",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.totalWorkingDays,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Attended Days",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.totalAttendedDays,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Free Leave",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.totalFreeLeaveDays,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Paid Leave",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.totalPaidLeaveDays,
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 16,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Earnings",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Amount",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Deductions",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Amount",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#b5d59b",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Basic Salary",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].BasicSalary,
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Professinal Tax",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].Tax,
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "DA",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].DA,
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Income Tax",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "-",
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "HRA",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].HRA,
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                    nodeName: "TD",
                    colSpan: 8,
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "CA",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].CA,
                    nodeName: "TD",
                    alignment: "center",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                    nodeName: "TD",
                    colSpan: 8,
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 16,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Gross Earnings",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text:
                      parseInt(pdfGen.salarySlip[0].BasicSalary) +
                      parseInt(pdfGen.salarySlip[0].DA) +
                      parseInt(pdfGen.salarySlip[0].HRA) +
                      parseInt(pdfGen.salarySlip[0].CA),
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "Gross Deductions",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].Tax,
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    alignment: "center",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 4,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "",
                    nodeName: "TD",
                    style: ["html-td", "html-tr", "html-tbody", "html-table"],
                    colSpan: 16,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
                [
                  {
                    text: "Net Pay",
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    alignment: "right",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 8,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: pdfGen.salarySlip[0].netSalary,
                    nodeName: "TH",
                    bold: true,
                    fillColor: "#EEEEEE",
                    style: ["html-th", "html-tr", "html-tbody", "html-table"],
                    colSpan: 8,
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                  {
                    text: "",
                  },
                ],
              ],
              widths: [
                37.75,
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                37.75,
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
            },
            marginBottom: 5,
            width: 200,
            margin: [50, 5, 5, 5],
            style: ["html-table"],
          },
        ],
        styles: {
          green: {
            color: "green",
          },
        },
      };

      // let doc = new jsPDF( 'l','px', 'letter', [1, 1])
      // const doc = new jsPDF();

      //get table html
      //html to pdf format
      // var html = htmlToPdfmake(pdfGen);

      // const documentDefinition = { content: html };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(dd).open();

      // doc.setFontSize(12);
      // doc.html(pdfGen,

      //     {
      //     callback: function (doc) {

      //         doc.save('sample.pdf');
      //     },
      // //    width: 100
      // });
      // doc.setFontSize(8);

      //     const el = document.getElementById('content')
      //         el.style.display = 'block'
      //         console.log(el)
      //     if (typeof (el) === 'object' && el !== null) {
      //

      //         // html2pdf().set(opt).from(source).save();
      //         // doc.setFontSize(1);

      //     }
      //     el.style.display = 'none'
    }
  };

  return (
    <div>
      <Header
        {...props}
        authUser={props.authUser}
        component={
          <div>
            <Card className={classes.root} style={{ marginBottom: "3%" }}>
              <CardContent>
                <Breadcrumb
                  {...props}
                  primaryPageName="Profile"
                  primaryPageLink="/profile"
                  isSecondaryPage={false}
                  secondaryPageName=""
                />
              </CardContent>
            </Card>

            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Profile Info" {...a11yProps(0)} />
                <Tab label="Salary Info" {...a11yProps(1)} onClick={allData} />
                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ float: "left" }}
                            >
                              FirstName :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.firstName}
                              </Typography>
                            ) : (
                              true && (
                                <TextField
                                  style={{ float: "left" }}
                                  id="standard-basic"
                                  variant="outlined"
                                  name="firstName"
                                  label="FirstName"
                                  value={editValues.firstName}
                                  onChange={handleChange1}
                                />
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              LastName :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.lastName}
                              </Typography>
                            ) : (
                              true && (
                                <TextField
                                  style={{ float: "left" }}
                                  id="standard-basic"
                                  name="lastName"
                                  variant="outlined"
                                  label="LastName"
                                  value={editValues.lastName}
                                  onChange={handleChange1}
                                />
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Email :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                              display="block"
                            >
                              {editValues.email}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Gender :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.gender}
                              </Typography>
                            ) : (
                              true && (
                                <RadioGroup
                                  aria-label="gender"
                                  name="gender"
                                  value={editValues.gender}
                                  onChange={handleChange1}
                                >
                                  <Grid
                                    container
                                    className={classes.root}
                                    spacing={2}
                                  >
                                    <FormControlLabel
                                      style={{ float: "left" }}
                                      value="Female"
                                      control={<Radio />}
                                      label="Female"
                                    />
                                    <FormControlLabel
                                      style={{ float: "left" }}
                                      value="Male"
                                      control={<Radio />}
                                      label="Male"
                                    />
                                  </Grid>
                                </RadioGroup>
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Dob :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.dob}
                              </Typography>
                            ) : (
                              true && (
                                <TextField
                                  style={{ float: "left" }}
                                  id="date"
                                  variant="outlined"
                                  label="Birthday"
                                  name="dob"
                                  type="date"
                                  value={editValues.dob}
                                  className={classes.textField}
                                  onChange={handleChange1}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Photo :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {" "}
                                <img
                                  src={editValues.photo}
                                  alt="User profile imagelllll"
                                  width="100"
                                  height="100"
                                />
                              </Typography>
                            ) : editValues.photo === null ? (
                              <div style={{ float: "left" }}>
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  name="photo"
                                  id="contained-button-file"
                                  type="file"
                                  onChange={(e) => imgUpload(e)}
                                  style={{ display: "none" }}
                                />
                                <label htmlFor="contained-button-file">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    {" "}
                                    Upload Profile Picture{" "}
                                  </Button>
                                </label>
                              </div>
                            ) : (
                              <div style={{ float: "left" }}>
                                <Card className={classes.root}>
                                  <CardContent>
                                    <Grid
                                      container
                                      className={classes.root}
                                      spacing={3}
                                    >
                                      <Grid item xs={4}>
                                        <img
                                          src={editValues.photo}
                                          alt="User profile imagelllll"
                                          width="35"
                                          height="35"
                                        />
                                      </Grid>
                                      <Grid item xs={4}>
                                        <Typography
                                          variant="subtitle1"
                                          gutterBottom
                                        >
                                          {editValues.uploadedImgName}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <Button
                                          onClick={(e) => {
                                            removeImg(e);
                                          }}
                                        >
                                          <FontAwesomeIconComponent
                                            classes="fa fa-trash"
                                            colorName="primary"
                                            fontSize="small"
                                          />
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Qualification :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.qualification}
                              </Typography>
                            ) : (
                              true && (
                                <TextField
                                  style={{ float: "left" }}
                                  id="standard-basic"
                                  name="qualification"
                                  variant="outlined"
                                  label="Qualification"
                                  value={editValues.qualification}
                                  onChange={handleChange1}
                                />
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Last_organization :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {shown === false ? (
                              <Typography
                                component="span"
                                style={{ float: "left" }}
                                variant="body2"
                                display="block"
                              >
                                {editValues.last_organization}
                              </Typography>
                            ) : (
                              true && (
                                <TextField
                                  style={{ float: "left" }}
                                  id="standard-basic"
                                  name="last_organization"
                                  variant="outlined"
                                  label="Last_organization"
                                  value={editValues.last_organization}
                                  onChange={handleChange1}
                                />
                              )
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                            >
                              Role_Name :
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              component="span"
                              style={{ float: "left" }}
                              variant="body2"
                              display="block"
                            >
                              {editValues.roleName}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          className={classes1.controls}
                          spacing={3}
                        >
                          <Grid item xs={4} style={{ display: "flex" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={(e) => {
                                call1(e);
                              }}
                            >
                              Edit Profile{" "}
                            </Button>
                            <Button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                props.history.push("/dashboard");
                              }}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}></Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className={classes1.spacing}>
                  <TextField
                    id="datetime-local"
                    label="Select Month/Year"
                    views={["year", "month"]}
                    variant="outlined"
                    style={{ top: "-10px", float: "left" }}
                    defaultValue={dateString}
                    // value={select}
                    type="Month"
                    onChange={(e) => {
                      handleMonthChange(e);
                    }}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: "2020-01", max: dateString }}
                  />
                  {/* {ls('roles') === 'Super Admin' ?
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={{ float: "right", width: "25px" }}
                                            onClick={addSalary1}
                                        >
                                            Submit
                                        </Button> : null}

                                    {ls('roles') === 'Super Admin' ?
                                        <TextField
                                            id="outlined-basic"
                                            label="Salary"
                                            variant="outlined"
                                            name="salary"
                                            style={{ top: "-10px", float: "right" }}
                                            value={sal.salary}
                                            onChange={handleSalary}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> : null} */}
                </div>

                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <StyledTableRow>
                          {columns.map((column) => (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <StyledTableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                              >
                                {columns.map((column) => {
                                  if (column.buttons) {
                                    return (
                                      <StyledTableCell key={column.label}>
                                        {column.buttons.map((val, index) => {
                                          return (
                                            <React.Fragment key={index}>
                                              <Pdfdownload
                                                variant="contained"
                                                style={{
                                                  display:
                                                    ds[0].length !== 0
                                                      ? "block"
                                                      : "none",
                                                }}
                                                color="primary"
                                                classes="fas fa-file-pdf"
                                                colorName="primary"
                                                onClick={pdfGenrate}
                                              />
                                              {/* {click ? <Pdf /> : null} */}
                                            </React.Fragment>
                                          );
                                        })}
                                      </StyledTableCell>
                                    );
                                  }
                                  const value = row[column.id];
                                  return (
                                    <StyledTableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </StyledTableCell>
                                  );
                                })}
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage1}
                    onChangeRowsPerPage={handleChangeRowsPerPage1}
                  />
                </Paper>
              </TabPanel>

              {/* <TabPanel value={value} index={2} dir={theme.direction}>
                                <h1>Dhaval shah</h1>
                            </TabPanel> */}
            </SwipeableViews>
          </div>
        }
      />
      <Footer />
    </div>
  );
};

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

export default Profile;
