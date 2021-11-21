//jshint esversion:6
// External variables
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const userController = require('./Routes/userController');
const flightController = require('./Routes/flightController');
const MongoURI =  "mongodb+srv://toukhing:" + process.env.DBPASSWORD + "@cluster0.cam3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;

//App variables
const app = express();
const port = process.env.PORT || "3000";
const User = require('./models/User');
const Flight = require('./models/Flight');
// #Importing the userController

app.use(express.urlencoded({extended: true}));
app.use(express.json());
 // To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// #Routing to usercontroller here

app.post('/add-user', userController.addUser);
app.get('/view-users',userController.viewUsers);
app.get('/get-all-users/:name', userController.getUser);
app.put('/update-user/:id',userController.updateUser);
app.delete('/delete-user/:id',userController.deleteUser);

app.get('/add-all-flights', flightController.addFlight);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
