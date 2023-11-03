import React from 'react'
import SideBar from './SideBar'
import {Row,Col,Container} from 'react-bootstrap'

function Classes() {
  return (
  <Container>
    <Row>
    <Col md={2}>
  <SideBar/> 
  </Col>
  <Col md={10}>
  <h1>this is classes papgge page page page pagepage</h1>
  </Col>
  </Row>
  </Container>
  )
}

export default Classes