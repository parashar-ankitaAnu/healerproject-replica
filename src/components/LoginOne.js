import React from 'react';
import {Formik } from 'formik';
import { Container, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

function LoginOne() {
  // const validate = values=>{
  //   const errors ={};

  //   if(!values.email){
  //     errors.email= 'cant leave the field empty';
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email ="it is not proper format for email"

  //   }
  //   if(!values.password){
  //     errors.password= 'cant leave the field empty';
  //   }
  //   else if (!values.password.length===8){
  //     errors.password ="must have eight characters"

  //   }
  //   return errors;

  // }
  const validationSchema = Yup.object().shape(
    {
      email: Yup.string().email('Not the email format').required('Required'),
      password: Yup.string().min(6, 'not less than 6 words').max(11, 'not more than 11 words').required('Required'),
    }
  );

  const handleSubmit = (values) => {
    console.log(values)
  };

  return (

    

      <Container>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            ({ values, errors, handleBlur,handleChange,handleSubmit,isSubmitting }) => (
              <Form onSubmit={handleSubmit} >
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={errors.email ? "error" : null}
                    required
                  />
                  { errors.email ? (
                    <div className={"error-message text-danger"}>{errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : null}
                    required
                  />
                  { errors.password ? (
                    <div className={"error-message text-danger"} >{errors.password}</div>
                  ) : null}
                </Form.Group>
                <br/>
                <Button type="submit">Submit</Button>
              </Form>
            )
          }
        </Formik>
      </Container>

  )
}

export default LoginOne;