import React, { useState, useEffect } from "react";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumb from "../../Layouts/Breadcrumb";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AuthApi from "../../Services/Authapi";
import swal from "sweetalert";

const inivalue = {
  qulification: "",
  quli_id: 0,
};

const AddQulification = (props) => {
  const classes = props;
  const [qulifi, setQulifi] = useState(inivalue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props && props.authToken === false) {
      props.history.push("/login");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQulifi({ ...qulifi, [name]: value });
    // console.log(ticketValues);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[a-zA-Z]/;
    const ds = /^[0-9\b]+$/;
    // const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

    if (!values.qulification) {
      errors.qulification = "Cannot be blank";
    }

    return errors;
  };

  const getQulification = async () => {
    let quliId =
      props.history.location.pathname.split("/")[
        props.history.location.pathname.split("/").length - 1
      ];
    let get = await AuthApi.singleQulification(quliId);
    let quli_id = quliId;

    let qualification =
      get.data &&
      get.data &&
      (get.data.qualification !== null || get.data.qualification !== false)
        ? get.data.qualification
        : null;

    setQulifi({
      qulification: qualification,
      quli_id: quli_id,
    });
  };

  useEffect(() => setTimeout(() => getQulification(), 500), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(qulifi));
    setIsSubmitting(true);
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      await Qulification();
    }
  }, [formErrors]);

  const Qulification = async (id) => {
    let status = await AuthApi.editQulification(qulifi, qulifi.quli_id);
    if (status && status.status === true) {
      props.history.push("/qulification");
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
                  primaryPageName="Qulification"
                  primaryPageLink="/qulification"
                  isSecondaryPage={true}
                  secondaryPageName="Edit"
                />
              </CardContent>
            </Card>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h2">Edit Qulification</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <Grid container className={classes.root} spacing={5}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            id="Qulification"
                            name="qulification"
                            label="Qulification"
                            variant="outlined"
                            error={formErrors.qulification && true}
                            value={
                              qulifi && qulifi.qulification !== null
                                ? qulifi.qulification
                                : null
                            }
                            onChange={handleChange}
                            className={formErrors.qulification && "input-error"}
                          />
                          {formErrors.qulification && (
                            <span className="error">
                              {formErrors.qulification}
                            </span>
                          )}
                        </Grid>
                      </Grid>

                      <Grid container className={classes.root} spacing={5}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>

                      <Grid container className={classes.root} spacing={3}>
                        <Grid item xs={4} style={{ display: "flex" }}>
                          <Button
                            type="submit"
                            style={{ marginTop: "10px" }}
                            variant="contained"
                            color="primary"
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            style={{ marginTop: "10px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              props.history.push("/qulification");
                            }}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </div>
        }
      />
      <Footer />
    </div>
  );
};

export default AddQulification;
