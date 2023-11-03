import React, {useState}from 'react'
import { Formik } from 'formik'
import { Container, Form, Button,Alert ,Col,Row} from 'react-bootstrap'
import * as Yup from 'yup';                 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function SignupFormValidation() {

    const[showPassword,setShowPassword] =useState(false);
    const phoneregex = (/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)
    const[signUpMessage,setSignUpMessage] =useState(false);

    const validationSchema = Yup.object().shape(
        {
            email: Yup.string().email('not the email format').required(),
            password: Yup.string().min(8, "password must have eight characters").max(10, 'password cannot contain  more than 10 characters').required(),
            mobilenumber: Yup.string().required().test('is-digit', 'Must be a valid 10 digit number', (value) => {
      
                // Define your regular expression for validation
                const digitRegex =/^[0-9]{10}$/;
                // Test the value against the regular expression
                return digitRegex.test(value);
              }),
            dob: Yup.date().required(),
            maritalStatus: Yup.string().required(),
            gender: Yup.string().required(),
            // photo:Yup.mixed().required("upload file")


        },

    )

    const handleSignup = (values) => {
        console.log(values);
        const currentDataArray = JSON.parse(localStorage.getItem('signupData')) || [];

        currentDataArray.push(values);

        localStorage.setItem("signupData", JSON.stringify(currentDataArray));
        //For the succesfull signUp Alert message

        setSignUpMessage(true);
        // alert( 'you have succesfully signed up!')
        console.log("its is above toast")
        toast.success("you have successfully signed up!",{
           
        })
        console.log("its is below the toast")

       
    }

     const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword);
    }
    return (
        <>
    
            <Container className="square bg-light rounded">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        mobilenumbernumber: '',
                        dob: '',
                        maritalStatus: '',
                        gender: '',
                    }}
                    validationSchema={validationSchema}
                    // onSubmit={(values) => {
                    //     handleSignup(values);
                    //     // console.log("Hello World")

                    //   }}

                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        await new Promise((r) => setTimeout(r, 800));
                        // alert(JSON.stringify(values, null, 2));
                        handleSignup(JSON.stringify(values, null, 2))
                        // console.log("it is executing till here")
                        resetForm()
                        // console.log("it is executing the reset also")
                    }}
                >
                    {
                        ({ values, errors, handleChange, handleSubmit, handleBlur, setFieldValue, resetForm }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                <Form.Group >
                                    <Form.Label>EMAIL ADDRESS<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder='Enter Your Valid EmailId'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email ? "error" : null}
                                        required />
                                    {errors.email ? (
                                        <div className={"error-message text-danger"}>{errors.email}</div>
                                    ) : null}
                                </Form.Group>
                               </Col>
                               <Col md={6}>
                                <Form.Group>
                                    <Form.Label>PASSWORD<span className='text-danger'>*</span></Form.Label>
                                    <div className="input-group">
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder='Enter Your Password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.password ? "error" : null}
                                        required
                                    /><div className='input-group-append'>
                                        <Button 
                                        type='button'
                                        variant="outline-secondary"
                                        onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                   
                                </div>
                                {errors.password ? (
                                        <div className={"error-message text-danger"}>{errors.password}</div>
                                    ) : null}
                                </Form.Group>
                                </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                <Form.Group>
                                    <Form.Label>MOBILE NUMBER<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="mobilenumber"
                                        placeholder='Enter Your Ten Digit Mobilenumber Number '
                                        value={values.mobilenumber}
                                        onChange={handleChange}
                                        className={errors.mobilenumber ? "error" : null}
                                        required />
                                    {errors.mobilenumber ? (
                                        <div className={"error-message text-danger"}>{errors.mobilenumber}</div>
                                    ) : null}
                                </Form.Group>
                                </Col>
                                <Col md={6}>
                                    
                                <Form.Group>
                                    <Form.Label>DATE OF BIRTH<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={values.dob}
                                        placeholder='pick the date'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.dob ? "error" : null}
                                        required />
                                    {errors.dob ? (
                                        <div className={"error-message text-danger"}>{errors.dob}</div>
                                    ) : null}
                                </Form.Group>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>
                                <Form.Group>
                                    <Form.Label>MARITAL STATUS<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="maritalStatus"
                                        value={values.maritalStatus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.maritalStatus ? "error" : null}
                                        required>

                                        <option value="">Select Your Marital Status From Dropdown</option>
                                        <option value="Single">Single</option>
                                        <option value="married">Married</option>
                                    </Form.Control>
                                    {errors.maritalStatus ? (
                                        <div className={"error-message text-danger"}>{errors.maritalStatus}</div>
                                    ) : null}
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group>
                                    <Form.Label>GENDER<span className='text-danger'>*</span></Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Female"
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={values.gender === 'Female'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Check
                                            inline
                                            label="Male"
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={values.gender === 'Male'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Check
                                            inline
                                            label="Others"
                                            type="radio"
                                            name="gender"
                                            value="Others"
                                            checked={values.gender === 'Others'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.gender ? (
                                            <div className={"error-message text-danger"}>{errors.gender}</div>
                                        ) : null}
                                    </div>
                                </Form.Group>
                                </Col>
                                </Row>
                                {/* <Form.Group controlId='formFile'>
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file"
             value={values.photo}
             className={errors.photo? "error" : null}
             onChange={handleChange}
            required
            />
              {errors.photo ? (
                        <div className={"error-message text-danger"}>{errors.photo}</div>
                    ) : null}
        </Form.Group> */}
                                <br />
                                <Button type='submit'>SignUp</Button>
                                
                            </Form>
                        )
                    }
                </Formik>
                {/* {signUpMessage && <Alert variant="success">
                    you have succesfully signed up!
                    </Alert>} */}
            </Container>
          
        </>
    )
}

export default SignupFormValidation