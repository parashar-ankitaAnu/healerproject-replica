import React from 'react';
import SideBar from './SideBar';
import { Row, Col, Button,Container } from "react-bootstrap"

const TimeAvailability = () => {
    return (
        <Container>
            <Row>
        <Col md={2}>
        <SideBar/>
        </Col>
        <Col md={10}>
            this is TimeAvailability page
        </Col>
        </Row>
        </Container>
    );
}

export default TimeAvailability;
