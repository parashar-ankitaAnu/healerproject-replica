import React from 'react';
import SideBar from './SideBar';
import { Col,Row,Container } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
// import NavBarInner from './NavBarInner';

const BankingDetails = () => {
    
    return (
        <Container>
            <Row>
        <Col md={2}>
        <SideBar/>
        </Col>
        <Col md={10}>
            this is banking details page
            </Col>
            </Row>
        </Container>
    );
}

export default BankingDetails;
