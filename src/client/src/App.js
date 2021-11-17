//jshint esversion:6
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CreateUser from './components/CreateUser';
import ViewUsers from './components/ViewUsers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component={ViewUsers} />
          <Route path='/create-user' component={CreateUser} />

        </div>
      </Router>
    );
  }
}

export default App;
