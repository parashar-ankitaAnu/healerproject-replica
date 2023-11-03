import React ,{useState,useEffect} from 'react'
import {  Form,FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { Row, Col, Button ,Table} from "react-bootstrap";
import Select from 'react-select';
import duration from './Duration.json'
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup'; 

const statusOption =[
    {value:'active' ,label:'Active'},
    {value:'in-active' ,label:'In Active'}
]

const bookingTypeOption =[
    {value:'inperson' ,label:'In Person'},
    {value:'online' ,label:'On Line'}
]

function Appointment() {
  const initialFormData = {
        servicename:' ',
        duration:'',
        price: ' ', 
        status:'',
        typeofbooking:'',
        description:' ',
   }
    const [appointmentData,setAppointmentData] =useState({
        initialFormData  

    })
    const validationSchema = Yup.object().shape({
      servicename:Yup.string().required().matches(/^[a-zA-Z ]*$/, "service name can only have alphabets and space").max(20),
      duration:Yup.object().required(),
      price:Yup.string().matches(
        /^-?\d+(?:\.\d+)?$/,
        "Only digits with single decimal point are allowed."
      ).required(),
      bookingstatus:Yup.object().required(),
      typeofbooking:Yup.object().required(),
      description:Yup.string().test(
        "word-count",
        "Description should not exceed 20 words.",
        (value) => {
          if (value) {
            const wordCount = value.split(/\s+/).length;
            return wordCount <= 20;
          }
          return true;
        }
      ).required()
     });
 
   useEffect(()=>{
    const storedData =localStorage.getItem('appointmentData');
    if (storedData){
        setAppointmentData(JSON.parse(storedData));
    }
   },[]);
    
   useEffect(()=>{
    localStorage.setItem('appointmentData',JSON.stringify(appointmentData))
   },[appointmentData]);

  //  const [fieldErrors,setFieldErrors] =useState({
  //   servicename:' ',
  //   price: ' '
  
  //  })

   const handleInputChange=(e)=>{
    const{name,value} = e.target;

    //validation code

    // if(name==="servicename"){
    //     if(value.trim()===""){
    //       setFieldErrors({...fieldErrors,servicename:"*service name is required field"});
    //     }
    //     else(
    //       setFieldErrors({...fieldErrors,servicename:""})
    //     )
    //   };
    //   if(name==="price"){
    //     if(value.trim()===""){
    //       setFieldErrors({...fieldErrors,price:"*price is required field"});
    //     }
    //     else(
    //       setFieldErrors({...fieldErrors,price:""})
    //     )
    //   }
    // //   if(name==="organizationname"){
    //     if(value.trim()===""){
    //       setFieldErrors({...fieldErrors,organizationname:"*organization name is required field"});
    //     }
    //     else(
    //       setFieldErrors({...fieldErrors,organizationname:""})
    //     )
    //   }
  
      //Validation Code ends here

    setAppointmentData({
        ...appointmentData,
        [name]: value,
    });

   };
 const [selectedDuration,setSelectedDuration] = useState([]);
 const handleChangeSelectedDuration=(selectedDuration)=>{
    setAppointmentData({
    ...appointmentData,
    duration: selectedDuration.value, 
  });
    // // const durationvalue= selectedDuration.map((options)=>options.value);
    // const durationvalue= selectedDuration.value;
    // setSelectedDuration({
    //     ...appointmentData,duration:durationvalue
    // })
setSelectedDuration(selectedDuration);
// console.log(selectedDuration);
 }
 const [selectedStatus,setSelectedStatus] = useState([]);
 const handleChangeSelectedStatus=(selectedStatus)=>{
    setAppointmentData({
        ...appointmentData,
        status: selectedStatus.value, 
      });
    // const statusvalue= selectedStatus.value;
    // setSelectedStatus({
    //     ...appointmentData,status:statusvalue
    // })
setSelectedStatus(selectedStatus)
 }
 const [selectedType,setSelectedType] = useState([]);
 const handleChangeSelectedType=(selectedType)=>{
    setAppointmentData({
        ...appointmentData,
        typeofbooking: selectedType.value,
      });
    // const typeValue= selectedType.value;
    // setSelectedType({
    //     ...appointmentData,status:typeValue
    // })
setSelectedType(selectedType)
// console.log(selectedDuration)
 }
 const [list,setList] =useState([]);
 const handleSubmit =(event)=>{
    // event.preventDefault();
     //code for validation
    //  if (appointmentData.servicename.trim() === "") {
    //     // setFieldErrors("this is required certification field");
    //     return; 
    //   };
    //   if (appointmentData.price.trim() === "") {
    //     // setFieldErrors("this is required organization field");
    //     return; 
    //   }

    setList([...list,{...appointmentData}]);
//     setAppointmentData({
//        servicename:' ',
// //    duration: ' ',
//    duration: null,
//    price: ' ',
// //    status: ' ',
// status:null,
// //    typeofbooking: ' ',
// typeofbooking:null,
//    description:' ', 
//     })
//     setSelectedDuration(null);
//     setSelectedStatus(null);
//     setSelectedType(null);
//     // console.log(selectedDuration.value)
//     // console.log(selectedStatus.value)
//     // console.log(selectedType.value)
    console.log(appointmentData)
    toast.success('Data updated succesfully!',{
      position:toast.POSITION.BOTTOM_RIGHT
    })
}

  return (
 <>
 <Formik
     initialValues={{
       servicename:'',
        duration:'',
        price: '', 
        bookingstatus:'',
        typeofbooking:'',
        description:'',
    }}
    validationSchema={validationSchema}
    onSubmit={(value,{resetForm})=>{
      console.log(value)
      handleSubmit(value)
      resetForm()
   
    }}>
      {({handleChange,handleSubmit,setFieldValue,values,errors})=>(
 <Form onSubmit={handleSubmit}>
    <Row>
        <Col md={3}>
        <FormGroup>
            <FormLabel>Service Name<span className='text-danger'>*</span></FormLabel>
            <FormControl
            type='text'
            name='servicename'
            value={values.servicename}
            onChange={(e)=>{handleChange(e);handleInputChange(e)}}
            />
        </FormGroup>
        {errors.servicename && <div className="error text-danger">{errors.servicename}</div>}
        </Col>
        <Col md={2}>
        <FormGroup>
            <FormLabel>Duration<span className='text-danger'>*</span></FormLabel>
            <Select
            options={duration}
            onChange={(item)=>{setFieldValue("duration",item);setAppointmentData({ ...appointmentData, duration:item})}}
            value={values.duration}
            />
             {errors.duration && <div className="error text-danger">{errors.duration}</div>}
        </FormGroup>
        </Col>
        <Col md={2}>
        <FormGroup>
            <FormLabel>Price<span className='text-danger'>*</span></FormLabel>
            <FormControl
            type='text'
            name='price'
            value={values.price}
            onChange={(e)=>{handleChange(e);handleInputChange(e)}}
            />
        </FormGroup>
        {errors.price && <div className="error text-danger">{errors.price}</div>}
        </Col>
        <Col md={2}>
        <FormGroup>
            <FormLabel>Status<span className='text-danger'>*</span></FormLabel>
            <Select
            options={statusOption}
            value={values.bookingstatus}
            onChange={(item)=>{setFieldValue("bookingstatus",item);setAppointmentData({ ...appointmentData, bookingstatus: item})}}
         
            
            />
              {errors.bookingstatus && <div className="error text-danger">{errors.bookingstatus}</div>}
        </FormGroup>
        </Col>
        <Col md={3}>
        <FormGroup>
            <FormLabel>Type of Booking<span className='text-danger'>*</span></FormLabel>
            <Select
            options={bookingTypeOption}
            value={values.typeofbooking}
            onChange={(item)=>{setFieldValue("typeofbooking",item);setAppointmentData({ ...appointmentData, typeofbooking: item})}}
            
            />
              {errors.typeofbooking && <div className="error text-danger">{errors.typeofbooking}</div>}
        </FormGroup>
        </Col>
    </Row>
    <Row>
        <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl
            name='description'
             as="textarea" rows={2}
             value={values.description}
             onChange={handleChange}
            />
             {errors.description && <div className="error text-danger">{errors.description}</div>}
        </FormGroup>
    </Row>
    <br/>
    <Row>
        <Col md={3}>
            <Button type='submit'>Add</Button>
        </Col>
    </Row>
   
 </Form>
      )}
 </Formik>
 <br/>
 <Table striped bordered hover variant="dark">
    
        <thead>
            <tr>
            <th>Index</th>
            <th>Service Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Status</th>
            <th>Type of Booking</th>
            </tr>
        </thead>
  
  
        <tbody>
            {list.map((p,index)=>(
                <tr key={index}>
                <td>{index+1}</td>
            <td>{p.servicename}</td>
            <td>{p.duration.label}</td>
            <td>{p.price}</td>
            <td>{p.bookingstatus.label}</td>
            <td>{p.typeofbooking.label}</td>
            </tr>
            ))}
        </tbody>
    

 </Table>
 </>
  )
}

export default Appointment