import React, { Component } from  'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <p>You are Logged In!</p>
                ) : (
                    <p>You are not Logged In!</p>
                )}
            </div>
        )
    }
}