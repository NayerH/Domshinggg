//jshint esversion:6
const Flight = require('../models/Flight');
const fs = require('file-system');
exports.addFlight = (req, res) => {
  // Bulk Save for multiple flights from CSV Files

  // let rawdata = fs.readFileSync('./flights.json');
  // let flights = JSON.parse(rawdata);
  // flights.forEach( (flightRaw) => {
  //   let flight = new Flight({
  //     FlightNumber: flightRaw.FlightNumber,
  //     From: flightRaw.From,
  //     To: flightRaw.To,
  //     FlightDate: new Date(flightRaw.FlightDate),
  //     ArrivalTime: new Date(flightRaw.FlightDate + "T"+ flightRaw.ArrivalTime+":00.123Z"),
  //     DepartureTime: new Date(flightRaw.FlightDate + "T"+ flightRaw.DepartureTime+":00.123Z"),
  //     BusinessNumOfSeats: flightRaw.BusinessNumOfSeats,
  //     EconomyNumOfSeats: flightRaw.EconomyNumOfSeats,
  //   });
  //   console.log(flight);
  //   flight.save()
  //     .then(result => {
  //       // res.send(result);
  //       console.log("flight added");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }
  // );
  // res.send(200);
    const flight = new Flight({
          FlightNumber: req.body.FlightNumber,
          From: req.body.From,
          To: req.body.To,
          FlightDate: new Date(req.body.FlightDate),
          ArrivalTime: new Date(req.body.FlightDate + "T"+ req.body.ArrivalTime+":00.123Z"),
          DepartureTime: new Date(req.body.FlightDate + "T"+ req.body.DepartureTime+":00.123Z"),
          BusinessNumOfSeats: req.body.BusinessNumOfSeats,
          EconomyNumOfSeats: req.body.EconomyNumOfSeats,
    });

    flight.save()
      .then(result => {
        res.send(result);
        console.log("flight added");
      })
      .catch(err => {
        console.log(err);
      });
  };
// getting all the Flight

exports.viewFlight = (req, res) => {
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };

    exports.getFlight = (req, res) => {
      Flight.find({Name:req.params.name})
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
        });
    };

    exports.updateFlight = (req,res)=>{
      Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{

          res.status(200).send("Flight updated ");
          console.log('The Flight is Updated successfully!');
      }).catch(err => {
          console.log(err);
        });

    };

    //Deleting an existing Flight
    exports.deleteFlight = (req,res)=>{
      Flight.findByIdAndRemove(req.params.id).then(result =>{

          res.status(200).send("Flight Deleted ");
          console.log("The Flight is deleted successfully !");
      }).catch(err => {
          console.log(err);
        });

    };
