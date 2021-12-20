//jshint esversion:6
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login'
import AddFlight from './components/AddFlight'
import Home from './components/Home'
import Seats from './components/Seats'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/flight' component={AddFlight} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/chooseSeats' component={Seats} />
        </div>
      </Router>
    )
  }
}

export default App
