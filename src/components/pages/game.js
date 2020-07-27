import React, { Component } from 'react';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstPlayer: false,
            disabledButton: true,
            joinHidden: 'inline',
            notif: "",
            pHidden: 'none',
            buttonDisplay: 'inline'
        }

        this.joinGame = this.joinGame.bind(this)
        this.tick = this.tick.bind(this)
        this.initialize = this.initialize.bind(this)
    }

    tick() {
        fetch('http://127.0.0.1:5000/game/ping', {method: 'GET'} )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data == "Ready to start!") {
                this.setState({
                    disabledButton: false,
                    notif: "Ready to Start!"
                })
            }
            
            else if(data == "Not enough players") {
                this.setState({
                    disabledButton: true,
                    notif: "There must be at least seven players"
                })
            }

            else if(data == "Odd Number Required") {
                this.setState({
                    disabledButton: true,
                    notif: "There must be an odd number of players."
                })
            }

            else if(data == "Pinged!") {
                this.props.history.push('start')
            }

        })            
    }

    componentDidMount() {
        this.pingID = setInterval(this.tick, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.pingID)
    }

    joinGame() {
        this.setState({
            joinHidden: 'none'
        })

        fetch('http://127.0.0.1:5000/game/enter', {method: 'POST'} )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data == "Entered! You are player #1") {
                this.setState({
                    firstPlayer: true,
                    pHidden: "none"
                })
            }
            else {
                this.setState({
                    pHidden: "inline"
                })
            }
        })
        .catch(err => console.log(err))
    }

    initialize() {

        clearInterval(this.pingID)

        this.setState({
            buttonDisplay: 'none',
            notif: "",
            pHidden: 'none',
            joinHidden: 'none'
        })

        this.props.history.push('start')
    }

    render() {
        return (
            <div>   
                {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <div>
                        <a href="#" onClick={this.joinGame} style={{display: this.state.joinHidden}}>Join Game!</a>
                        {this.state.firstPlayer == true ? (
                            <div>
                                <button 
                                disabled={this.state.disabledButton} 
                                onClick={this.initialize}
                                style={{display: this.state.buttonDisplay}}
                                >Start Game!</button>
                                <p>{this.state.notif}</p>
                            </div>
                        ) : (
                            <p style={{display: this.state.pHidden}}>Waiting for match host to start the game...</p>
                        )}

                    </div>
                ) : null }
            </div>
        )
    }
}