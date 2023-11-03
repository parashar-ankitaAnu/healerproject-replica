import React from 'react'
import {Tabs,Tab} from 'react-bootstrap';
import DataStore from './DataStore';
import UserDataTable from './UserDataTable';
function FormatTab() {
    return (
      <div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <DataStore/>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <UserDataTable/>
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
        </Tabs>
        </div>
      );
    }
    


export default FormatTab