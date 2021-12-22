//jshint esversion:8
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nayersanad@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
});
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
    });

    user.save()
      .then(result => {
        res.send(result);
        console.log("user added");
      })
      .catch(err => {
        console.log(err);
      });
  };
// getting all the users

exports.viewUsers = (req, res) => {
    User.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };

exports.getUser = (req, res) => {
  User.find({username:req.user.user.username})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

//Name passportNo username
exports.updateUser = (req,res)=>{
  updateUser = {};
  if(req.body.Name != ""){
    updateUser.Name = req.body.Name;
  }
  if(req.body.passportNo != ""){
    updateUser.passportNo = req.body.passportNo;
  }
  if(req.body.username != ""){
    updateUser.username = req.body.username;
  }
  User.updateOne({username: req.user.user.username},updateUser).then(result =>{

      res.status(200).send("User updated ");
      console.log('The User is Updated successfully !');
  }).catch(err => {
      console.log(err);
    });

};

//Deleting an existing user
exports.deleteUser = (req,res)=>{
  User.findByIdAndRemove(req.params.id).then(result =>{

      res.status(200).send("User Deleted ");
      console.log("The User is deleted successfully !");
  }).catch(err => {
      console.log(err);
    });

};

//LOGIN
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // console.log(process.env.TOKEN_SECRET);
  try {
    let user = await User.findOne({username: email})
    .then( (user) => {
      // console.log(user);
      if (user) {
        // console.log(user.password);
        // console.log(password);

        var result = bcrypt.compareSync(password, user.password);

        if (result) {
          const isAdmin = user.isAdmin;
          const token = jwt.sign(
            {user},
            process.env.TOKEN_SECRET,
            {
              expiresIn: '5h',
            }
          );

          res.setHeader('token', token);
          res.setHeader('isAdmin', isAdmin);
          return res.json(user);
        } else {
          return res.json({ message: 'wrong password' });
        }
      }
    });


    if (!user) {
      console.log("no user");
      return res.json({
        statusCode: 0,
        message: 'email does not exist, please sign up',
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: 'exception',
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.token;
    //console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET);
    return res.json({
      status: 0,
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: 1,
      message: 'Error',
    });
  }
};

exports.signup = async (req, res) => {
  // const { email, password} = req.body;
let user = false;
console.log("METHOD ACTIVE");
  try {
    // let user = await User.findOne({
    //   email,
    // });
    if (user) {
      return res.json({
        statusCode: 0,
        message: 'email already exists, please sign in',
      });
    } else {
      var newUser = new User({
        username: "admin@flightreservation.com",
        Name: "Admin",
        password: "adminpassword",
        isAdmin: true
      });
      newUser.password = bcrypt.hashSync("adminpassword", 10);
      newUser.save(function (err, user) {
        if (err) {
          return (res.status = (400).send({
            message: err,
          }));
        } else {
          // user.password = undefined;
          return res.json(user);
        }
      });
    }
  } catch (err) {
    if (err) {
      return res.json({
        statusCode: 1,
        error: 'error caught ',
      });
    }
  }
};

//retFlight(fNum,seats) depFlight(fNum,seats) cabin price
exports.bookFlightUser = (req, res) => {
  console.log(req.user);
  let reservation = {
    ReturnFlight: {
      fNum: req.body.retFlightNum,
      seats:req.body.retFlightSeats
    },
    DepartureFlight: {
      fNum: req.body.depFlightNum,
      seats:req.body.depFlightSeats
    },
    Cabin: req.body.cabin,
    Price: req.body.price,
    bookingNo: Math.floor(Math.random() * 1000)
  };
  User.findOne({username: req.user.user.username}).then((user) => {
    user.reservations.push(reservation);
    user.save().then((result) => {
      console.log(result);
      return res.json(result);
    });
  }).catch(err => {
    console.log(err);
  });
};

//index
exports.cancelFlightUser = (req, res) => {
  console.log(req.user.user);
  User.findOne({
    username: req.user.user.username
  }).then((user) => {
    let reservation = user.reservations[req.body.index];
    user.reservations.splice(req.body.index, 1);
    user.save().then((result) => {
      console.log(result);
      var mailOptions = {
        from: 'nayersanad@gmail.com',
        to: 'nayerhany@gmail.com',
        subject: 'Booking Cancellation Confirmation',
        text: 'This email is to confirm the cancellation of Reservation Number ' + reservation.bookingNo + ' and that the amount of ' + reservation.Price + ' is to be refunded.'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.json(result);
    });
  }).catch(err => {
    console.log(err);
  });
};
