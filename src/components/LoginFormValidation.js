import React, { useState } from 'react'
import { Button, Container, Form,Row } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function LoginFormValidation() {
    const validationSchema = Yup.object().shape(
        {
            email: Yup.string().email('email must be in proper format').required(),
            password: Yup.string().min(6, 'not less than 6 words').max(11, 'not more than 11 words').required(),
        }
    );
   
    const [loginMessage, setLoginMessage] = useState(false);

    //store userData in stateVariable to pass it as prop for data population in profile details page
      
    const [userData,setUserData] =useState(null)


    //navigate to dashboard
    const navigate = useNavigate();
     const navigatetoSignUpPage =useNavigate()


    const handleLogin = (values) => {
        const storedSignUpData = JSON.parse(localStorage.getItem('signupData')) || [];
    
        // console.log('Stored Data:', storedSignUpData);
    
        // const matchData = storedSignUpData.find((user) => user.email === values.email);
         const matchData = storedSignUpData.find((userString)=>{
            const user =JSON.parse(userString);
            return user.email === values.email
            
        }
      
         )
    
        // console.log('Login Attempt:', values.email, values.password);
    
        if (matchData) {
            const userData = JSON.parse(matchData);
    
            //setUserData as userData to further data to pass it as a prop in profile details page
            // setUserData(userData);

        //******// storing it in the session storage to further use in npopulating the field
        
        localStorage.setItem("LoggedInUserEmail",userData.email)
        localStorage.setItem("LoggedInUsermobile",userData.mobilenumber)
      

        console.log(userData.email)
        console.log(userData.mobilenumber)
             
            console.log('Stored User Data:', userData);
    
            if (userData.password === values.password) {
                setLoginMessage(true)
                // Password matches
                // setLoginMessage('Login successful!');
                // alert('login is successfull')
                console.log('this is toast message in login page beigns')
              toast.success("Login Successfull!",{
                    // position:toast.POSITION.TOP_RIGHT
                })
                console.log('this is toast message in login page ends')
                //navigating to healer dashboard page
                setTimeout(()=>{navigate('/healer-dashboard-page')},
                8000
                );
                // navigate('/healer-dashboard-page')
                // Redirect the user or display a success message here
            } else {
                // Password does not match
                // setLoginMessage('Invalid password. Please try again.');
                toast.error('Invalid Password. Please try again.!',{
                    // position:toast.POSITION.BOTTOM_RIGHT
                })
            }
        } else {
            // No matching user with the provided email was found
            // setLoginMessage('User not found. Please sign up.');
             toast.info('Not the Registered User. Please SIGN UP first.',{
                    // position:toast.POSITION.BOTTOM_RIGHT
                })
            // alert('not the registered user please sign up')
            setTimeout(()=>{navigatetoSignUpPage('/signup-form-val')},
            8000
            );
            
            // navigatetoSignUpPage('/signup-form-val')
        }

      
    };
    
  
    return (



        <Container className="square bg-light rounded">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleLogin(values);
            
                  }}
            >
                {
                    ({ values, errors, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} >
                            <Row>
                            <Form.Group>
                                <Form.Label>EMAIL ADDRESS<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                 
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : null}
                                    required
                                />
                                {errors.email ? (
                                    <div className={"error-message text-danger"}>{errors.email}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>PASSWORD<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onBlur={handleBlur}
                                    value={values.password}
                                    
                                    onChange={handleChange}
                                    className={errors.password ? "error" : null}
                                    required
                                />
                                {errors.password ? (
                                    <div className={"error-message text-danger"} >{errors.password}</div>
                                ) : null}
                            </Form.Group>
                            </Row>
                            <br />
                            <Button type="submit" >Submit</Button>
                            {/* <div >{loginMessage}</div> */}
                            {/* <ToastContainer/> */}
                        </Form>
                    )
                }
            </Formik>
        </Container>

    )
}

export default LoginFormValidation