import React ,{useState,useEffect}from 'react';
import {  Form,FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { Row, Col, Button ,Table} from "react-bootstrap";
import Select from 'react-select';
import year from './Year.json';
import language from './Language.json'
import SideBar from './SideBar';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup'; 



const degreeOptions =[
    {value:"bachelors",label:"Bachelors"},
    {value:"masters",label:"Masters"},
    {value:"diploma",label:"Diploma"},
    {value:"others",label:"Others"}

]



function EducationDetails() {
    const initialFormData = {
        degree:'',
        degreename:'',
        universityname:'',
        year:''
       }
       const [educationFormData,setEducationFormData] =useState({
        initialFormData
      });
       const validationSchema = Yup.object().shape({
        degree:Yup.object().required(),
        degreename: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(20),
        universityname: Yup.string().required().matches(/^[a-zA-Z ]*$/, "Field can only have alphabets and space").max(30),
         year:Yup.object().required()
       });
     
   
    useEffect(() => {
        const storedData = localStorage.getItem('educationFormData');
        if (storedData) {
            setEducationFormData(JSON.parse(storedData));

        }
    }, []);
    // const [fieldErrors,setFieldErrors] =useState({
    //     degreename:' ',
    //     universityname: ' '
    //    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        //validation code

    // if(name==="degreename"){
    //     if(value.trim()===""){
    //       setFieldErrors({...fieldErrors,degreename:"*degree name is required"});
    //     }
    //     else(
    //       setFieldErrors({...fieldErrors,degreename:""})
    //     )
    //   };
    //   if(name==="universityname"){
    //     if(value.trim()===""){
    //       setFieldErrors({...fieldErrors,universityname:"*university name is required"});
    //     }
    //     else(
    //       setFieldErrors({...fieldErrors,universityname:""})
    //     )
    //   }
  
      //Validation Code ends here
        setEducationFormData(
            {
                ...educationFormData,
                [name]: value,
            }

        );

    };

    useEffect(() => {
        localStorage.setItem('educationFormData', JSON.stringify(educationFormData));

    }, [educationFormData] //dependency array 

    );
   
    const [selectedDegree,setSelectedDegree] = useState([]);
    const handleChangeSelectedDegree =(selectedDegree)=>{
        // const degreeValue= selectedDegree.map((options)=>options.value);
        const degreeValue = selectedDegree.value;
        setEducationFormData({
            ...educationFormData, degree:degreeValue
        })
    setSelectedDegree(selectedDegree);
    }  ;  
    const [selectedYear,setSelectedYear] = useState([]);
    const handleChangeSelectedYear =(selectedYear)=>{
        // const yearData= selectedYear.map((options)=>options.value);
        const yearData = selectedYear.value;
        setEducationFormData({
            ...educationFormData, year:yearData,
           
        }
        )
    setSelectedYear(selectedYear);
    // console.log(selectedYear)
    // console.log(yearData)
    };  

    const [educationFormDataList,setEducationFormDataList] =useState([]);
 const handleSubmit =(e)=>{
    // e.preventDefault();
    // if (educationFormData.degreename.trim() === "") {
    //     // setFieldErrors("this is required certification field");
    //     return; 
    //   };
    //   if (educationFormData.universityname.trim() === "") {
    //     // setFieldErrors("this is required organization field");
    //     return; 
    //   }
     setEducationFormDataList([...educationFormDataList,educationFormData]);
    // setEducationFormData({
    //     degree: null,
    //     degreename: ' ',
    //     universityname: ' ',
    //     year: null,
    //   });
    //   setSelectedDegree([]);//set the dropdown value to default
    //   setSelectedYear([]);//same here " "
      console.log(educationFormData) 
      toast.success('Data updated succesfully!',{
        position:toast.POSITION.BOTTOM_RIGHT
      })
 }
//  console.log(year.yearIndex);
// console.log(selectedYear)

  return (
    <>
    <Formik
     initialValues={{
        degree:'',
        degreename:'',
        universityname:'',
        year:''
      }}
      validationSchema={validationSchema}
      onSubmit={(value,{resetForm})=>{
        console.log(value)
        resetForm()
        handleSubmit(value)
      }}
    >
        {({handleChange,handleSubmit,setFieldValue,values,errors})=>(
    <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={3}>
                <FormGroup>
             
                    <FormLabel>Degree<span className='text-danger'>*</span></FormLabel>
                  
                    <Select
                    options={degreeOptions}
                    value={values.degree}
                    onChange={(item)=>{setFieldValue("degree",item);setEducationFormData({ ...educationFormData, degree: item })}}
                    />
                     {errors.degree && <div className="error text-danger">{errors.degree}</div>}
                </FormGroup>
            </Col>
            <Col md={3}>
                <FormGroup>
                    <FormLabel>Degree Name<span className='text-danger'>*</span></FormLabel>
                    <FormControl
                    type="text"
                    name="degreename"
                    value={values.degreename}
                    onChange={(e)=>{handleChange(e);handleInputChange(e)}}
                    />
                    {errors.degreename && <div className="error text-danger">{errors.degreename}</div>}
                </FormGroup>
           
            </Col>
            <Col md={3}>
                <FormGroup>
                    <FormLabel>University Name<span className='text-danger'>*</span></FormLabel>
                    <FormControl
                    type="text"
                    name="universityname"
                    value={values.universityname}
                    onChange={(e)=>{handleChange(e);handleInputChange(e)}}
                    />
                    {errors.universityname && <div className="error text-danger">{errors.universityname}</div>}
                </FormGroup>
              
            </Col>
            <Col md={3}>
                
                   
                    <FormGroup>
                        <FormLabel>Year of Passing<span className='text-danger'>*</span></FormLabel>
                   
                    <Select
                    options={year.yearIndex}
                    value={values.year}
                    onChange={(item)=>{setFieldValue("year",item);setEducationFormData({ ...educationFormData, year: item })}}
                    />
                    {errors.year && <div className="error text-danger">{errors.year}</div>}
                </FormGroup>

            </Col>
        </Row>
        <br/>
        <Button type='submit'>Add</Button>
       
    </Form>
)}
    </Formik>
    <br/>
    <Table striped bordered hover size="dark">
        <thead>
            <tr>
                <th>Index</th>
                <th>Degree</th>
                <th>Degree Name</th>
                <th>University Name</th>
                <th>Year of Passing</th>
            </tr>
        </thead>
        <tbody>
            {educationFormDataList.map((education,index)=>(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{education.degree.label}</td>
                <td>{education.degreename}</td>
                <td>{education.universityname}</td>
                <td>{education.year.label}</td>
            </tr>
))}
        </tbody>
    </Table>
  
    </>
  )
}

export default EducationDetails