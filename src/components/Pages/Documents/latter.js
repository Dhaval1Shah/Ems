import React, { useState, useEffect, useContext } from 'react'
import Header from '../../Layouts/Header'
import Footer from '../../Layouts/Footer';
import Breadcrumb from '../../Layouts/Breadcrumb';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MUIRichTextEditor from "mui-rte";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import draftToHtml from 'draftjs-to-html';





const iniLatter = {
    title: '',


}


const Latter = (props) => {
    const classes = props;
    const [doc, setDoc] = useState(iniLatter);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (props && props.authToken === false) {
            props.history.push('/login');
        }
        // console.log(props.history)
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoc({ ...doc, [name]: value });

        console.log(doc)
    };




    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z]/;



        if (!values.title) {
            errors.title = "Cannot be blank";
        } else if (!regex.test(values.title)) {
            errors.title = "Invalid title format";
        }






        return errors;
    };


    const handleSubmit = async (e) => {

        e.preventDefault()
        setFormErrors(validate(doc));
        setIsSubmitting(true);

        console.log(doc)
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))





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
                                    primaryPageName="User Offerlatter"
                                    primaryPageLink="/latter"
                                    isSecondaryPage={false}
                                    secondaryPageName="" />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography variant="h2" style={{ paddingTop: 0, paddingLeft: 0, paddingBottom: 0 }}>Generate OfferLater</Typography>
                                        <form className={classes.form} onSubmit={handleSubmit}>
                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={6}>

                                                    <TextField
                                                        fullWidth
                                                        id="outlined-basic"
                                                        label="Title"
                                                        name="title"
                                                        variant="outlined"
                                                        error={formErrors.title && true}
                                                        value={doc.title}
                                                        onChange={handleChange}
                                                        className={formErrors.title && "input-error"}
                                                    />
                                                    {formErrors.title && (
                                                        <span className="error">{formErrors.title}</span>
                                                    )}
                                                </Grid>

                                            </Grid>


                                            <Grid container className={classes.root} spacing={5}>
                                                <Grid item xs={12}>
                                                    <MUIRichTextEditor
                                                        label="Type something here..."
                                                        name="texteditor"
                                                        inlineToolbar={true}
                                                        editorState={editorState}
                                                        onChange={editorState => setEditorState(editorState)}

                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.root} spacing={3}>
                                                <Grid item xs={4} >
                                                    <Button type="submit" style={{ marginTop: "10px", float: 'left' }} variant="contained" color="primary">Save</Button>
                                                    <Button type="button" style={{ marginTop: "10px", float: 'left' }} onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }}>Cancel</Button>
                                                </Grid>

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

export default Latter;
