import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mobile: '',
    dob: '',
    maritalStatus: '',
    gender: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = () => {
    
    localStorage.setItem('signupData', JSON.stringify(formData));
    alert('Signedup successful!');
    console.log(formData)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignup}>
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
          <div className="input-group">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="input-group-append">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile Number:</Form.Label>
          <Form.Control
            type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Marital Status:</Form.Label>
          <Form.Control
            as="select"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>

          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender:</Form.Label>
          <div>
            <Form.Check
              inline
              label="Male"
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Others"
              type="radio"
              name="gender"
              value="Others"
              checked={formData.gender === 'Others'}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose Profile Photo</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button type="button" onClick={handleSignup}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
