import React from 'react'
import { useFormik } from 'formik'
import {Form,Button,Container} from 'react-bootstrap';

function LoginFormOne() {

    
        const formik = useFormik({
            initialValues:{
              email:'',
            },

            onSubmit: values=>{
               console.log(JSON.stringify(values));
            },
           
        },
     
        )
    
  return (
    <>
    <Container>
    <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
        <Form.Label htmlFor='email'>Email.Address</Form.Label>
        <Form.Control
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        />
        </Form.Group>
<Button type='submit'>Submit</Button>
    </Form>
    </Container>
    </>
  )
}

export default LoginFormOne