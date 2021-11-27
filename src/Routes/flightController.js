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
  console.log(req.body);
    const flight = new Flight({
          FlightNumber: req.body.cityFrom.fNum,
          From: req.body.cityFrom.cityFrom,
          To: req.body.cityFrom.to,
          FlightDate: new Date(req.body.cityFrom.fDate),
          ArrivalTime: new Date(req.body.cityFrom.fDate + "T"+ req.body.cityFrom.arrTime+":00.123Z"),
          DepartureTime: new Date(req.body.cityFrom.fDate + "T"+ req.body.cityFrom.depTime+":00.123Z"),
          BusinessNumOfSeats: req.body.cityFrom.busSeats,
          EconomyNumOfSeats: req.body.cityFrom.ecoSeats,
    });
    console.log(flight);
    flight.save()
      .then(result => {
        res.status(200).send(result);
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
      console.log(req.body.data);
      const flight = {
            FlightNumber: req.body.data.fNum,
            From: req.body.data.cityFrom,
            To: req.body.data.to,
            FlightDate: new Date(req.body.data.fDate),
            ArrivalTime: new Date(req.body.data.fDate + "T"+ req.body.data.arrTime+".123Z"),
            DepartureTime: new Date(req.body.data.fDate + "T"+ req.body.data.depTime+".123Z"),
            BusinessNumOfSeats: req.body.data.busSeats,
            EconomyNumOfSeats: req.body.data.ecoSeats,
      };
      Flight.findByIdAndUpdate(req.body.data.id,flight).then(result =>{

          res.status(200).send("Flight updated ");
          console.log('The Flight is Updated successfully!');
      }).catch(err => {
          console.log(err);
        });

    };

    //Deleting an existing Flight
    exports.deleteFlight = (req,res)=>{
      console.log(req.body);
      Flight.findByIdAndRemove(req.body.id).then(result =>{

          res.status(200).send("Flight Deleted ");
          console.log("The Flight is deleted successfully !");
      }).catch(err => {
          console.log(err);
        });

    };
