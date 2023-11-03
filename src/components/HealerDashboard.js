import React from 'react'
import SideBar from './SideBar'
import{Tabs,Tab, Container,Col,Row, TabContainer} from 'react-bootstrap'

function HealerDashboard() {
  return (
    <>
    <Container>
      <Row>
        <Col md={2}>
    <SideBar/>
    </Col>
    <Col md={2}>
    <h1>This is dashboard page 
    </h1>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default HealerDashboard