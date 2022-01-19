//jshint esversion:8
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Stripe = require('stripe')
const stripe = Stripe(
  'sk_test_51KIj0pFpizc2ReMjsUZSvsNC3Jms4T8FtNCinhwK2s9rOm9okpAYTvyJ8GH7Lua36TyRxZMaxwK72qI3Ap0ClIoa00iFZ5oNR7'
)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nayersanad@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
})
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

exports.addUser = (req, res) => {
  const user = new User({
    Name: req.body.Name,
    username: req.body.Email,
    isAdmin: req.body.isAdmin,
    password: req.body.password,
  })

  user
    .save()
    .then((result) => {
      res.send(result)
      console.log('user added')
    })
    .catch((err) => {
      console.log(err)
    })
}
// getting all the users

exports.viewUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getUser = (req, res) => {
  console.log(req.user.user.username)
  User.findOne({ username: req.user.user.username })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

//Name passportNo username
exports.updateUser = (req, res) => {
  updateUser = {}
  if (req.body.Name != '') {
    updateUser.Name = req.body.Name
  }
  if (req.body.passportNo != '') {
    updateUser.passportNo = req.body.passportNo
  }
  if (req.body.username != '') {
    updateUser.username = req.body.username
  }
  User.updateOne({ username: req.user.user.username }, updateUser)
    .then((result) => {
      res.status(200).send('User updated ')
      console.log('The User is Updated successfully !')
    })
    .catch((err) => {
      console.log(err)
    })
}

//oldPassword newPassword
exports.updatePassword = (req, res) => {
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  var result = bcrypt.compareSync(oldPassword, req.user.user.password)
  if (result) {
    User.updateOne(
      { username: req.user.user.username },
      { password: bcrypt.hashSync(newPassword, 10) }
    )
      .then((result) => {
        res.status(200).send('Password updated')
        console.log('The User is Updated successfully !')
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    return res.json({ message: 'wrong password' })
  }
}

//Deleting an existing user
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(200).send('User Deleted ')
      console.log('The User is deleted successfully !')
    })
    .catch((err) => {
      console.log(err)
    })
}

//LOGIN
exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // console.log(process.env.TOKEN_SECRET);
  try {
    let user = await User.findOne({ username: email }).then((user) => {
      // console.log(user);
      if (user) {
        // console.log(user.password);
        // console.log(password);

        var result = bcrypt.compareSync(password, user.password)

        if (result) {
          const isAdmin = user.isAdmin
          const token = jwt.sign({ user }, process.env.TOKEN_SECRET)

          res.setHeader('token', token)
          res.setHeader('isAdmin', isAdmin)
          return res.json(user)
        } else {
          return res.json({ message: 'wrong password' })
        }
      }
    })

    if (!user) {
      console.log('no user')
      return res.json({
        statusCode: 0,
        message: 'email does not exist, please sign up',
      })
    }
  } catch (exception) {
    console.log(exception)
    return res.json({
      statusCode: 1,
      error: 'exception',
    })
  }
}

exports.logout = async (req, res) => {
  try {
    const token = req.headers.token
    //console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET)
    return res.json({
      status: 0,
      message: 'Success',
    })
  } catch (err) {
    console.log(err)
    return res.json({
      status: 1,
      message: 'Error',
    })
  }
}

exports.signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNo,
    address,
    code,
    passNum,
  } = req.body
  // console.log(email)
  let user = false
  // console.log('METHOD ACTIVE')
  try {
    let user = await User.findOne({
      username: email,
    })
    // console.log(user)
    if (user) {
      return res.json({
        statusCode: 0,
        message: 'email already exists, please sign in',
      })
    } else {
      var newUser = new User({
        username: email,
        Name: firstName + ' ' + lastName,
        password: password,
        isAdmin: false,
        phoneNo: phoneNo,
        address: address,
        code: code,
        passportNo: passNum,
      })
      newUser.password = bcrypt.hashSync(password, 10)
      newUser.save(function (err, user) {
        console.log(user)
        console.log(err)
        if (err) {
          // console.log(err)
          return res.json(err)
        } else {
          // console.log(user)
          return res.json(user)
        }
      })
    }
  } catch (err) {
    if (err) {
      return res.json({
        statusCode: 1,
        error: 'error caught ',
      })
    }
  }
}

//retFlight(fNum,seats) depFlight(fNum,seats) cabin price
exports.bookFlightUser = (req, res) => {
  console.log(req.user)
  let reservation = {
    ReturnFlightNum: req.body.retFlightNum,
    ReturnFlightSeats: req.body.retFlightSeats,
    DepartureFlightNum: req.body.depFlightNum,
    DepartureFlightSeats: req.body.depFlightSeats,
    Cabin: req.body.cabin,
    Price: req.body.price,
    bookingNo: Math.floor(Math.random() * 1000),
  }
  User.findOne({ username: req.user.user.username })
    .then((user) => {
      user.reservations.push(reservation)
      user.save().then((result) => {
        console.log(result)
        var mailOptions = {
          from: 'nayersanad@gmail.com',
          to: req.user.user.username,
          subject: 'Booking Confirmation',
          text:
            'This email is to confirm the booking under the reservation number ' +
            reservation.bookingNo +
            ' and this is the booking itenary:\nDeparture Flight Number: ' +
            reservation.DepartureFlightNum +
            '\nDeparture Flight Seats: ' +
            reservation.DepartureFlightSeats +
            '\nReturn Flight Number: ' +
            reservation.ReturnFlightNum +
            '\nReturn Flight Seats: ' +
            reservation.ReturnFlightSeats +
            '\nCabin: ' +
            reservation.Cabin +
            '\nPrice: ' +
            reservation.Price,
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
        return res.json(result)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//reservationNumber
exports.emailItinerary = (req, res) => {
  console.log(req.body)
  User.findOne({ username: req.user.user.username })
    .then((user) => {
      let reservation = null
      for (let i = 0; i < user.reservations.length; i++) {
        if (
          user.reservations[i].bookingNo ===
          parseInt(req.body.reservationNumber, 10)
        ) {
          reservation = user.reservations[i]
          break
        }
      }
      if (reservation === null) {
        return res.json('Cannot find reservation')
      }
      var mailOptions = {
        from: 'nayersanad@gmail.com',
        to: req.user.user.username,
        subject: 'Booking Itinerary',
        text:
          'This is the itinerary for the booking under the reservation number ' +
          reservation.bookingNo +
          ' and this is all the information:\nDeparture Flight Number: ' +
          reservation.DepartureFlightNum +
          '\nDeparture Flight Seats: ' +
          reservation.DepartureFlightSeats +
          '\nReturn Flight Number: ' +
          reservation.ReturnFlightNum +
          '\nReturn Flight Seats: ' +
          reservation.ReturnFlightSeats +
          '\nCabin: ' +
          reservation.Cabin +
          '\nPrice: ' +
          reservation.Price,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
      return res.json('SUCCESS')
    })
    .catch((err) => {
      console.log(err)
    })
}

//index
exports.cancelFlightUser = (req, res) => {
  console.log(req.user.user)
  User.findOne({
    username: req.user.user.username,
  })
    .then((user) => {
      let reservation = user.reservations[req.body.index]
      user.reservations.splice(req.body.index, 1)
      user.save().then((result) => {
        console.log(result)
        var mailOptions = {
          from: 'nayersanad@gmail.com',
          to: req.user.user.username,
          subject: 'Booking Cancellation Confirmation',
          text:
            'This email is to confirm the cancellation of Reservation Number ' +
            reservation.bookingNo +
            ' and that the amount of ' +
            reservation.Price +
            ' is to be refunded.',
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
        return res.json(result.reservations)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//reservationIndex departure seats -- seats in a string not an array
exports.editSeatsUser = (req, res) => {
  User.findOne({
    username: req.user.user.username,
  }).then((user) => {
    if (req.body.departure) {
      user.reservations[reservationIndex].DepartureFlightSeats = req.body.seats
    } else {
      user.reservations[reservationIndex].ReturnFlightSeats = req.body.seats
    }
  })
}

//amount token
exports.payForBooking = (req, res) => {
  console.log(req.body)
  let amountInt = parseInt(req.body.amount, 10)
  stripe.charges.create(
    {
      amount: amountInt * 100,
      currency: 'usd',
      source: req.body.token,
      description:
        'Payment for a booking with the amount of ' + req.body.amount,
    },
    function (err, charge) {
      if (err) {
        console.log(err)
        switch (err.type) {
          case 'StripeCardError':
            // A declined card error
            err.message = 'Your cardwas declined, please contact your bank.'
            console.log('card was declined')
            break
          case 'StripeRateLimitError':
            err.message =
              'Looks like we have a problem on our end, please try again later.'
            console.log('stripe rate limit exceeded')
            break
          case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            err.message = 'Please fill in all the card details correctly'
            console.log('stripe invalid parameters')
            break
          case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            err.message =
              'Looks like we have a problem on our end, please try again later.'
            console.log('stripe api error')
            break
          case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            err.message =
              'Looks like we have a problem on our end, please try again later.'
            console.log('stripe https error')
            break
          case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            err.message =
              'Looks like we have a problem on our end, please try again later.'
            console.log('incorrect stripe api key')
            break
          default:
            // Handle any other types of unexpected errors
            err.message = 'unexpected error'
            break
        }
        return res.send(err)
      }
      console.log(charge)
      return res.send(charge)
    }
  )
}
