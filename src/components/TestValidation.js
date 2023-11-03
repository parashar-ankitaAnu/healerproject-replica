import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import country from './Country.json';

function TestValidation() {
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

  
  const [businessFormData, setBusinessFormData] = useState(initialFormData);

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space"),
    businessAddress: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space"),
    // country: 
    // //   label: Yup.string().required("*Country name is required"),
    //    Yup.object().required("*Country name is required"),
    country: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    state: Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
    // state: Yup.object().required("*state name is required"),
    townName: Yup.string().required(),
    zipcode: Yup.number()
      .typeError('Zip Code must be a number')
      .required('Zip Code is required')
      .positive('Zip Code must be a positive number')
      .integer('Zip Code must be an integer'),
    landmark: Yup.string().required(),
    location: Yup.string().required(),
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(businessFormData);


    setBusinessFormData(initialFormData);

  };

  return (
    <Formik
      initialValues={businessFormData}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        console.log(values);
        console.log(businessFormData)
        setSubmitting(false);
        resetForm()
      }}
    >
      {({handleSubmit,handleChange, values, errors ,resetForm}) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  name="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                />
                {errors.businessName && <div className="error text-danger">{errors.businessName}</div>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Business Address</Form.Label>
                <Form.Control
                  type="text"
                  name="businessAddress"
                  value={values.businessAddress}
                  onChange={handleChange}
                />
                {errors.businessAddress && <div className="error text-danger">{errors.businessAddress}</div>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Select
                  options={countryOptions}
                  value={businessFormData.country}
                  name="country"
                  onChange={(selectedOption) =>
                    setBusinessFormData({
                      ...businessFormData,
                      country: selectedOption
                    })
                  }
                //   onChange={handleChange}
                //   onChange={(selectedOption) => setBusinessFormData({ ...businessFormData, country: selectedOption })}
                // onChange={(selectedOption) => {
                //     handleChange({ target: { name: 'country', value: selectedOption } });
                //   }}
                />
                {errors.country && <div className="error text-danger">{errors.country.label}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Select
              options={stateOptions}
              value={businessFormData.state}
              name="state"
              onChange={(selectedOption) =>
                setBusinessFormData({
                  ...businessFormData,
                  state: selectedOption
                })
              }
            //   onChange={handleChange}
            // //   onChange={(selectedOption) =>
            //     setBusinessFormData({ ...businessFormData, state: selectedOption })
            //   }
            // // onChange={(selectedOption) => {
            //     handleChange({ target: { name: 'state', value: selectedOption } });
            //   }}
            />
            {errors.state && <div className="error text-danger">{errors.state.label}</div>}
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Label>Town/City</Form.Label>
            <Select
              options={cityOptions}
              value={businessFormData.townName}
              name="townName"
              onChange={(selectedOption) =>
                setBusinessFormData({
                  ...businessFormData,
                  townName: selectedOption
                })
               
              }
              // onChange={handleChange}
            //   onChange={(selectedOption) =>
            //     setBusinessFormData({ ...businessFormData, townName: selectedOption })
            //   }
            // onChange={(selectedOption) => {
            //     handleChange({ target: { name: 'townName', value: selectedOption } });
            //   }}
            />
             {errors.townName && <div className="error text-danger">{errors.townName.label}</div>}
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              name="zipcode"
              value={values.zipcode}
              onChange={handleChange}
            />
             {errors.zipcode && <div className="error text-danger">{errors.zipcode}</div>}
          </Form.Group>
        </Col>
        <Form.Group>
          <Form.Label>Landmark</Form.Label>
          <Form.Control
            type="text"
            name="landmark"
            value={values.landmark}
            onChange={handleChange}
          />
          {errors.landmark && <div className="error text-danger">{errors.landmark}</div>}
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Label>Location Url</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={values.location}
          onChange={handleChange}
        />
        {errors.location && <div className="error text-danger">{errors.location}</div>}
      </Form.Group>
          <br/>
          <Button type="submit" >Save</Button>
        </Form>
      )}
    </Formik>
  );
}

export default TestValidation;

