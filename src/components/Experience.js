import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Table,
  Container
} from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import year from "./Year.json";
import Select from "react-select";
import SideBar from "./SideBar";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import * as Yup from 'yup'; 

function Experience() {
  const initialFormData = {
   certification:'',
   organizationname:'',
   year:''
  };

  
  const [experienceFormData, setExperienceFormData] = useState(initialFormData);
  
  const validationSchema = Yup.object().shape({
   certification: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(20),
    organizationname: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(30),
    year: Yup.object().required()
  });



  useEffect(() => {
    const storedData = localStorage.getItem("experienceFormData");
    if (storedData) {
      setExperienceFormData(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "experienceFormData",
      JSON.stringify(experienceFormData)
    );
  }, [experienceFormData]);

  // const [fieldoneError,setFieldoneError] =useState("");
  // const [organizationNameError,setOrganizationNameError]=useState("");
    //  const [fieldErrors,setFieldErrors] =useState({
    //   fieldone:' ',
    //   organizationname: ' '
    //  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //validation code

    // if(name==="fieldone"){
    //   if(value.trim()===""){
    //     setFieldErrors({...fieldErrors,fieldone:"*certification name is required field"});
    //   }
    //   else(
    //     setFieldErrors({...fieldErrors,fieldone:""})
    //   )
    // };
    // if(name==="organizationname"){
    //   if(value.trim()===""){
    //     setFieldErrors({...fieldErrors,organizationname:"*organization name is required field"});
    //   }
    //   else(
    //     setFieldErrors({...fieldErrors,organizationname:""})
    //   )
    // }

    //Validation Code ends here
    setExperienceFormData({
        ...experienceFormData,
      [name]: value,
    });
  };

  const [selectedYear, setSelectedYear] = useState([]);
  const handleChangeSelectedYear = (selectedYear) => {
    const yearValue = selectedYear.value;
    setExperienceFormData({
      ...experienceFormData,
      year: yearValue,
    });
    setSelectedYear(selectedYear);
  };

  const [experienceFormDataList, setExperienceFormDataList] = useState([]);
  const handleSubmit = (event) => {
    // event.preventDefault();
    //code for validation
    // if (experienceFormData.fieldone.trim() === "") {
    //   // setFieldErrors("this is required certification field");
    //   return; 
    // };
    // if (experienceFormData.organizationname.trim() === "") {
    //   // setFieldErrors("this is required organization field");
    //   return; 
    // }
    // setFieldoneError("");
    // setOrganizationNameError("");
//code for validtion ends here

    setExperienceFormDataList([...experienceFormDataList, experienceFormData]);
    // setExperienceFormData({
    //     // certificationtitle: " ",
    //     fieldone:' ',
    //   organizationname: ' ',
    //   year: null,
    // });
    // setSelectedYear([]);
    console.log(experienceFormData);
    // console.log(experienceFormData.certificationtitle);
    // console.log(experienceFormData.year);
    toast.success('Data updated succesfully!',{
      position:toast.POSITION.BOTTOM_RIGHT
    })
  };
  return (
    <>
    
      <Formik
      initialValues={{
        certification:'',
        organizationname:'',
        year:''
      }}
      validationSchema={validationSchema}
      onSubmit={((values,{resetForm})=>{
         console.log(values)
        console.log(experienceFormData)
        console.log(experienceFormDataList)
        handleSubmit(values)
         resetForm()
         
      }

      )}
      >
        {({handleSubmit,handleChange,setFieldValue,errors,values})=>(
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col>
            <FormGroup md={4}>
              <FormLabel>Certification Name<span className='text-danger'>*</span></FormLabel>
              <FormControl
                type="text"
                name="fieldone"
                value={values.fieldone}
                onChange={(e)=>{handleChange(e);
                  handleInputChange(e)}}
              />
                {errors.certification && <div className="error text-danger">{errors.certification}</div>}
            </FormGroup>
           
          </Col>
        
          <Col>
            <FormGroup md={4}>
              <FormLabel>Organization Name<span className='text-danger'>*</span></FormLabel>
              <FormControl
                type="text"
                name="organizationname"
                value={values.organizationname}
                onChange={(e)=>{handleChange(e);
                  handleInputChange(e)}}
              />
                {errors.organizationname && <div className="error text-danger">{errors.organizationname}</div>}
            </FormGroup>
            
          </Col>
          <Col md={4}>
            <FormGroup>
              <FormLabel>Year<span className='text-danger'>*</span></FormLabel>
              <Select
                options={year.yearIndex}
                value={values.year}
                onChange={(item)=>{setFieldValue("year",item);setExperienceFormData({ ...experienceFormData, year: item })}}
              />
                {errors.year && <div className="error text-danger">{errors.year}</div>}
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={3}>
            <Button type="submit" >
              Add
            </Button>
          </Col>
        </Row>
        {/* <ToastContainer/> */}
      </Form>
)}
      </Formik>
      <br/>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Index</th>
            <th>Certification Title</th>
            <th>Organization Name</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>
          {experienceFormDataList.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.fieldone}</td>
              <td>{p.organizationname}</td>
              <td>{p.year.label}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </>
  );
}

export default Experience;
