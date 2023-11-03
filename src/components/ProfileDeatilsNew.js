import React from 'react';
import { Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Container } from 'react-bootstrap';
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';

const modalityOptions = [
  { value: "reiki1", label: "Reiki1" },
  { value: "reiki2", label: "Reiki2" },
  { value: "reiki3", label: "Reiki3" },
  { value: "reiki4", label: "Reiki4" }
];

function ProfileDetailsNew() {
  const phoneregex = (/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);

  const [formData, setFormData] = useState({
    // image: "",
    firstname: " ",
    lastname: " ",
    mobilenumber: "",
    emailid: "",
    modality: [null],
    experience: " ",
    bookingtype: "",
    language: [null]
  });

  // Formik initial values and validation schema
  const initialFormValues = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    mobilenumber: formData.mobilenumber,
    modality: formData.modality,
    experience: formData.experience,
    bookingtype: formData.bookingtype,
    language: formData.language
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    mobilenumber: Yup.string()
      .matches(/^\d{10}$/, 'Mobile Number must be 10 digits')
      .required('Mobile Number is required'),
    experience: Yup.string().required('Total Year Of Experience is required'),
    bookingtype: Yup.string().required('Type of Booking is required'),
    language: Yup.array()
      .min(1, 'Select at least one language')
      .required('Select Language is required'),
    modality: Yup.array()
      .min(1, 'Select at least one modality')
      .required('Select Modality is required'),
  });

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const LoggedInUserEmail = localStorage.getItem('LoggedInUserEmail');

    if (LoggedInUserEmail) {
      setFormData((prevData) => ({
        ...prevData,
        emailid: LoggedInUserEmail
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (values) => {
    // Save or process the form data
    console.log(values);
  };

  return (
    <Container>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    type="text"
                    name="firstname"
                    placeholder='Enter Your First Name'
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.firstname && errors.firstname}
                  />
                  {touched.firstname && errors.firstname && (
                    <div className="text-danger">{errors.firstname}</div>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    type="text"
                    name="lastname"
                    placeholder='Enter Your Last Name'
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lastname && errors.lastname}
                  />
                  {touched.lastname && errors.lastname && (
                    <div className="text-danger">{errors.lastname}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl
                  type="number"
                  name="mobilenumber"
                  placeholder='Enter Your Ten Digit Mobile Number'
                  value={values.mobilenumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.mobilenumber && errors.mobilenumber}
                />
                {touched.mobilenumber && errors.mobilenumber && (
                  <div className="text-danger">{errors.mobilenumber}</div>
                )}
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="emailid"
                  value={values.emailid}
                  disabled
                />
              </FormGroup>
            </Row>
            <br />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>

      {/* Continue to apply Formik for other form sections */}
    </Container>
  );
}

export default ProfileDetailsNew;
