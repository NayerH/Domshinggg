//jshint esversion:6
// External variables
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
const userController = require('./Routes/userController');
const flightController = require('./Routes/flightController');
const MongoURI =  "mongodb+srv://toukhing:" + process.env.DBPASSWORD + "@cluster0.cam3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;

//App variables
const app = express();
app.use(express.static("public"));
const port = process.env.PORT || "3000";
const User = require('./models/User');
const Flight = require('./models/Flight');
console.log(MongoURI);
// #Importing the userController

app.use(cors({ exposedHeaders: ['authToken', 'name'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
 // To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

// app.use(function (req, res, next) {
//   console.log(req.headers.token);
//   JWT.verify(
//     req.headers.token,
//     process.env.TOKEN_SECRET,
//     function (err, decodedToken) {
//       if (err) {
//         /* handle token err */
//         console.log(err);
//         return res.json({
//           message: 'authorization error',
//         });
//       } else {
//         req.userId = decodedToken.id; // Add to req object
//         next();
//       }
//     }
//   );
// });
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// passport.use(User.createStrategy());
//
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//
// app.use(passport.initialize());
// app.use(passport.session());

// #Routing to usercontroller here

app.post('/add-user', userController.addUser);
app.get('/view-users',userController.viewUsers);
app.get('/get-all-users/:name', userController.getUser);
app.put('/update-user/:id',userController.updateUser);
app.delete('/delete-user/:id',userController.deleteUser);

app.get('/add-all-flights', flightController.addFlight);
app.post('/viewAllFlights', flightController.viewFlight);
// app.get('/signup', userController.signup);

app.post("/login", userController.login);
app.post("/logout", userController.logout);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
