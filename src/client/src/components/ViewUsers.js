//jshint esversion:6
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewUsersList extends Component {


constructor(){
  super();
  this.state = {
    users:[]
  };
}

componentDidMount(){
  axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
    console.log(res);
    const users = res.data;
    this.setState({users});
  });
} 
  render() {


    return (
      <div className="ViewUsersList">

        <ul>
        {this.state.users.map(user => <li>{user.name} </li>)}
        </ul>


            <div className="col-md-11">
              <Link to="/create-user" className="btn btn-outline-warning float-right">
                + Add New User
              </Link>

            </div>
      </div>
    );
  }
}

export default ViewUsersList;
