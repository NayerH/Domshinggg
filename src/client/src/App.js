//jshint esversion:6
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login'
import AddFlight from './components/AddFlight'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/flight' component={AddFlight} />
        </div>
      </Router>
    )
  }
}

export default App
