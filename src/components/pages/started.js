import React, { Component } from 'react';

export default class Started extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: `day`
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/game/init', {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(err => console.log(err))
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="started-game">
                <p>{this.state.time}</p>
            </div>
        )
    }
}