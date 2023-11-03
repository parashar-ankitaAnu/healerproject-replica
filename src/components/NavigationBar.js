import React from 'react'
import { Link } from 'react-router-dom'

function NavigationBar() {
    return (
        <div>
            <nav>
                <ul>
                    {/* <li>
                        <Link to="/">Home</Link>

                    </li> */}
                   
                  
                    <li>
                        <Link to="/login-form-val">LOGIN</Link>

                    </li>
                    <li>
                        <Link to="/signup-form-val">SIGNUP</Link>

                    </li>
                    {/* <li>
                        <Link to="/data-store">DATASTORE</Link>

                    </li>
                    <li>
                        <Link to="/user-data-table">UserDataTable</Link>

                    </li>
                    <li>
                        <Link to="tabs">Tabs</Link>

                    </li> */}
                </ul>
            </nav>
        </div>

    )
}

export default NavigationBar