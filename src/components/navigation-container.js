import React from "react";
import { withRouter } from 'react-router'
import { NavLink } from "react-router-dom"

const NavigationComponent = (props) => {
    return (
        <div className="nav-wrapper">
            <div className="header">

                <NavLink to="/login">
                    Login
                </NavLink>

                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </div>
        </div>
    )
}

export default withRouter(NavigationComponent)