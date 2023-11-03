import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

function SideBar() {
  return (
    <>
    <Col md={3}>
       <nav className='sidebar'>
        <ul>
            <li>
               <Link to="/my-account">My Account</Link>
            </li>
            <li>
                <Link to="/time-page">Time Availability</Link>
            </li>
            <li>
                <Link to="/bank-details">Bank Details</Link>
            </li>
            <li>
                <Link to="/subscription-page">Subscription</Link>
            </li>
            <li>
                <Link to="/classes-page">Classes</Link>
            </li>
            <li>
                <Link to="/booking-page">Booking History</Link>
            </li>
        </ul>
       </nav>
       </Col>
    </>
  )
}

export default SideBar