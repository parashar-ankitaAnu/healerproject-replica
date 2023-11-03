import React, { useState, useEffect } from "react";
import { Form, FormControl, FormGroup, FormLabel, Table } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import duration from "./Duration.json";

const statusOption = [
  { value: "active", label: "Active" },
  { value: "in-active", label: "In Active" },
];

const bookingTypeOption = [
  { value: "inperson", label: "In Person" },
  { value: "online", label: "On Line" },
];

function Appointment() {
  const [appointmentFormData, setAppointmentFormData] = useState({
    servicename: " ",
    duration: null,
    price: " ",
    status: null,
    typeofbooking: null,
    description: " ",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("appointmentFormData");
    if (storedData) {
      setAppointmentFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify(appointmentFormData)
    );
  }, [appointmentFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAppointmentFormData({
      ...appointmentFormData,
      [name]: value,
    });
  };

  const [selectedDuration, setSelectedDuration] = useState(null);
  const handleChangeSelectedDuration = (selectedOption) => {
    setSelectedDuration(selectedOption);
    setAppointmentFormData({
      ...appointmentFormData,
      duration: selectedOption ? selectedOption.value : null,
    });
  };

  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleChangeSelectedStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setAppointmentFormData({
      ...appointmentFormData,
      status: selectedOption ? selectedOption.value : null,
    });
  };

  const [selectedType, setSelectedType] = useState(null);
  const handleChangeSelectedType = (selectedOption) => {
    setSelectedType(selectedOption);
    setAppointmentFormData({
      ...appointmentFormData,
      typeofbooking: selectedOption ? selectedOption.value : null,
    });
  };

  const [appointmentList, setAppointmentList] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();

    setAppointmentList([...appointmentList, { ...appointmentFormData }]);
    setAppointmentFormData({
      servicename: " ",
      duration: null,
      price: " ",
      status: null,
      typeofbooking: null,
      description: " ",
    });
    setSelectedDuration(null);
    setSelectedStatus(null);
    setSelectedType(null);
  };

  return (
    <>
      <Form>
        <Row>
          <Col md={3}>
            <FormGroup>
              <FormLabel>Service Name</FormLabel>
              <FormControl
                type="text"
                name="servicename"
                value={appointmentFormData.servicename}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <FormLabel>Duration</FormLabel>
              <Select
                options={duration}
                onChange={handleChangeSelectedDuration}
                value={selectedDuration}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                name="price"
                value={appointmentFormData.price}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <FormLabel>Status</FormLabel>
              <Select
                options={statusOption}
                onChange={handleChangeSelectedStatus}
                value={selectedStatus}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <FormLabel>Type of Booking</FormLabel>
              <Select
                options={bookingTypeOption}
                value={selectedType}
                onChange={handleChangeSelectedType}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" rows={2} />
          </FormGroup>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col md={3}>
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
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
          {appointmentList.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.servicename}</td>
              <td>{p.duration}</td>
              <td>{p.price}</td>
              <td>{p.status}</td>
              <td>{p.typeofbooking}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Appointment;
