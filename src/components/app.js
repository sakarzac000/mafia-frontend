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


import "../style/main.scss";

export default class App extends Component {

  render() {
    return (
      <div className='app'>
        <Router>
          <div>
            <NavigationContainer />


            <Switch>
              <Route path="/signup" render={ () => (
                <Signup />
                )  
              }/>

              <Route path="/login" render={ () => (
                <Login />
                )
              } />

              <Route path="/profile" render={() => (
                <Profile />
              )} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
