import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import NavigationContainer from "./navigation-container"
import Signup from "./pages/signUp"
import Login from "./pages/login"
import Profile from './pages/profile'
import Game from './pages/game'
import Started from './pages/started'


import "../style/main.scss";

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div>
            <NavigationContainer
            loggedInStatus = {this.state.loggedInStatus}
            />


            <Switch>
              <Route path="/signup" render={ () => (
                <Signup 
                />
                )  
              }/>

              <Route path="/login" render={ props => (
                <Login 
                {...props}
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
                )
              } />

              <Route path="/profile" render={
                props => (

                <Profile 
                {...props}
                loggedInStatus = {this.state.loggedInStatus}
                />

              )} />

              {this.state.loggedInStatus=== "LOGGED_IN" ? 
              (
                  <Route path="/game" render={props => (
                    <Game 
                    {...props}
                    loggedInStatus = {this.state.loggedInStatus}
                    />
                  )} 
                  />
              ) : null}

              {this.state.loggedInStatus==='LOGGED_IN' ? (
                  <Route path="/start" render={props => (
                    <Started 
                    />
                  )} />
              ) : null}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
