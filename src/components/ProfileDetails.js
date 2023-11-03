import React from 'react';
import {  Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect ,Container} from 'react-bootstrap'
import { Row, Col, Button } from "react-bootstrap"
import { useState, useEffect } from 'react'; 
import Select from 'react-select'
// import language from './Language.json'
import { Formik } from 'formik';
import * as Yup from 'yup'; 
import {toast } from 'react-toastify';




    const modalityOptions =[
        {value:"reiki1",label:"Reiki1"},
        {value:"reiki2",label:"Reiki2"},
        {value:"reiki3",label:"Reiki3"},
        {value:"reiki4",label:"Reiki4"}
    ]
 
    const languageOptions =[
        {value:"hindi",label:"Hindi"},
        {value:"english",label:"English"},
        {value:"spanish",label:"Spanish"},
        {value:"french",label:"French"},
        {value:"tamil",label:"Tamil"},
        {value:"kannad",label:"Kannad"},
        {value:"telgu",label:"Telgu"}
    ]   




function ProfileDetails() {
    const phoneregex = (/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)
//for form one
const validationSchemaOne = Yup.object().shape({
    firstname: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(20),
    lastname: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(20),
    // mobilenumber: Yup.string().matches(/^[0-9]{10}$/, '*Mobile number must a Numreic Value and contain 10 digits  ').required('*Mobile number is required').test(
    //     "isDigit", // type of the validator (should be unique)
    //     "mobile number must be a digit", // error message
    //     (value) => /^\d+$/.test(value)
    //   ),
      mobilenumber: Yup.string().required().test('is-digit', 'Must be a valid 10 digit number', (value) => {
      
        // Define your regular expression for validation
        const digitRegex =/^[0-9]{10}$/;
        // Test the value against the regular expression
        return digitRegex.test(value);
      })
  
});

const validationSchemaTwo = Yup.object().shape({
    modality: Yup.array()
    .min(1, 'Please select at least one modality')
    .required(),
});
const validationSchemaThree = Yup.object().shape({
  experience: Yup.number().min(1,"experience must be greater or equal to one year").required(),
  typeofbooking: Yup.string().required()
});
const validationSchemaFour = Yup.object().shape({
   language: Yup.array()
    .min(1, 'Please select at least one language')
    .required(),
});
    const [formDataOne, setFormDataOne] = useState({
        // image: "",
        firstname: "",
        lastname: "",
        mobilenumber: ""
      
    });
    //for form two
    const [formDataTwo, setFormDataTwo] = useState({
        modality:[null],
       
        
    });

    //for form three
    const [formDataThree, setFormDataThree] = useState({
      
        experience:" ",
        bookingtype:" ",
        
    });
    //for form four
  
     const [formDataFour, setFormDataFour] = useState({
      
        language:[null],
        
    });
    //****** */ to get data from the session storage to populate the email field

    // useEffect(()=>{
    //     const LoggedInUserEmail = localStorage.getItem('LoggedInUserEmail');

    //     if(LoggedInUserEmail){
    //         setFormData((prevData)=>({
    //             ...prevData, emailid: LoggedInUserEmail
    //         }))
    //     }
    // },[])

    

    useEffect(() => {
        const storedData = localStorage.getItem('formDataOne');
        if (storedData) {
            setFormDataOne(JSON.parse(storedData));

        }
    }, []);

    useEffect(()=>{
        const LoggedInUserEmail = localStorage.getItem('LoggedInUserEmail');

        if(LoggedInUserEmail){
            setFormDataOne((prevData)=>({
                ...prevData, emailid: LoggedInUserEmail
            }))
        }
    },[])

    useEffect(()=>{
        const LoggedInUserEmail = localStorage.getItem('LoggedInUserEmail');

        if(LoggedInUserEmail){
            setFormDataOne((prevData)=>({
                ...prevData, emailid: LoggedInUserEmail
            }))
        }
    },[])
     //****** */ to get data from the session storage to populate the email field
//for form one
    useEffect(() => {
        localStorage.setItem('formDataOne', JSON.stringify(formDataOne));

    }, [formDataOne]

    );
//for form two
    useEffect(() => {
        localStorage.setItem('formDataTwo', JSON.stringify(formDataTwo));

    }, [formDataTwo]

    );
    //for form three
    
    useEffect(() => {
        localStorage.setItem('formDataThree', JSON.stringify(formDataThree));

    }, [formDataThree]

    );
    //for form four
    
    useEffect(() => {
        localStorage.setItem('formDataFour', JSON.stringify(formDataFour));

    }, [formDataFour]

    );

    const handleInputChangeOne = (event) => {
        const { name, value } = event.target;
        setFormDataOne(
            {
                ...formDataOne,
                [name]: value,
            }
         
        );

    };

    //for form two
    const handleInputChangeTwo = (event) => {
        const { name, value } = event.target;
        setFormDataTwo(
            {
                ...formDataTwo,
                [name]: value,
            }

        );

    };
    //for form three
    const handleInputChangeThree = (event) => {
        const { name, value } = event.target;
        setFormDataThree(
            {
                ...formDataThree,
                [name]: value,
            }

        );

    };
    //form data four
      //for form three
      const handleInputChangeFour = (event) => {
        const { name, value } = event.target;
        setFormDataFour(
            {
                ...formDataFour,
                [name]: value,
            }

        );

    };
    const handleSubmitOne = (event,values) => {
        event.preventDefault();
        // localStorage.setItem('formDataOne',JSON.stringify(formDataOne));
        // console.log(formDataOne)
      console.log("HandleSubmitOne is Working",values)
      toast.success("personal details updated")
     

    }

    //For form two
    const handleSubmitTwo = (event) => {
        event.preventDefault();
        console.log(formDataTwo)

    }
    //For form three
    const handleSubmitThree = (event) => {
        event.preventDefault();
        console.log(formDataThree)

    }
    //For form Four
    const handleSubmitFour = (event) => {
        event.preventDefault();
        console.log(formDataFour)

    }
const [selectedOptions,setSelectedOptions] = useState([]);

const handleChangeSelectedOption =(selectedOptions)=>{
    const modalityValue =selectedOptions.map((option)=>option.value);
    setFormDataTwo({
        ...formDataTwo,
        modality:modalityValue
    });
    setSelectedOptions(selectedOptions);

};
const [selectedLanguage,setSelectedLanguage] = useState([]);

const handleChangeSelectedLanguage =(selectedLanguage)=>{
    const languageValue =selectedLanguage.map((option)=>option.value);
    setFormDataFour({
        ...formDataFour,
        language:languageValue
    });
    setSelectedLanguage(selectedLanguage);

};

// const showSuccessToastONE =(message)=>{
//     toast.success(message,{
        
//     })
// }
// const showSuccessToastTWO =(message)=>{
//     toast.success(message,{
        
//     })
// }
// const showSuccessToastTHREE =(message)=>{
//     toast.success(message,{
        
//     })
// }
// const showSuccessToastFOUR =(message)=>{
//     toast.success(message,{
        
//     })
// }

    // const handleMultiSelectChange = (e) => {
    //     const selectedOption = Array.from(e.target.selectedOption, (option) => option.value);
    //     setFormData({
    //       ...formData,
    //       modality: selectedOption,
    //     });
    //   };
    return (
        <div>
            <Formik
            initialValues={{
                firstname: "",
                lastname: "",
                mobilenumber: "",
                emailid: "",
            }}

            validationSchema={validationSchemaOne}

            // onSubmit={async (values, {setSubmitting, resetForm}) => {
            //     await new Promise((r) => setTimeout(r, 500));
            //     // alert(JSON.stringify(values, null, 2));
            //     handleSubmitOne(JSON.stringify(values, null, 2))
            //     // localStorage.setItem('formDataOne', JSON.stringify(values));
            //     resetForm()
            // }}
        
            // onSubmit={async (values, {  resetForm }) => {
            //     try{
            //     await new Promise((r) => setTimeout(r, 500));
            //    console.log("form submit is working",values)
            //     // Save the form data to local storage
                
            //      handleSubmitOne(values);
               
            //     // Reset the form
            //     resetForm();
            // }
            // catch(error){
            //     console.log("Error:" ,error)
            // }

            //   }}
            onSubmit={(values) => {
                
                // console.log(values)
                // resetForm();
                // console.log("onSubmit is working")
                // setTimeout(()=>{toast.success("Personal Details Updated Succesfull!",{
                //     // position:toast.POSITION.TOP_RIGHT
                
                // },1)
                    
                // })
              toast.success("Personal Details Updated Successfully!",{
                position:toast.POSITION.BOTTOM_RIGHT,
               
              });
                console.log("form one submitted",values)
          
          }}
        
        // onSubmit={handleSubmitOne}
            >
            {({handleSubmit,errors,values,handleBlur,handleChange,handleSubmitOne})=>(
            <Form onSubmit={(e)=>{handleSubmit(e);}}>
                {/* {console.log("it is running")} */}
                {/* {console.log(values,"values")} */}
                {/* {console.log(formDataOne)}  */}
                {/* {console.log("it is executing")} */}
                <Row>
                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file"
                            value={formData.image}
                            onChange={(e)=>{
                                const file =e.target.files[0];
                                setFormData({
                                    ...formData,
                                    image: file,
                                })
                            }}
                        />
                    </Form.Group> */}
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>First Name<span className='text-danger'>*</span></FormLabel>
                            <FormControl
                                type="text"
                                name="firstname"
                                placeholder='Enter Your First Name'
                                value={values.firstname}
                                // onChange={handleInputChangeOne}
                                onBlur={handleBlur}
                                onChange={(e)=>{handleChange(e);
                                handleInputChangeOne(e)}}
                                className={errors.firstname ? "error" : null}

                            />
  {errors.firstname ?(<div className="error text-danger">{errors.firstname}</div>):null}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Last Name<span className='text-danger'>*</span></FormLabel>
                            <FormControl
                                type="text"
                                name="lastname"
                                placeholder='Enter Your Last Name'
                                value={values.lastname}
                                // onChange={handleInputChangeOne}
                                onBlur={handleBlur}
                                onChange={(e)=>{handleChange(e);
                                    handleInputChangeOne(e)}}
                                    className={errors.lastname ? "error" : null}
                            />
{errors.lastname ? (<div className="error text-danger">{errors.lastname}</div>):null}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <FormGroup>
                        <FormLabel>Mobile Number<span className='text-danger'>*</span></FormLabel>
                        <FormControl
                            type="tel"
                            name="mobilenumber"
                            placeholder='Enter Your Ten Digit Mobile Number'
                            value={values.mobilenumber}
                            onBlur={handleBlur}
                            // onChange={handleInputChangeOne}
                            onChange={(e)=>{handleChange(e);
                                handleInputChangeOne(e)}}
                                className={errors.mobilenumber ? "error" : null}
                        />
{errors.mobilenumber ?( <div className="error text-danger">{errors.mobilenumber}</div>):null}
                    </FormGroup>
                    </Row>
                    <Row>
                    <FormGroup>
                        <FormLabel>Email<span className='text-danger'>*</span></FormLabel>
                        <FormControl
                            type="email"
                            name="emailid"
                            
                            value={formDataOne.emailid}
                            onChange={handleInputChangeOne}
                            disabled
                        />

                    </FormGroup>
                    </Row>
                    <br />
                   
                    <Button type="submit" id='button1'> Save</Button>
                    {/* <ToastContainer/> */}
                    
                
            </Form>
            
            )}
            </Formik>
            <br/>
            <Formik 

            initialValues={{
                modality:[],
            }}

            validationSchema={validationSchemaTwo}

            onSubmit={(values)=>{
                console.log("it is executing form two")
                console.log(values.modality)
                console.log(formDataTwo)
                // resetForm()
              toast.success("Modality Updated Successfully!",{
                position:toast.POSITION.BOTTOM_RIGHT,
              });
            }}
            >

             

                {({errors,handleSubmit,values,handleChange,handleBlur,setFieldValue})=>(
            <Form onSubmit={handleSubmit}>
                {/* <FormGroup>
                    <FormLabel>Select Modality</FormLabel>
                    <FormControl
                        as="select"
                        multiple
                        name="selectmodality"
                       value={formDataTwo.modality}
                       onChange={handleInputChangeTwo}
                       className={errors.modality ? "error" : null}
                       required
                    >
                       
                    <option value="">Select From Dropdown</option>
                    <option value="Reiki">Reiki</option>
                    <option value="Theta">Theta</option>
                    <option value="Healing">Healings</option>
                    </FormControl>
                    {errors.modality ? (
                                        <div className={"error-message text-danger"}>{errors.modality}</div>
                                    ) : null}
                </FormGroup> */}
                <h5>Select Modality<span className='text-danger'>*</span></h5>
                <Select
                name="modality"
                placeholder="Select Modality From The Given Options"
                options={modalityOptions}
                // value={selectedOptions}
                // onBlur={handleBlur}
                className={errors.modality ? "error" : null}
                // onChange={(e)=>{handleChange(e);
                //     handleChangeSelectedOption(e)}}
                // onChange={(e)=>{handleInputChangeTwo(e);handleChangeSelectedOption(e)}}
                // onChange={handleChangeSelectedOption}
                value={modalityOptions.filter(option => values.modality.includes(option.value))}
                onChange={(selectedOptions) => {
                    const modalityValue = selectedOptions.map((option) => option.value);
                    setFieldValue('modality', modalityValue); 
                  }}
                // onChange={(selectedOptions) => setFieldValue('modalityuserselected', selectedOptions.map(option => option.value))}
                isMulti
               
                />
                 {errors.modality? (
                                        <div className={"error-message text-danger"}>{errors.modality}</div>
                                    ) : null}
            <br/>
                <Button type='submit' id='button2'>Save</Button>
            </Form>
    )}
            </Formik>
            <br/>
            <Formik
            initialValues={{
                experience:'',
                typeofbooking:''
            }}
            validationSchema={validationSchemaThree}
            onSubmit={(values)=>{
                // handleSubmitThree()
                console.log(values)
                // resetForm();
                //  toast.success("Year and Booking type Updated Succesfull!",{
                //     position:toast.POSITION.BOTTOM_RIGHT,
                //     toastId:"success3"
                // })
                toast.success("Experience and Booking Type Updated Succesfully",{
                    position:toast.POSITION.BOTTOM_RIGHT,
                });

            }}
            >
                {({handleSubmit,errors,values,handleChange,setFieldValue})=>(
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                        <h5>Total Year Of Experience<span className='text-danger'>*</span></h5>
                        <FormControl
                            type="number"
                            name="experience"
                            placeholder='Enter year of experience in digits'
                            className={errors.experience ? "error" : null}
                            value={values.experience}
                            onChange={(e)=>{handleChange(e);handleInputChangeThree(e)}}

                        />
           {errors.experience ?( <div className="error text-danger">{errors.experience}</div>):null}
                    </FormGroup>
                    <br/>
                    <Form.Group>
                        <h5>Type of Booking<span className='text-danger'>*</span></h5>
                        <div>
                        <FormCheck
                        inline
                        label="Online"
                        type="radio"
                        name="bookingtype"
                        value="Online"
                        // values={values.typeofbooking}
                        checked={values.bookingtype === 'Online'}
                        // onChange={handleInputChangeThree}
                        // onChange={(e) => {handleChange(e);
                        //     const value = e.target.value;
                        //     setFieldValue('typeofbooking', value); 
                        //   }}
                        onChange={(e)=>{handleChange(e);
                        setFieldValue('typeofbooking', e.target.checked ? 'Online' : '');
                    handleInputChangeThree(e)}}
                        />
                        <FormCheck
                        inline
                        label="Inperson"
                        type="radio"
                        name="bookingtype"
                        value="Inperson"
                        checked={values.bookingtype === 'Inperson'}
                        // onChange={handleInputChangeThree}
                        // onChange={(e) => {handleChange(e);
                        //     const value = e.target.value;
                        //     setFieldValue('typeofbooking', value); 
                        //   }}
                        onChange={(e)=>{handleChange(e);
                            setFieldValue('typeofbooking', e.target.checked ? 'Inperson' : '');
                        handleInputChangeThree(e)}}
                        />
                        <FormCheck
                        inline
                        label="Both"
                        type="radio"
                        name="bookingtype"
                        value="Both"
                        checked={values.bookingtype === 'Both'}
                        // onChange={handleInputChangeThree}
                        // onChange={(e) => {handleChange(e);
                        //     const value = e.target.value;
                        //     setFieldValue('typeofbooking', value); 
                        //   }}
                        onChange={(e)=>{handleChange(e);
                            setFieldValue('typeofbooking', e.target.checked ? 'Both' : '');
                        handleInputChangeThree(e)}}
                        />
                         {errors.typeofbooking ?( <div className="error text-danger">{errors.typeofbooking}</div>):null}
                        </div>
                        {/* <FormCheck
                        inline
                        label="Both"
                        type="checkbox"
                        name="bookingtype"
                        value="Both"
                        checked={formDataThree.bookingtype === 'Both'}
                        onChange={handleInputChangeThree}/> */}
                    </Form.Group>
                    <br/>
                    <Button type='submit'id='button3'>Save</Button>
            </Form>
            )}
            </Formik>
            <br/>
      
                 <Formik 

initialValues={{
    language:[],
}}

validationSchema={validationSchemaFour}

onSubmit={(values)=>{
    console.log("it is executing form two")
    console.log(values.language)
    console.log(formDataFour)
    // resetForm()
    toast.success("language Updated Succesfull!",{
        position:toast.POSITION.BOTTOM_RIGHT,
        toastId:"success4"
    })
}}
>

 

    {({errors,handleSubmit,values,handleChange,handleBlur,setFieldValue})=>(
<Form onSubmit={handleSubmit}>
   
    <h5>Select Language<span className='text-danger'>*</span></h5>
    <Select
    name="language"
    placeholder="Select language From The Given Options"
    options={languageOptions}
    // value={selectedOptions}
    // onBlur={handleBlur}
    className={errors.language ? "error" : null}
    // onChange={(e)=>{handleChange(e);
    //     handleChangeSelectedOption(e)}}
    // onChange={(e)=>{handleInputChangeTwo(e);handleChangeSelectedOption(e)}}
    // onChange={handleChangeSelectedOption}
    value={languageOptions.filter(option => values.language.includes(option.value))}
    onChange={(arrow) => {
        const languageValue = arrow.map((option) => option.value);
        setFieldValue('language', languageValue); 
      }}
    // onChange={(selectedOptions) => setFieldValue('modalityuserselected', selectedOptions.map(option => option.value))}
    isMulti
   
    />
     {errors.language? (
                            <div className={"error-message text-danger"}>{errors.language}</div>
                        ) : null}
<br/>
    <Button type='submit'id='button4'>Save</Button>
</Form>
)}
</Formik>
        </div>
    );
}

export default ProfileDetails;
