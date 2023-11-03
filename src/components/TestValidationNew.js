import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import country from './Country.json';
import {  toast } from 'react-toastify';


function TestValidationNew() {
  const initialFormData = {
    businessName: '',
    businessAddress: '',
    country: {},
    state: {},
    townName: '',
    zipcode: '',
    landmark: '',
    location: '',
  };

  
  const [businessFormData, setBusinessFormData] = useState(initialFormData);
  // console.log(businessFormData);

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required().matches(/^[a-zA-Z ]*$/, "service name can only have alphabets and space"),
    businessAddress: Yup.string().required().matches(/^[a-zA-Z ]*$/, "service name can only have alphabets and space"),
    // country: 
    // //   label: Yup.string().required("*Country name is required"),
    //    Yup.object().required("*Country name is required"),
    country:  Yup.object().required(),
    state:  Yup.object().required(),
    // state: Yup.object().required("*state name is required"),
    townName:  Yup.object().required(),
    zipcode: Yup.string().required().min(5).max(7).test(
      "isDigit", // type of the validator (should be unique)
      "Zip Code value must be a digit", // error message
      (value) => /^\d+$/.test(value)
    ),
   
    landmark: Yup.string().required("*landmark is required"),
    location: Yup.string().required("*location is required"),
  });

  useEffect(() => {
    const storedData = localStorage.getItem('businessFormData');
    if (storedData) {
      setBusinessFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('businessFormData', JSON.stringify(businessFormData));
  }, [businessFormData]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const options = country.countryList.map((country) => ({
      value: country.value,
      label: country.label,
    }));
    setCountryOptions(options);
  }, []);

  useEffect(() => {
    if (businessFormData.country) {
      const selectedCountry = country.countryList.find(
        (country) => country.value === businessFormData.country.value
      );
      if (selectedCountry && selectedCountry.state) {
        const options = selectedCountry.state.map((state) => ({
          value: state.value,
          label: state.label,
        }));
        setStateOptions(options);
      }
    } else {
      setStateOptions([]);
    }
  }, [businessFormData.country]);

  useEffect(() => {
    if (businessFormData.state) {
      const selectedCountry = country.countryList.find(
        (country) => country.value === businessFormData.country.value
      );
      if (selectedCountry && selectedCountry.state) {
        const selectedState = selectedCountry.state.find(
          (state) => state.value === businessFormData.state.value
        );
        if (selectedState && selectedState.cities) {
          const options = selectedState.cities.map((city) => ({
            value: city.value,
            label: city.label,
          }));
          setCityOptions(options);
        }
      }
    } else {
      setCityOptions([]);
    }
  }, [businessFormData.state, businessFormData.country]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBusinessFormData({
      ...businessFormData,
      [name]: value,
    });
  };

  const handleBusinessAddress = (values) => {
//handleChange();
console.log(values,"fdfdfsdfdfd");
  }

  const handleSaveButton = (event) => {
    
  //  console.log(event)
    // event.preventDefault();

    // console.log(businessFormData);

    localStorage.setItem('businessFormData', JSON.stringify(initialFormData));


    setBusinessFormData({...initialFormData});
    toast.success('Data added succesfully!',{
      position:toast.POSITION.BOTTOM_RIGHT
    })

  };

  return (
    <Formik
    initialValues={{  
    businessName: '',
    businessAddress: '',
    country: '',
    state: '',
    townName: '',
    zipcode: '',
    landmark: '',
    location: '',
}}
      validationSchema={validationSchema}
      
      onSubmit={
    
        async(values, { setSubmitting,resetForm }) => {
        console.log('values',values);
        console.log(businessFormData)
        // debugger;
        await new Promise((r) => setTimeout(r, 500));
        handleSaveButton(JSON.stringify(values, null, 2))
        setSubmitting(false);
      // console.log(values);
      // toast.success('Data added succesfully!',{
      //   position:toast.POSITION.TOP_RIGHT
      // })
        // resetForm()
      
      }}
    >
      {({handleSubmit,handleChange, setFieldValue, values, errors }) => (
        <Form onSubmit={handleSubmit}>
            {/* {console.log(values,"values")}
            {console.log(businessFormData)} */}
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Business Name<span className='text-danger'>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="businessName"
                  value={values.businessName}
                  onChange={(e)=>{handleChange(e);
                  handleInputChange(e)}}
                />
                {errors.businessName && <div className="error text-danger">{errors.businessName}</div>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Business Address<span className='text-danger'>*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="businessAddress"
                  value={values.businessAddress}
                  onChange={(e)=>{handleChange(e);
                    handleInputChange(e)}}
                />
                {errors.businessAddress && <div className="error text-danger">{errors.businessAddress}</div>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Country<span className='text-danger'>*</span></Form.Label>
                <Select
                  options={countryOptions}
                  value={values.country}
                  name="country"
                  onChange={(item)=>{setFieldValue("country",item);setBusinessFormData({ ...businessFormData, country: item })}
                  }
                //   onChange={handleChange}
                //   onChange={(selectedOption) => setBusinessFormData({ ...businessFormData, country: selectedOption })}
                // onChange={(selectedOption) => {
                //     handleChange({ target: { name: 'country', value: selectedOption } });
                //   }}
                />
                {errors.country && <div className="error text-danger">{errors.country}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>State<span className='text-danger'>*</span></Form.Label>
            <Select
              options={stateOptions}
              value={values.state}
              name="state"
              // onChange={(selectedOption) =>
              //   setBusinessFormData({
              //     ...businessFormData,
              //     state: selectedOption
              //   })
              // }
              onChange={(item)=>{setFieldValue("state",item);setBusinessFormData({ ...businessFormData, state: item })}
            }
            //   onChange={handleChange}
            // //   onChange={(selectedOption) =>
            //     setBusinessFormData({ ...businessFormData, state: selectedOption })
            //   }
            // // onChange={(selectedOption) => {
            //     handleChange({ target: { name: 'state', value: selectedOption } });
            //   }}
            />
            {errors.state && <div className="error text-danger">{errors.state}</div>}
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Label>Town/City<span className='text-danger'>*</span></Form.Label>
            <Select
              options={cityOptions}
              value={businessFormData.townName}
              name="townName"
              // onChange={(selectedOption) =>
              //   setBusinessFormData({
              //     ...businessFormData,
              //     townName: selectedOption
              //   })
               
              // }
              onChange={(item)=>{setFieldValue("townName",item);setBusinessFormData({ ...businessFormData, townName: item })}
            }
              // onChange={handleChange}
            //   onChange={(selectedOption) =>
            //     setBusinessFormData({ ...businessFormData, townName: selectedOption })
            //   }
            // onChange={(selectedOption) => {
            //     handleChange({ target: { name: 'townName', value: selectedOption } });
            //   }}
            />
             {errors.townName && <div className="error text-danger">{errors.townName}</div>}
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Zip Code<span className='text-danger'>*</span></Form.Label>
            <Form.Control
              type="text"
              name="zipcode"
              value={values.zipcode}
              onChange={(e)=>{handleChange(e);
                handleInputChange(e)}}
            />
             {errors.zipcode && <div className="error text-danger">{errors.zipcode}</div>}
          </Form.Group>
        </Col>
        <Form.Group>
          <Form.Label>Landmark<span className='text-danger'>*</span></Form.Label>
          <Form.Control
            type="text"
            name="landmark"
            value={values.landmark}
            onChange={(e)=>{handleChange(e);
              handleInputChange(e)}}
          />
          {errors.landmark && <div className="error text-danger">{errors.landmark}</div>}
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Label>Location Url<span className='text-danger'>*</span></Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={values.location}
          onChange={(e)=>{handleChange(e);
            handleInputChange(e)}}
        />
        {errors.location && <div className="error text-danger">{errors.location}</div>}
      </Form.Group>
          <br/>
          <Button type="submit" >Save</Button>
          {/* <ToastContainer/> */}
        </Form>
      )}
    </Formik>
  );
}

export default TestValidationNew;

