import React, { Component } from 'react';

import "../../style/main.scss"
import ReactDOM from 'react-dom'
import Profile from './profile';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usernameInput: "",
            passwordInput: "",
            notification: ""
        }

        this.log_in = this.log_in.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    log_in() {
        this.setState({
            notification: ""
        })
    
        if (this.state.usernameInput.indexOf('@') == -1) {
            //Username Verification
            fetch('https://mafia-api-zzs.herokuapp.com/user/verification', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    username: this.state.usernameInput,
                    password: this.state.passwordInput
                })
    
            })
            .then(response => response.json())
            .then(data => {
    
                if (data === "User Verified") {
                    this.props.handleSuccessfulLogin();
                    this.props.history.push('/profile')             
                }
                else {
                    this.setState({
                        notification: "Incorrect Username/Password. Try again"
                    })
                    this.props.handleUnsuccessfulLogin();
                    console.log("Incorrect Login")
                }
            })
            .catch(error => console.log(error))

        }
        else {
            // Email Verification
            fetch('https://mafia-api-zzs.herokuapp.com/user/verification', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: this.state.usernameInput,
                    password: this.state.passwordInput
                })
    
            })
            .then(response => response.json())
            .then(data => {
                if (data === "User Verified") {
                    console.log("Success!")
                    this.props.handleSuccessfulLogin();
                    this.props.history.push('/profile')

                }
                else {
                    this.setState({
                        notification: "Incorrect Email/Password. Try again"
                    })
                    console.log("Incorrect Login")
                    this.props.handleUnsuccessfulLogin();
                }
            })
            .catch(error => console.log(error))
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    

    render() {
        return (
            <div className="page-wrapper">
                <div className="login-wrapper">
                    <div className="login-components">


                        <p className="notification">{this.state.notification}</p>
                        <input type="text" 
                        placeholder="Username or Email"
                        name="usernameInput"
                        value={this.state.usernameInput} 
                        onChange={this.handleChange}
                        id="username" />

                        <input type="password"
                        placeholder="Password"
                        name="passwordInput" 
                        value={this.state.passwordInput}
                        onChange={this.handleChange}
                        id="password" />

                        
                        <a onClick={this.log_in}
                        className="submit-btn"
                        >Submit</a>
                    </div>

                </div>
            </div>
        )
    }
}