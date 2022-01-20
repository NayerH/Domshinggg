//jshint esversion:6
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login'
import AddFlight from './components/AddFlight'
import Home from './components/Home'
import Seats from './components/Seats'
import Confirmation from './components/Confirmation'
import Profile from './components/Profile'
import NavBar from './components/NavBar'
import SignUp from './components/Signup'
import RetSeats from './components/RetSeats'
import DepSeats from './components/DepSeats'
import DepFlights from './components/DepFlights'
import RetFlights from './components/RetFlights'
import ConfirmationDep from './components/ConfirmationDep'
import ConfirmationRet from './components/ConfirmationRet'

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' component={AddFlight} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/chooseSeats' component={Seats} />
          <Route exact path='/confirmation' component={Confirmation} />
          <Route exact path='/my-profile' component={Profile} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/retSeats' component={RetSeats} />
          <Route exact path='/depSeats' component={DepSeats} />
          <Route exact path='/depFlights' component={DepFlights} />
          <Route exact path='/retFlights' component={RetFlights} />
          <Route exact path='/confirmationDep' component={ConfirmationDep} />
          <Route exact path='/confirmationRet' component={ConfirmationRet} />
        </div>
      </Router>
    )
  }
}

export default App
