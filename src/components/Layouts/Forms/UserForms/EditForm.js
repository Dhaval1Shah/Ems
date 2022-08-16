/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./AddForm.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import AuthApi from "../../../Services/Authapi";
import FontAwesomeIconComponent from "../../../Layouts/FontAwesomeIconComponent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ls from "local-storage";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  roleName: "",
  uploadedImgName: "",
  user: false,
  user_id: 0,
  salary: "",
  mobileNo: "",
  bankName: "",
  bankAccNo: "",
  doj: "",
  location: "",
  department: "",
  designation: "",
  password: "",
  role: [],
};

const EditForm = (props) => {
  const styles = useStyles();
  const classes = props;
  const [editValues, setEditValues] = useState(iniuser);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleOptions] = React.useState([]);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setEditValues({ ...editValues, [name]: value });
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[a-zA-Z]/;
    const emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dobRegx =
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const Numeric = /^\d+$/;
    const phone = /^[0-9]{10}$/;

    if (!values.firstName) {
      errors.firstName = "Cannot be blank";
    } else if (!regex.test(values.firstName)) {
      errors.firstName = "Invalid firstName format";
    }

    if (!values.lastName) {
      errors.lastName = "Cannot be blank";
    } else if (!regex.test(values.lastName)) {
      errors.lastName = "Invalid lastName format";
    }

    if (!values.email) {
      errors.email = "Cannot be  blank";
    } else if (!emailRegx.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.dob) {
      errors.dob = "Cannot be  blank";
    } else if (!dobRegx.test(values.dob)) {
      errors.dob = "Invalid dob format";
    }

    if (!values.qualification) {
      errors.qualification = "Cannot be blank";
    } else if (!regex.test(values.qualification)) {
      errors.qualification = "Invalid qualification format";
    }

    if (!values.last_organization) {
      errors.last_organization = "Cannot be blank";
    } else if (!regex.test(values.last_organization)) {
      errors.last_organization = "Invalid last_organization format";
    }

    if (!values.roleName) {
      errors.roleName = "Cannot be blank";
    }

    if (!values.salary) {
      errors.salary = "Cannot be blank";
    } else if (!Numeric.test(values.salary)) {
      errors.salary = "Must Be Numeric";
    }

    if (!values.mobileNo) {
      errors.mobileNo = "Cannot be blank";
    } else if (!phone.test(values.mobileNo)) {
      errors.mobileNo = "Must Be Numeric and 10 digit Fix ";
    }

    if (!values.bankName) {
      errors.bankName = "Cannot be blank";
    } else if (!regex.test(values.bankName)) {
      errors.bankName = "Please Enter Your bank Name";
    }

    if (!values.bankAccNo) {
      errors.bankAccNo = "Cannot be blank";
    } else if (!Numeric.test(values.bankAccNo)) {
      errors.bankAccNo = "Must Be Numeric ";
    }

    if (!values.doj) {
      errors.doj = "Cannot be  blank";
    } else if (!dobRegx.test(values.doj)) {
      errors.doj = "Invalid dob format";
    }

    if (!values.location) {
      errors.location = "Cannot be blank";
    } else if (!regex.test(values.location)) {
      errors.location = "Please Enter Location";
    }

    if (!values.department) {
      errors.department = "Cannot be blank";
    } else if (!regex.test(values.department)) {
      errors.department = "Please Enter Department";
    }

    if (!values.designation) {
      errors.designation = "Cannot be blank";
    } else if (!regex.test(values.designation)) {
      errors.designation = "Please Enter Department";
    }

    return errors;
  };

  const getFormData = async () => {
    let userId =
      props.history.location.pathname.split("/")[
        props.history.location.pathname.split("/").length - 1
      ];
    let user = await AuthApi.singleUser(userId);

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
    let salary =
      user.status === true && user.data && user.data.salary
        ? user.data.salary
        : null;
    let mobileNo =
      user.status === true && user.data && user.data.mobileNo
        ? user.data.mobileNo
        : null;
    let bankName =
      user.status === true && user.data && user.data.bankName
        ? user.data.bankName
        : null;
    let bankAccNo =
      user.status === true && user.data && user.data.bankAccNo
        ? user.data.bankAccNo
        : null;
    let doj =
      user.status === true && user.data && user.data.doj ? user.data.doj : null;
    let location =
      user.status === true && user.data && user.data.location
        ? user.data.location
        : null;
    let department =
      user.status === true && user.data && user.data.department
        ? user.data.department
        : null;
    let designation =
      user.status === true && user.data && user.data.designation
        ? user.data.designation
        : null;

    let password = editValues.password;

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
      salary: salary,
      mobileNo: mobileNo,
      bankName: bankName,
      bankAccNo: bankAccNo,
      doj: doj,
      location: location,
      department: department,
      designation: designation,
      password: password,
      user_id: user_id,
    });
  };
  useEffect(() => setTimeout(() => getFormData(), 1000), []);

  const imgUpload = async (e) => {
    const postData = new FormData();
    postData.append("file", e.target.files[0]);
    let updateImg = await AuthApi.updateImg(postData);
    console.log(updateImg);
    // return false;
    if (updateImg && updateImg.status === true) {
      setEditValues({
        ...editValues,
        photo: updateImg.data.image_url,
        uploadedImgName: updateImg.data.image_name,
      });
      //   console.log(editValues)
    }
  };

  const removeImg = async (e) => {
    let imageLink = editValues.photo;
    imageLink = imageLink.substr(imageLink.indexOf("/", 7) + 1);
    let remImg = await AuthApi.deleteImg(imageLink);
    if (remImg && remImg.status === true) {
      // setEditValues({
      //     // ...setEditValues,
      //     photo: null,
      //     imageName: null
      // })
      getFormData();
    } else {
    }
    // setEditValues({
    //     photo: null,
    //     uploadedImgName: null
    // })
  };

  async function RoleData() {
    let role = await AuthApi.getRole();

    //    console.log(editValues);

    if (role && role.status === true) {
      if (Object.keys(role.data).length > 0) {
        Object.keys(role.data).forEach((key) => {
          roleOptions.push(
            <MenuItem key={key} value={role.data[key].name}>
              {role.data[key].name}
            </MenuItem>
          );
        });
      } else {
        roleOptions.push(
          <MenuItem value="">
            <em>Select Role</em>
          </MenuItem>
        );
      }
    }
  }
  React.useEffect(() => RoleData(), []);

  //    const  addRole =(e) =>{
  //         let user = editValues;
  //         console.log(user);
  //         user.roleName = e.target.value;
  //         setEditValues({
  //             editValues: user
  //         })
  //     }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(editValues));
    setIsSubmitting(true);
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      // submitForm();
      await editUser1();
    }
  }, [formErrors]);

  const editUser1 = async (id) => {
    let status = await AuthApi.updateUser(editValues, editValues.user_id);
    console.log(status);
    if (status && status.status === true) {
      props.history.push("/users");
    }
  };

  // console.log(editValues);

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="firstName"
              label="First name"
              variant="outlined"
              error={formErrors.firstName && true}
              value={
                editValues && editValues.firstName !== null
                  ? editValues.firstName
                  : null
              }
              // focused={(editValues && editValues.firstName !== null) ? true : false}
              onChange={handleChange1}
              className={formErrors.firstName && "input-error"}
            />
            {formErrors.firstName && (
              <span className="error">{formErrors.firstName}</span>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="lastName"
              label="Last name"
              variant="outlined"
              value={
                editValues && editValues.lastName !== null
                  ? editValues.lastName
                  : null
              }
              // focused={(editValues && editValues.lastName !== null) ? true : false}
              onChange={handleChange1}
              className={formErrors.lastName && "input-error"}
              error={formErrors.lastName && true}
            />
            {formErrors.lastName && (
              <span className="error">{formErrors.lastName}</span>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="email"
              label="Email-address"
              variant="outlined"
              value={
                editValues && editValues.email !== null
                  ? editValues.email
                  : null
              }
              // focused={(editValues && editValues.email !== null) ? true : false}
              error={formErrors.email && true}
              onChange={handleChange1}
              className={formErrors.email && "input-error"}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4} style={{ display: "flex" }}>
            <FormControl component="fieldset">
              <Grid container className={classes.root} spacing={4}>
                <Grid item xs={12} style={{ display: "flex" }}>
                  <FormLabel component="legend">Gender</FormLabel>
                </Grid>
              </Grid>
              <RadioGroup
                aria-label="gender"
                name="gender"
                onChange={handleChange1}
                value={editValues.gender}
                // focused={(editValues && editValues.gender !== null) ? true : false}
              >
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="date"
              label="Birthday"
              name="dob"
              type="date"
              variant="outlined"
              // defaultValue="2017-05-24"
              error={formErrors.dob && true}
              value={
                editValues && editValues.dob !== null ? editValues.dob : null
              }
              // focused={(editValues && editValues.dob !== null) ? true : false}
              onChange={handleChange1}
              className={formErrors.dob && "input-error"}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {formErrors.dob && <span className="error">{formErrors.dob}</span>}
          </Grid>

          <Grid item xs={4} style={{ display: "flex" }}>
            {editValues.photo === null ? (
              <div>
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
                  <Button variant="contained" color="primary" component="span">
                    {" "}
                    Upload Profile Picture{" "}
                  </Button>
                </label>
              </div>
            ) : (
              <div>
                <Card className={classes.root}>
                  <CardContent>
                    <Grid container className={classes.root} spacing={5}>
                      <Grid item xs={4}>
                        <img
                          src={editValues.photo}
                          alt="User profile imagelllll"
                          width="35"
                          height="35"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" gutterBottom>
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
                            fontSize={"small"}
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
        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="qualification"
              label="Qualification"
              variant="outlined"
              value={
                editValues && editValues.qualification !== null
                  ? editValues.qualification
                  : null
              }
              // focused={(editValues && editValues.qualification !== null) ? true : false}
              error={formErrors.qualification && true}
              onChange={handleChange1}
              className={formErrors.dob && "input-error"}
            />
            {formErrors.qualification && (
              <span className="error">{formErrors.qualification}</span>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="last_organization"
              label="Last Organization"
              variant="outlined"
              value={
                editValues && editValues.last_organization !== null
                  ? editValues.last_organization
                  : null
              }
              // focused={(editValues && editValues.last_organization !== null) ? true : false}
              error={formErrors.last_organization && true}
              onChange={handleChange1}
              className={formErrors.last_organization && "input-error"}
            />
            {formErrors.last_organization && (
              <span className="error">{formErrors.last_organization}</span>
            )}
          </Grid>
          <Grid item xs={4}>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="roleName"
                label="Role"
                error={formErrors.roleName && true}
                className={formErrors.roleName && "input-error"}
                onChange={handleChange1}
                value={
                  editValues &&
                  editValues.roleName &&
                  editValues.roleName !== null
                    ? editValues.roleName
                    : ""
                }
                // focused={(editValues && editValues.roleName && editValues.roleName !== null) ? true : false}
              >
                {roleOptions}
              </Select>
            </FormControl>
            {formErrors.roleName && (
              <span className="error">{formErrors.roleName}</span>
            )}
          </Grid>
        </Grid>

        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              error={formErrors.password && true}
              value={editValues.password}
              onChange={handleChange1}
              className={formErrors.password && "input-error"}
            />
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <Grid container className={classes.root} spacing={5}>
          <Grid item xs={12}>
            <div className={styles.root}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ color: "#1B6E95" }}
                >
                  <Typography className={styles.heading}>
                    Other Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="location"
                        label="Location"
                        variant="outlined"
                        value={
                          editValues && editValues.location !== null
                            ? editValues.location
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.location && "input-error"}
                        error={formErrors.location && true}
                      />
                      {formErrors.location && (
                        <span className="error">{formErrors.location}</span>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="mobileNo"
                        label="Mobile No"
                        variant="outlined"
                        value={
                          editValues && editValues.mobileNo !== null
                            ? editValues.mobileNo
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.mobileNo && "input-error"}
                        error={formErrors.mobileNo && true}
                      />
                      {formErrors.mobileNo && (
                        <span className="error">{formErrors.mobileNo}</span>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="date"
                        label="Date of joining"
                        name="doj"
                        type="date"
                        variant="outlined"
                        // defaultValue="2017-05-24"
                        error={formErrors.doj && true}
                        value={
                          editValues && editValues.doj !== null
                            ? editValues.doj
                            : null
                        }
                        // focused={(editValues && editValues.dob !== null) ? true : false}
                        onChange={handleChange1}
                        className={formErrors.doj && "input-error"}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {formErrors.dob && (
                        <span className="error">{formErrors.doj}</span>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>

                <AccordionDetails>
                  <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="bankAccNo"
                        label="Bank Account Number"
                        variant="outlined"
                        value={
                          editValues && editValues.bankAccNo !== null
                            ? editValues.bankAccNo
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.bankAccNo && "input-error"}
                        error={formErrors.bankAccNo && true}
                      />
                      {formErrors.bankAccNo && (
                        <span className="error">{formErrors.bankAccNo}</span>
                      )}
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="bankName"
                        label="Bank Name"
                        variant="outlined"
                        value={
                          editValues && editValues.bankName !== null
                            ? editValues.bankName
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.bankName && "input-error"}
                        error={formErrors.bankName && true}
                      />
                      {formErrors.bankName && (
                        <span className="error">{formErrors.bankName}</span>
                      )}
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="designation"
                        label="Designation"
                        variant="outlined"
                        value={
                          editValues && editValues.designation !== null
                            ? editValues.designation
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.designation && "input-error"}
                        error={formErrors.designation && true}
                      />
                      {formErrors.designation && (
                        <span className="error">{formErrors.designation}</span>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>

                <AccordionDetails>
                  <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        name="department"
                        label="Department"
                        variant="outlined"
                        value={
                          editValues && editValues.department !== null
                            ? editValues.department
                            : null
                        }
                        onChange={handleChange1}
                        className={formErrors.department && "input-error"}
                        error={formErrors.department && true}
                      />
                      {formErrors.department && (
                        <span className="error">{formErrors.department}</span>
                      )}
                    </Grid>

                    {ls("roles") === "Admin" ? (
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          name="salary"
                          label="Salary"
                          variant="outlined"
                          value={
                            editValues && editValues.salary !== null
                              ? editValues.salary
                              : null
                          }
                          // focused={(editValues && editValues.lastName !== null) ? true : false}
                          onChange={handleChange1}
                          className={formErrors.salary && "input-error"}
                          error={formErrors.salary && true}
                        />
                        {formErrors.salary && (
                          <span className="error">{formErrors.salary}</span>
                        )}
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </Grid>

        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={4} style={{ display: "flex" }}>
            <Button type="submit" variant="contained" color="primary">
              Edit User{" "}
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                props.history.push("/users");
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditForm;
