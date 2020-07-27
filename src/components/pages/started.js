import React, { Component } from 'react';

import Player from '../player'

export default class Started extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: `Day`,
            players: [],
            role : "",
            alive: true,
            endTurnBtn: "hidden"
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/game/init', {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(err => console.log(err))

        fetch('http://127.0.0.1:5000/game/player_count', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            this.setState({
                players: data
            })
        })
        .catch(err => console.log(err))

        fetch('http://127.0.0.1:5000/game/get_role', { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            if (data == "You are Mafia") {
                this.setState({
                    role: "Mafia"
                })
            }
            if (data == "You are Villager") {
                this.setState({
                    role: "Villager"
                })
            }
        })
        .catch(err => console.log(err))

        setTimeout(() => {
            fetch('http://127.0.0.1:5000/game/night', { method: 'POST'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    time: 'Night'
                })

                if(this.state.alive 
                    && this.state.role == "Mafia" 
                    && this.state.time == "Night") {
                        this.setState({
                            endTurnBtn: 'visible'
                        })
                }
            })
            .catch(err => console.log(err))
        }, 5000)
    }

    componentWillUnmount() {
        
    }

    render() {
        const players = this.state.players.map(player => {
            return (
                <div>
                    <Player />

                    <button style={{visibility: this.state.endTurnBtn}}>Kill</button>
                </div>
            )
        })

        return (
            <div className="started-game">
                <p>{this.state.time}</p>
                <h1>{this.state.role}</h1>
                <h1>{players}</h1>

                <button style={{visibility: this.state.endTurnBtn}}>End Turn</button>
            </div>
        )
    }
}