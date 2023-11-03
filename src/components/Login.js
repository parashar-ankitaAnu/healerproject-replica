import React, { useState } from 'react';
import {Container,Button,Form} from 'react-bootstrap';
import * as Yup from 'yup';
import {Formik } from 'formik';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginMessage,setLoginMessage] =useState('');

  const handleLogin = () => {
    
    const storedSignUpData =JSON.parse(sessionStorage.getItem('signupData'));
 
    if (
      storedSignUpData &&
      storedSignUpData.email === formData.email &&
      storedSignUpData.password === formData.password
    ) {
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid credentials. Please try again.');
    }
   console.log(formData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  
 


  return (
    <Container>
      <h2>LOGIN</h2>
      <Form>
        
      <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br/>
        <div>
          <Button type="button" onClick={handleLogin}>
           Login
          </Button>
        </div>
        <div>{loginMessage}</div>
      </Form>
    </Container>
  );
}

export default Login;
