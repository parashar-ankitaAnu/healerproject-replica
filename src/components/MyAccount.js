import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import{Tabs,Tab, Container,Col,Row, TabContainer} from 'react-bootstrap'
import ProfileDetails from './ProfileDetails'
import BusinessDetails from './BusinessDetails'
import Test from './Test'
import EducationDetails from './EducationDetails'
// import Test1 from './Test1'
import Test1 from './Test1'
import Experience from './Experience'
import Appointment from './Appointment'
import AppointmentTest from './AppointmentTest'
import SideBar from './SideBar'
// import NavBarInner from './NavBarInner'
// import { useLocation } from 'react-router-dom'
import ProfileDetailsNew from './ProfileDeatilsNew'
import Testvalidation from './TestValidation'
import TestValidation from './TestValidation'
import TestValidationNew from './TestValidationNew'


function MyAccount() {
   
//   //to clear toast message when switching tabs
// console.log("it is toast on my account begin")
//   const toclearToastMessage =()=>{
//     setTimeout(()=>{ toast.dismiss()},
//     0)
//   // toast.dismiss()
//   }
//   console.log("it is end of toast my account")


  return (
   <Container>
    <Row>
      <Col md={2}>
   <SideBar/>
   </Col>
   <Col md={10}>

        <Tabs
          defaultActiveKey="profile Details"
          id="uncontrolled-tab-example"
          className="mb-3"
          // onSelect={toclearToastMessage}
        >
           <Tab eventKey="profile Details" title="Profile Details">
          <ProfileDetails />
          </Tab>
          <Tab eventKey="business Details" title="Business Details">
          <TestValidationNew/>
          </Tab>
          <Tab eventKey="education" title="Education">
            <EducationDetails/>
          </Tab>
          <Tab eventKey="experience" title="Experience">
          <Experience/>
          </Tab>
          <Tab eventKey="appointment" title="Appointment">
           <Appointment/>
          </Tab>
          {/* <Tab eventKey="test" title="Test">
           <AppointmentTest/>
          </Tab> */} 
           
          {/* <Tab eventKey="busuness" title="businesstest">
           <BusinessDetails/>
          </Tab> */}
        </Tabs>
      </Col>
   </Row>
   <ToastContainer/>
   </Container>
  )
}


export default MyAccount