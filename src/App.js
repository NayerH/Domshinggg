//jshint esversion:6
// External variables
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
const userController = require('./Routes/userController')
const flightController = require('./Routes/flightController')
const bodyParser = require('body-parser')
const MongoURI =
  'mongodb+srv://toukhing:' +
  process.env.DBPASSWORD +
  '@cluster0.cam3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//App variables
const app = express()
app.use(express.static('public'))
const port = process.env.PORT || '3000'
const User = require('./models/User')
const Flight = require('./models/Flight')
console.log(MongoURI)
// #Importing the userController

app.use(cors({ exposedHeaders: ['token', 'name'] }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// To parse the incoming requests with JSON payloads// configurations
// Mongo DB
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('MongoDB is now connected'))
  .catch((err) => console.log(err))

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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

// passport.use(User.createStrategy());
//
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//
// app.use(passport.initialize());
// app.use(passport.session());

// #Routing to usercontroller here

app.post('/add-user', userController.addUser)
app.get('/view-users', userController.viewUsers)
app.post('/getUser', authenticateToken, userController.getUser)
app.post('/signup', userController.signup)
app.post('/updatePassword', authenticateToken, userController.updatePassword)
app.post('/updateUser', authenticateToken, userController.updateUser)
app.post('/bookFlightUser', authenticateToken, userController.bookFlightUser);
app.post('/cancelFlightUser',authenticateToken,userController.cancelFlightUser);

app.post('/emailItinerary', authenticateToken, userController.emailItinerary)
app.post('/payForBooking', userController.payForBooking);
app.post('/editReservationUser', authenticateToken, userController.editReservationUser);

// app.delete('/delete-user/:id',userController.deleteUser);

//app.get('/add-all-flights',authenticateToken, flightController.addFlight);
app.post('/viewAllFlights', authenticateToken, flightController.viewFlight)
app.post('/createFlight', authenticateToken, flightController.addFlight)
app.post('/deleteFlight', authenticateToken, flightController.deleteFlight)
app.post('/editFlight', authenticateToken, flightController.updateFlight)
app.post('/searchFlight', authenticateToken, flightController.getFlights)
app.post('/searchFlightUser', flightController.getFlightsUser)
app.post('/findFlight', flightController.findSpecificFlight)
app.post('/bookFlight', authenticateToken, flightController.bookFlight)
app.post('/cancelFlight', authenticateToken, flightController.cancelFlight)
app.post('/getSeats', flightController.getSeats)

app.post('/getSeatsEdit', authenticateToken, flightController.getSeatsEdit)
app.post('/editReservationFlight', authenticateToken, flightController.editReservationFlight)
app.post('/getFlightsUserEdit', authenticateToken, flightController.getFlightsUserEdit)
// app.get('/testUpdate', flightController.testUpdate);
// app.get('/signup', userController.signup);

app.post('/login', userController.login)
app.post('/logout', userController.logout)

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
})

function authenticateToken(req, res, next) {
  const token = req.headers.token
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}
