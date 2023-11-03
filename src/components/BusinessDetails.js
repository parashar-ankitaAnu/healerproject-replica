import React, { useState,useEffect } from 'react'
import {  Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap'
import { Row, Col, Button } from "react-bootstrap"
import Select from 'react-select'
import country from './Country.json'
function BusinessDetails() {

    const [businessFormData,setBusinessFormData] =useState({
        businessName:" ",
        businessAddress:" ",
        country:[null],
        state:[null],
        townName:[null],
        zipcode:" ",
        landmark:" ",
        location:" "
    });

    const handleInputChange =(event)=>{
        const {name,value} = event.target;
        setBusinessFormData(
            {
                ...businessFormData,
                [name]: value,
            }
        )

    };
    useEffect(()=>{
        const storedDataTab2 =localStorage.getItem('businessFormData');
        if (storedDataTab2){
            setBusinessFormData(JSON.parse(storedDataTab2))
        }
    },[]);
    useEffect(() => {
        localStorage.setItem('businessFormData', JSON.stringify(businessFormData));

    }, [businessFormData]

    );
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(businessFormData)

    };
    const [selectedCountry,setSelectedCountry] = useState(null);

const handleChangeSelectedCountry =(selectedCountry)=>{
    const countryValue =selectedCountry.value;
    setBusinessFormData({
        ...businessFormData,
        country:countryValue
    });
    setSelectedCountry(selectedCountry);

};
// console.log(country);

const [selectedState,setSelectedState] = useState([]);
   const handleChangeSelectedState =(selectedState)=>{
    const stateValue =selectedState.value;
    setBusinessFormData({
        ...businessFormData,
        state:stateValue
    })
    setSelectedState(selectedState)
   }
   const [selectedCity,setSelectedCity] = useState([]);
   const handleChangeSelectedCity =(selectedCity)=>{
    const cityValue =selectedCity.value;
    setBusinessFormData({
        ...businessFormData,
       townname:cityValue
    })
    setSelectedCity(selectedCity)
   }
//    console.log(country)
//    console.log(selectedCountry)
  return (
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
                options={country.countryList}
                value={selectedCountry}
                onChange={handleChangeSelectedCountry}
                
               
                />
    </FormGroup>
    </Col>
    </Row>
    <Row>
        <Col md={4}>
    <FormGroup>
        <FormLabel>State</FormLabel>
           
        <Select
                options={country.countryList}
                value={selectedState}
                onChange={handleChangeSelectedState}
                
               
                />
    </FormGroup>
    </Col>
    <Col md={5}>
    <FormGroup>
        <FormLabel>Town/City</FormLabel>
           
        <Select
                options={country.countryList}
                value={selectedCity}
                onChange={handleChangeSelectedCity}
                
               
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
        <FormLabel>LandMark</FormLabel>
           
       <FormControl
       type="text"
       name="landmark"
       value={businessFormData.landmark}
       onChange={handleInputChange}
       />
    </FormGroup>
    </Row>
    <FormGroup>
        <FormLabel>Localtion Url</FormLabel>
           
       <FormControl
        type="text"
        name="location"
        value={businessFormData.location}
        onChange={handleInputChange}
       
       
       />
    </FormGroup>
    <br/>
    
<Button type='submit' onClick={handleSubmit}>save</Button>
    
   </Form>
  )
}

export default BusinessDetails