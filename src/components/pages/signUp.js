import React, { Component } from 'react';

import "../../style/main.scss";


export default class SignUp extends Component {
    constructor(props) {
        super(props);



        this.state = {
            emailInput: "",
            usernameInput: "",
            displayNameInput: "",
            passwordInput: "",
            passwordConfirmationInput: "",
            emailNotif: "",
            usernameNotif: "",
            displayNameNotif: "",
            passwordNotif: "",
            redirectNotif: ""
        }

        this.sign_up = this.sign_up.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }




    sign_up() {
        this.setState({
            emailNotif: "",
            usernameNotif: "",
            displayNameNotif: "",
            passwordNotif: ""
        })
    
        if (this.state.emailInput.trim() == 0) {
            this.setState({
                emailNotif: "Email must be filled out"
            })
            return;
        }
    
        if (this.state.emailInput.indexOf('@') == -1) {
            this.setState({
                emailNotif: "You must put a valid email in"
            })
            return;
        }
    
        if (this.state.usernameInput.indexOf(' ') != -1) {
            this.setState({
                usernameNotif: "Username cannot have spaces"
            }) 
            return;
        }
    
        if (this.state.usernameInput.trim() == 0) {
            this.setState({
                usernameNotif: "Username must be filled out"
            }) 
            return;
        }
    
        if (this.state.displayNameInput.trim() == 0) {
            this.setState({
                displayNameNotif: "Display Name must be filled out"
            })
            return;
        }
    
    
        if (this.state.passwordInput.length == 0) {
            this.setState({
                passwordNotif: "Password must be filled out"
            })
            return;
        }
    
    
        if (this.state.passwordInput === this.state.passwordConfirmationInput) {
            console.log('password confirmed')
            fetch('http://127.0.0.1:5000/user/create', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.usernameInput.toLowerCase(),
                    displayName: this.state.displayNameInput,
                    email: this.state.emailInput,
                    password: this.state.passwordInput
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data === "Email is already used") {
                    this.setState({
                        emailNotif: "Email is already in use"
                    })
                }
                
                if (data === "Username is Taken") {
                    this.setState({
                        usernameNotif: "Username is already in use"
                    })
                }
    
                console.log(data)
    
                if (data === "Account created Successfully!") {
                    this.setState({
                        redirectNotif: "Account creation successful! Redirecting to Login..."
                    })
                    setTimeout(() => {
                        document.location.replace('http://127.0.0.1:3000/login')
                    }, 3000)
    
                }
            })
            .catch(error => console.log(error))
        }
        else {
            this.setState({
                passwordNotif: "Passwords don't match"
            })
        }
    }

    handleChange(event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>

                    <div className="input-wrapper">
                        <p className="notification">All fields are required</p>

                        <input type="email" 
                        placeholder="Email" 
                        name="emailInput" 
                        id="email"
                        value={this.state.emailInput}
                        onChange={this.handleChange}
                        />

                        <p className="email-notification notification">{this.state.emailNotif}</p>

                        <input type="text" 
                        placeholder="Pick a Username" 
                        name="usernameInput" 
                        id="username"
                        value={this.state.usernameInput}
                        onChange={this.handleChange}
                        />

                        <p className="username-notification notification">{this.state.usernameNotif}</p>

                        <input type="text" 
                        placeholder="Pick a Display Name" 
                        name="displayNameInput" 
                        id="displayName"
                        value={this.state.displayNameInput}
                        onChange={this.handleChange}
                        />

                        <p className="displayname-notification notification">{this.state.displayNameNotif}</p>

                        <input type="password" 
                        placeholder="Password" 
                        name="passwordInput"
                        id="password" 
                        value={this.state.passwordInput}
                        onChange={this.handleChange}
                        />

                        <p className="password-notification notification">{this.state.passwordNotif}</p>

                        <input type="password" 
                        placeholder="Confirm Password" 
                        name="passwordConfirmationInput" 
                        id="passwordConfirmation"
                        value={this.state.passwordConfirmationInput}
                        onChange={this.handleChange}
                        />

                        <button onClick={this.sign_up} className="submit-btn">Submit</button>

                        <p className="redirecting">{this.state.redirectNotif}</p>
                    </div>
            </div>
        )
    }
}