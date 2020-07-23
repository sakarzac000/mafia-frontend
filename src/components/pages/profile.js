import React, { Component } from  'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        if (this.props.login == null) {
            return (
                <div>
                    You are not logged in. Log in to access this page
                </div>
            )
        }
        else {
            return (
                <div>
                    You are logged in!
                </div>
            )
        }
    }
}