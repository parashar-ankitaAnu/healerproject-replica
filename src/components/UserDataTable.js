import React from 'react'
import { Container,Table } from 'react-bootstrap';

function UserDataTable() {

    const storedData = JSON.parse(sessionStorage.getItem('formValues'));

    console.log(storedData)

    // let newData = null;
    let newData =[];
    
      if(storedData !== null && storedData !== undefined && typeof storedData ==='object'){
        newData =Object.values(storedData);
      }
      else{

      }
      // const newData =Object.values(storedData);
//console.log(storedData)
console.log(newData)
console.log(newData.length)
//console.log(newData[1])

  return (
    <Container>
       {newData !==undefined && newData !==null ?( 
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
            <th>Index</th>
          <th>Email</th>
          <th>Password</th>
          <th>Mobile</th>
          <th>Dob</th>
          <th>MaritalStatus</th>
          <th>Gender</th>
          
        </tr>
      </thead>
      <tbody>
      <tr>
              <td>1</td>
              {newData.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
    </Table>
    
       ):( <p>No form data found in session  storage.</p>)}

  </Container>
  )
        }

export default UserDataTable