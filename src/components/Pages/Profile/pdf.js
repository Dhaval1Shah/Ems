import React, { Component } from 'react';
import AuthApi from '../../Services/Authapi';
import { jsPDF } from "jspdf";


class Pdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdfData : [],   
        }

        this.pdfGenrate = this.pdfGenrate.bind(this);
    }

    componentDidMount() {
        this.pdfGenrate();
    }

    pdfGenrate = async () => {
        const input = document.getElementById('datetime-local');
        console.log(input)


        let today = new Date(input.value);
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        console.log(month, year)
        const pdfGen = await AuthApi.getAllSalaryData(month, year);
        console.log(pdfGen.salarySlip)
        if (pdfGen && pdfGen.status === true) {

            this.setState({
                pdfData: pdfGen
            })
            console.log(this.state.pdfData)

            let doc = new jsPDF()
            const el = document.getElementById('content')
            console.log(el)
            if (typeof (el) === 'object' && el !== null) {
                const width = 170
                const elementHandlers = {
                    '#ignorePDF': (element, renderer) => {
                        return true
                    }
                }


                // doc.setFontSize(1);   
                doc.html(el, {
                    callback: function (doc) {

                        doc.save('sample.pdf');
                    },
                    x: 10,
                    y: 10
                });



            }

        }




    }



    render() {
        return (
            <div style={{visibility:'hidden', position:'absolute'}}>
                <div id="content">
                    <h1 className="ds" >Cherrypik Software Inc.</h1>


                </div>
            </div>
        )
    }
}

export default Pdf;

