import React from 'react'
import '../styles/components/inputform.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';

function InputForm() {
    const initialValues = {
        firstName: "",
        age: 0,
        Origin: "",
        Destination: "",
        travelDate: "",
        NoOfGuests: 0,
        PhoneNo: "",
        EmailAddress: ""
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        age: Yup.number().required(),
        Origin: Yup.string().required(),
        Destination: Yup.string().required(),
        travelDate: Yup.string().required(),
        NoOfGuests: Yup.number().required(),
        PhoneNo: Yup.number().required().min(10),
        EmailAddress: Yup.string().required()
    })
    const onSubmit = (data) => {
        console.log(data);
        axios.post("https://innerve7-server.vercel.app/users", data).then((Response) => {
            console.log("it worked")
            alert("submitted")
        });
    }
    return (
        <div className='input-form'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>FirstName: </label>
                    <ErrorMessage name="firstName" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="firstName"
                        placeholder="(Ex. firstName...)"
                    />
                    <label>Age: </label>
                    <ErrorMessage name="age" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="age"
                        placeholder="(Ex. age...)"
                    />
                    <label>Origin : </label>
                    <ErrorMessage name="Origin" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="Origin"
                        placeholder="(Ex. starting point...)"
                    />
                    <label>Destination : </label>
                    <ErrorMessage name="Destination" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="Destination"
                        placeholder="(Ex. End point...)"
                    />
                    <label>TravelDate: </label>
                    <ErrorMessage name="travelDate" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="travelDate"
                        placeholder="(Ex. travelDate...)"
                    />
                    <label>No Of Guests: </label>
                    <ErrorMessage name="NoOfGuests" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="NoOfGuests"
                        placeholder="(Ex. NoOfGuests...)"
                    />
                    <label>Phone No: </label>
                    <ErrorMessage name="PhoneNo" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="PhoneNo"
                        placeholder="(Ex. PhoneNo...)"
                    />
                    <label>Email Address: </label>
                    <ErrorMessage name="EmailAddress" component="span2" />
                    <Field
                        id="inputCreatePost"
                        name="EmailAddress"
                        placeholder="(Ex. ajaysingh1234@gmail....)"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default InputForm