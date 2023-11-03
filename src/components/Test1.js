import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Row, Col, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import year from './Year.json';
import language from './Language.json';

const degreeOptions = [
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Masters' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'others', label: 'Others' },
];

function Test1() {
  const [educationFormData, setEducationFormData] = useState({
    degree: null,
    degreename: '',
    universityname: '',
    year: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('educationFormData');
    if (storedData) {
      setEducationFormData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationFormData({
      ...educationFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem('educationFormData', JSON.stringify(educationFormData));
  }, [educationFormData]);

  const [educationFormDataList,setEducationFormDataList] =useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    setEducationFormDataList([...educationFormDataList,educationFormData]);
    setEducationFormData({
        degree: null,
        degreename: '',
        universityname: '',
        year:null,
      });
    console.log(educationFormData);
  };

  return (
    <>
      <Form>
        <Row>
          <Col md={3}>
            <FormGroup>
              <FormLabel>Degree</FormLabel>
              <Select
                options={degreeOptions}
                value={educationFormData.degree}
                onChange={(selectedOption) => {
                  setEducationFormData({
                    ...educationFormData,
                    degree: selectedOption,
                  });
                }}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormLabel>Degree Name</FormLabel>
              <FormControl
                type="text"
                name="degreename"
                value={educationFormData.degreename}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormLabel>University Name</FormLabel>
              <FormControl
                type="text"
                name="universityname"
                value={educationFormData.universityname}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormLabel>Year Of Passing</FormLabel>
              <Select
                options={year.yearIndex}
                value={educationFormData.year}
                onChange={(selectedOption) => {
                  setEducationFormData({
                    ...educationFormData,
                    year: selectedOption,
                  });
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Button type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Degree</th>
            <th>Degree Name</th>
            <th>University Name</th>
            <th>Year of Passing</th>
          </tr>
        </thead>
        <tbody>
         {educationFormDataList.map((education,index)=>(
            <tr key={index}>
            <td>{education.degree ? education.degree.label : ''}</td>
            <td>{education.degreename}</td>
            <td>{education.universityname}</td>
            <td>{education.year ? education.year.label : ''}</td>
        </tr>
))}
        </tbody>
      </Table>
    </>
  );
}

export default Test1;
