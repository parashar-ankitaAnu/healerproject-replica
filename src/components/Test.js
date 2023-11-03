import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { Formik } from 'formik'
import * as Yup from 'yup'; 

import country from './Country.json'; 

function BusinessDetails() {
  const initialFormData = {
    businessName: '',
    businessAddress: '',
    country: null,
    state: null,
    townName: '',
    zipcode: '',
    landmark: '',
    location: '',
  };
  // const [businessFormData, setBusinessFormData] = useState({
  //   businessName: '',
  //   businessAddress: '',
  //   country: null,
  //   state: null, 
  //   townName: '',
  //   zipcode: '',
  //   landmark: '',
  //   location: '',
  // });

  const [businessFormData, setBusinessFormData] = useState(initialFormData);


//   const validationSchema = Yup.object().shape(
//     {
//         businessName: Yup.string().required('*Business Name is required'),
//       businessAddress:  Yup.string().required('*Business Address is required'),
//         country:  Yup.string().required("*Country name is required"),
//        state:  Yup.string().required("*state is required"),
//        townName:  Yup.string().required("*town name is required"),
//        zipcode: Yup.number()
//        .typeError('Zip Code must be a number')
//        .positive('Zip Code must be a positive number')
//        .integer('Zip Code must be an integer'),
//      landmark: Yup.string(),
//      location: Yup.string(),


//     },

// )



  useEffect(() => {
    const storedData = localStorage.getItem('businessFormData');
    if (storedData) {
        setBusinessFormData(JSON.parse(storedData));

    }
}, []);

useEffect(() => {
    localStorage.setItem('businessFormData', JSON.stringify(businessFormData));

}, [businessFormData]

);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    // Initialize the country options from the JSON data
    const options = country.countryList.map((country) => ({
      value: country.value,
      label: country.label,
    }));
    setCountryOptions(options);
  }, []);

  useEffect(() => {
    // Update the state options when the selected country changes
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
      // Reset state options when the country is not selected
      setStateOptions([]);
    }
  }, [businessFormData.country]);

  useEffect(() => {
    // Update the city options when the selected state changes
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
      // Reset city options when the state is not selected
      setCityOptions([]);
    }
  }, [businessFormData.state, businessFormData.country]);


  //code for validation

  const[fieldErrors,setFieldErrors] = useState({
    businessName: '',
    // businessAddress: '',
    // country: null,
    // state: null,
    // townName: '',
    // zipcode: '',
    // landmark: '',
    // location: '',

  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //code for validation
    if(name==="businessName"){
      if(value.trim()===""){
        setFieldErrors({...fieldErrors,businessName:"*certification name is required field"});
      }
      else(
        setFieldErrors({...fieldErrors,businessName:""})
      )
    };
    



    setBusinessFormData({
      ...businessFormData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(businessFormData);
    if (businessFormData.businessName.trim() === "") {
      // setFieldErrors("this is required certification field");
      return; 
    };
    setBusinessFormData(initialFormData)
  };

  return (
    // <Formik
    // initialValues={businessFormData}
    // validationSchema={validationSchema}
    // onSubmit={(values, { setSubmitting }) => {
    //   console.log(values);
    //   setSubmitting(false);
  
  // }}
  // >
   <Form>
      <Row>
        <Col md={4}>
          <FormGroup>
            <FormLabel>Business Name</FormLabel>
            <FormControl
              type="text"
              name="businessName"
              value={businessFormData.businessName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <div className="error text-danger">{fieldErrors.businessName}</div>
        </Col>
        <Col md={4}>
          <FormGroup>
            <FormLabel>Business Address</FormLabel>
            <FormControl
              type="text"
              name="businessAddress"
              value={businessFormData.businessAddress}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <FormLabel>Country</FormLabel>
            <Select
              options={countryOptions}
              value={businessFormData.country}
              onChange={(selectedOption) =>
                setBusinessFormData({ ...businessFormData, country: selectedOption })
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <FormLabel>State</FormLabel>
            <Select
              options={stateOptions}
              value={businessFormData.state}
              onChange={(selectedOption) =>
                setBusinessFormData({ ...businessFormData, state: selectedOption })
              }
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>Town/City</FormLabel>
            <Select
              options={cityOptions}
              value={businessFormData.townName}
              onChange={(selectedOption) =>
                setBusinessFormData({ ...businessFormData, townName: selectedOption })
              }
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <FormLabel>Zip Code</FormLabel>
            <FormControl
              type="number"
              name="zipcode"
              value={businessFormData.zipcode}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <FormGroup>
          <FormLabel>Landmark</FormLabel>
          <FormControl
            type="text"
            name="landmark"
            value={businessFormData.landmark}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>
      <FormGroup>
        <FormLabel>Location Url</FormLabel>
        <FormControl
          type="text"
          name="location"
          value={businessFormData.location}
          onChange={handleInputChange}
        />
      </FormGroup>
      <br/>
      <Button type="submit" onClick={handleSubmit}>
        Save
      </Button>
    </Form>
    // </Formik>
  );
}

export default BusinessDetails;