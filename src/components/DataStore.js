import React from 'react'
import { Container, Table } from 'react-bootstrap';

function DataStore() {
    const storedData = JSON.parse(sessionStorage.getItem('formValues'));


  
  return (
    <Container>
       {storedData ?( 
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
            <th>Index</th>
          <th>Dataasked</th>
          <th>UserData</th>
          
        </tr>
      </thead>
      <tbody>
        {Object.entries(storedData).map(([email,password,mobile,dob,maritalStatus,gender], index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{email}</td>
            <td>{password}</td>
            <td>{mobile}</td>
            <td>{dob}</td>
            <td>{maritalStatus}</td>
            <td>{gender}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    
       ):( <p>No form data found in session  storage.</p>)}

  </Container>
  )
        }

export default DataStore