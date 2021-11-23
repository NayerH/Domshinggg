//jshint esversion:6
const User = require('../models/User');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      User.find({Name:req.params.name})
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
        });
    };

    exports.updateUser = (req,res)=>{
      User.findByIdAndUpdate(req.params.id,req.body).then(result =>{

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
exports.login = (req,res)=>{
  const user = new User({
    username: req.body.email,
    password: req.body.password,
  });
  console.log(user);
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.json({message: err});
    }
    if (!user) {
      console.log(info);
      return res.json({message: "User not found"});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json({message: err});
      }
      return res.json(user);
    });
  })(req, res);
// User.register({username:"admin@flightreservation.com", Name:"Adminstrator",isAdmin:true}, "adminpassword", function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DONE" );
//   }
// });
};
