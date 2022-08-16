import React, { useState, useEffect } from 'react'
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';




let userData;

const iniDoc = {
    candidateName: "",
    designation: "",
    doj: "",
    monthlySalary: "",
    location: "",

}

const iniData = {
    userData: [],
}

const Offer = (props) => {
    const classes = props;
    const [doc, setDoc] = useState(iniDoc);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formvalue, setFormvalue] = useState(iniData)


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoc({ ...doc, [name]: value });
    };


    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;
        const dobRegx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        const Numeric = /^\d+$/;


        if (!values.candidateName) {
            errors.candidateName = "Cannot be blank";
        } else if (!regex.test(values.candidateName)) {
            errors.candidateName = "Invalid candidateName format";
        }

        if (!values.designation) {
            errors.designation = "Cannot be blank";
        } else if (!regex.test(values.designation)) {
            errors.designation = "Invalid designation format";
        }

        if (!values.doj) {
            errors.doj = "Cannot be blank";
        } else if (!dobRegx.test(values.doj)) {
            errors.doj = "Invalid dateOfJoining format";
        }

        if (!values.monthlySalary) {
            errors.monthlySalary = "Cannot be blank";
        } else if (!Numeric.test(values.monthlySalary)) {
            errors.monthlySalary = "Must Be Numeric"
        }

        if (!values.location) {
            errors.location = "Cannot be blank";
        } else if (!regex.test(values.location)) {
            errors.location = "Invalid location format"
        }





        return errors;
    };





    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(doc));
        setIsSubmitting(true);

        // console.log(props.history.replace({ state: { doc: doc } }));

        console.log(doc)
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            generatePdf();

            // setDoc({
            //     candidateName: '',
            //     designation: '',
            //     doj: '',
            //     monthlySalary: '',
            //     location: '',
            // })
        }





    }


    // var ds = "Dhaval"
    // console.log(ds)
    // ds = doc.candidateName
    // console.log(ds)



    const generatePdf = () => {
        // setFormErrors({
        //     doc
        // })

        var dd = {
            "content": [
                {
                    "nodeName": "TABLE",
                    "table": {
                        "body": [
                            [
                                {
                                    "nodeName": "TH",
                                    "stack": [
                                        {
                                            "text": "Cherrypik Software Inc.",
                                            "nodeName": "H1",
                                            "bold": true,
                                            "fillColor": "#356631",
                                            "alignment": "center",
                                            "color": "white",
                                            "fontSize": 24,
                                            "marginBottom": 5,
                                            "style": [
                                                "html-h1",
                                                "html-th",
                                                "html-tr",
                                                "html-tbody",
                                                "html-table"
                                            ]
                                        },
                                        {
                                            "text": "Offer-Later",
                                            "nodeName": "H2",
                                            "bold": true,
                                            "fillColor": "#356631",
                                            "alignment": "center",
                                            "color": "white",
                                            "fontSize": 22,
                                            "marginBottom": 5,
                                            "style": [
                                                "html-h2",
                                                "html-th",
                                                "html-tr",
                                                "html-tbody",
                                                "html-table"
                                            ]
                                        }
                                    ],
                                    "colSpan": 16,
                                    "bold": true,
                                    "fillColor": "#356631",
                                    "alignment": "center",
                                    "color": "white",
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ]
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "nodeName": "TD",
                                    "stack": [
                                        {
                                            "text": "Offer-Later",
                                            "nodeName": "H6",
                                            "alignment": "center",
                                            "fontSize": 14,
                                            "bold": true,
                                            "marginBottom": 5,
                                            "style": [
                                                "html-h6",
                                                "html-td",
                                                "html-tr",
                                                "html-tbody",
                                                "html-table"
                                            ]
                                        }
                                    ],
                                    "colSpan": 16,
                                    "alignment": "center",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ]
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "text": "Candidate name",
                                    "nodeName": "TH",
                                    "bold": true,
                                    "fillColor": "#b5d59b",
                                    "width": 151,
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": doc.candidateName,
                                    "nodeName": "TD",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "text": "Designation",
                                    "nodeName": "TH",
                                    "bold": true,
                                    "fillColor": "#b5d59b",
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": doc.designation,
                                    "nodeName": "TD",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "text": "Date of Join",
                                    "nodeName": "TH",
                                    "bold": true,
                                    "fillColor": "#b5d59b",
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": doc.doj,
                                    "nodeName": "TD",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "text": "Monthly Salary",
                                    "nodeName": "TH",
                                    "bold": true,
                                    "fillColor": "#b5d59b",
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": doc.monthlySalary,
                                    "nodeName": "TD",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ],
                            [
                                {
                                    "text": "Location",
                                    "nodeName": "TH",
                                    "bold": true,
                                    "fillColor": "#b5d59b",
                                    "style": [
                                        "html-th",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": doc.location,
                                    "nodeName": "TD",
                                    "style": [
                                        "html-td",
                                        "html-tr",
                                        "html-tbody",
                                        "html-table"
                                    ],
                                    "colSpan": 8
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                },
                                {
                                    "text": ""
                                }
                            ]
                        ],
                        "widths": [
                            18.875,
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
                            "auto"
                        ],
                        "heights": [
                            "auto",
                            "auto",
                            "auto",
                            "auto",
                            "auto",
                            "auto",
                            "auto"
                        ]
                    },
                    "marginBottom": 5,
                    "style": [
                        "html-table"
                    ]
                }
            ],
            "styles": {
                "green": {
                    "color": "green"
                }
            }
        }

        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dd).open();



    }



    return (
        <div>

            <Header
                {...props}
                authUser={props.authUser}
                component={
                    <div>
                        <Card className={classes.root} style={{ marginBottom: '3%' }}>
                            <CardContent>
                                <Breadcrumb
                                    {...props}
                                    primaryPageName="Generate Documents"
                                    primaryPageLink="/offer"
                                    isSecondaryPage={false}
                                    secondaryPageName="" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2" style={{ paddingLeft: 5 }}>Generate Documents</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit} id="create-course-form" >
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="Candidatename"
                                                        name="candidateName"
                                                        label="Candidate Name"
                                                        variant="outlined"
                                                        error={formErrors.candidateName && true}
                                                        value={doc.candidateName}
                                                        onChange={handleChange}
                                                        className={formErrors.candidateName && "input-error"}

                                                    />
                                                    {formErrors.candidateName && (
                                                        <span className="error">{formErrors.candidateName}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="Designation"
                                                        name="designation"
                                                        label="Designation"
                                                        variant="outlined"
                                                        error={formErrors.designation && true}
                                                        value={doc.designation}
                                                        onChange={handleChange}
                                                        className={formErrors.designation && "input-error"}

                                                    />
                                                    {formErrors.designation && (
                                                        <span className="error">{formErrors.designation}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        variant="outlined"
                                                        label="Date of Join"
                                                        name="doj"
                                                        type="date"
                                                        error={formErrors.doj && true}
                                                        value={doc.doj}
                                                        onChange={handleChange}
                                                        className={formErrors.doj && "input-error"}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {formErrors.doj && (
                                                        <span className="error">{formErrors.doj}</span>
                                                    )}
                                                </Grid>

                                            </Grid>


                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="monthlySalary"
                                                        name="monthlySalary"
                                                        label="Monthly Salary"
                                                        variant="outlined"
                                                        error={formErrors.monthlySalary && true}
                                                        value={doc.monthlySalary}
                                                        onChange={handleChange}
                                                        className={formErrors.monthlySalary && "input-error"}

                                                    />
                                                    {formErrors.monthlySalary && (
                                                        <span className="error">{formErrors.monthlySalary}</span>
                                                    )}

                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="location"
                                                        name="location"
                                                        label="Location"
                                                        variant="outlined"
                                                        error={formErrors.location && true}
                                                        value={doc.location}
                                                        onChange={handleChange}
                                                        className={formErrors.location && "input-error"}

                                                    />
                                                    {formErrors.location && (
                                                        <span className="error">{formErrors.location}</span>
                                                    )}
                                                </Grid>

                                                <Grid item xs={4}></Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                                <Grid item xs={4}></Grid>
                                            </Grid>


                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} style={{ display: 'flex' }}>
                                                    <Button type="submit" variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px" }} onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }}>Cancel</Button>
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
                } />
            <Footer />

        </div>
    )
}

export default Offer;