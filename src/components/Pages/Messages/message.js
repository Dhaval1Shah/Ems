import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb";
import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";

const iniData = {
  name: "",
  title: "",
  sendMessage: "",
};

const Message = (props) => {
  const classes = props;

  const [message, setMessgae] = useState({ iniData });
  const [selectedImages, setSelectedImages] = useState([]);
  const [stringImages, setStringImages] = useState({ images: [] });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props && props.authToken === false) {
      props.history.push("/login");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessgae({ ...message, [name]: value });
  };

  const validate = (values) => {
    let errors = {};
    // const regex = /^[a-zA-Z]/;
    // const ds = /^[0-9\b]+$/;
    // // const dateR = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

    if (!values.name) {
      errors.name = "Cannot be blank";
    }

    if (!values.title) {
      errors.name = "Cannot be blank";
    }

    if (!values.sendMessage) {
      errors.name = "Cannot be blank";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(message));
    setIsSubmitting(true);
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      // await qulification();
    }
  }, [formErrors]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 130 },
  ];

  const rows = [
    { id: 1, name: "Snow", mobileNumber: 8511745623 },
    { id: 2, name: "Dhaval", mobileNumber: 241545421 },
    { id: 3, name: "Pratik", mobileNumber: 4512154687 },
    { id: 4, name: "Praveen", mobileNumber: 8517456234 },
    { id: 5, name: "Ritik", mobileNumber: 444475765 },
  ];

  const imageHandleChange = (e) => {
    const files = e.target.files;
    const stringFiles = [];
    if (e.target.files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          stringFiles.push(
            reader.result.replace("data:", "").replace(/^.+,/, "")
          );
        };
        reader.readAsDataURL(files[i]);
      }

      const fileArray1 = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      // console.log(fileArray1)
      setSelectedImages((prevImages) => prevImages.concat(fileArray1));
      setStringImages({ ...stringImages, images: stringFiles });

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <div key={Math.random()} style={{ float: "left" }}>
          <img
            src={photo}
            key={photo}
            alt="User profile image"
            style={{ padding: "20px" }}
            width="200px"
            height="200px"
          />
          <Button
            style={{ marginTop: "-20rem" }}
            onClick={(e) => {
              removeImage(index);
            }}
          >
            x
          </Button>
        </div>
      );
    });
  };

  const removeImage = (e) => {
    const stringImages1 = stringImages.images;
    const selectedImages1 = selectedImages;
    stringImages1.splice(e, 1);
    selectedImages1.splice(e, 1);

    setSelectedImages((prevImages) => (prevImages = selectedImages1));
    setStringImages({ ...stringImages, images: stringImages1 });
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
                  primaryPageName="Send Message"
                  primaryPageLink="/message"
                  isSecondaryPage={true}
                  secondaryPageName=""
                />
              </CardContent>
            </Card>

            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>

            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12} style={{ marginBottom: "40px" }}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h2" style={{ padding: 0 }}>
                      Send Message
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <Grid container className={classes.root} spacing={5}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            id="Title"
                            name="title"
                            label="Title"
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            id="content"
                            name="content"
                            label="Content"
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <div>
                            <input
                              accept="image/*"
                              // className={classes.input}
                              id="contained-button-file"
                              multiple
                              type="file"
                              onChange={(e) => {
                                imageHandleChange(e);
                              }}
                              style={{ display: "none" }}
                            />
                            <label htmlFor="contained-button-file">
                              <Button
                                style={{ float: "left" }}
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                {" "}
                                Upload Event Picture{" "}
                              </Button>
                            </label>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container className={classes.root} spacing={5}>
                        <Grid item xs={12}>
                          <div style={{ float: "left" }}>
                            <Card className={classes.root}>
                              <Grid item xs={12}>
                                {renderPhotos(selectedImages)}
                              </Grid>
                            </Card>
                          </div>
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
                            Send
                          </Button>
                          <Button
                            type="button"
                            style={{ marginTop: "10px" }}
                            onClick={(e) => {
                              e.preventDefault();
                              props.history.push("");
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
            </Grid>
          </div>
        }
      />

      <Footer />
    </div>
  );
};

export default Message;
