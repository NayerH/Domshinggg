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
    let arrTime = new Date(req.body.cityFrom.fDate + "T"+ req.body.cityFrom.arrTime+":00.123Z");
    let depTime =  new Date(req.body.cityFrom.fDate + "T"+ req.body.cityFrom.depTime+":00.123Z");
    let tripD = (parseInt(Math.abs(arrTime - depTime) / (1000 * 60 * 60) % 24,10) + " Hours " + parseInt(Math.abs(arrTime.getTime() - depTime.getTime()) / (1000 * 60) % 60,10) + " Minutes");
    const flight = new Flight({
          FlightNumber: req.body.cityFrom.fNum,
          From: req.body.cityFrom.cityFrom,
          To: req.body.cityFrom.to,
          FlightDate: new Date(req.body.cityFrom.fDate),
          ArrivalTime: arrTime,
          DepartureTime: depTime,
          BusinessNumOfSeats: req.body.cityFrom.busSeats,
          EconomyNumOfSeats: req.body.cityFrom.ecoSeats,
          Baggage: 2,
          Price: 3000,
          TripDuration: tripD,
          SeatsArrBusiness: new Array(parseInt(req.body.cityFrom.busSeats,10)).fill(false),
          SeatsArrEconomy: new Array(parseInt(req.body.cityFrom.ecoSeats,10)).fill(false)
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

exports.findSpecificFlight = (req, res) => {
    Flight.findOne({FlightNumber: req.body.flightNum})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };

exports.getFlights = (req, res) => {
  const flight = {};
  if(req.body.cityFrom !== ''){
    flight.From = req.body.cityFrom;
  }
  if(req.body.to !== ''){
    flight.To = req.body.to;
  }
  if(req.body.fNum !== ''){
    flight.FlightNumber = parseInt(req.body.fNum,10);
  }
  if(req.body.fDate !== ''){
    flight.FlightDate = new Date(req.body.fDate);
  }
  // if(req.body.arrTime !== ''){
  //
  // }
  // if(req.body.depTime !== ''){
  //
  // }
  if(req.body.busSeats !== ''){
    flight.BusinessNumOfSeats = parseInt(req.body.busSeats,10);
  }
  if(req.body.ecoSeats !== ''){
    flight.EconomyNumOfSeats = parseInt(req.body.ecoSeats,10);
  }
  // console.log(flight);
  Flight.find(flight)
    .then(result => {
      if(req.body.arrTime !== '' || req.body.depTime !== ''){
        for(let i = 0; i < result.length; i++){
          let flightRes = result[i];
          // console.log(flightRes);
          if(req.body.arrTime !== ''){
            if(flightRes.ArrivalTime.toISOString().substr(11,5) !== req.body.arrTime){
              result.splice(i, 1);
              i--;
              continue;
            }
          }
          if(req.body.depTime !== ''){
            if(flightRes.DepartureTime.toISOString().substr(11,5) !== req.body.depTime){
              console.log(flightRes);
              result.splice(i, 1);
              i--;
            }
          }
        }
      }
      console.log(result);
      // console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getFlightsUser = (req, res) => {
  const flightDep = {};
  const flightRet = {};
  if(req.body.depAir !== ''){
    flightDep.From = req.body.depAir;
    flightRet.To = req.body.depAir;
  }
  if(req.body.arrAir !== ''){
    flightDep.To = req.body.arrAir;
    flightRet.From = req.body.arrAir;
  }
  if(req.body.depDate !== ''){
    flightDep.FlightDate = new Date(req.body.depDate);
  }
  if(req.body.arrDate !== ''){
    flightRet.FlightDate = new Date(req.body.arrDate);
  }
  let numOfPassengers = parseInt(req.body.children,10) + parseInt(req.body.adults,10);
  let depFlights = Flight.find(flightDep).catch(err => {console.log(err);});
  let arrFlights = Flight.find(flightArr).catch(err => {console.log(err);});
  if(req.body.cabin === "Business") {
    depFlights = depFlights.filter(flight => flight.BusinessNumOfSeats >= numOfPassengers);
    arrFlights = arrFlights.filter(flight => flight.BusinessNumOfSeats >= numOfPassengers);
  } else {
    depFlights = depFlights.filter(flight => flight.EconomyNumOfSeats >= numOfPassengers);
    arrFlights = arrFlights.filter(flight => flight.EconomyNumOfSeats >= numOfPassengers);
  }
  let result = {};
  result.depFlights = depFlights;
  result.arrFlights = arrFlights;
  result.cabin = req.body.cabin;
  result.numOfPassengers = numOfPassengers;
  res.send(result);
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

    exports.testUpdate = (req,res)=>{
      let rawdata = fs.readFileSync('./flights.json');
      let flights = JSON.parse(rawdata);
      flights.forEach( (flightRaw) => {
        // let arrTime = new Date(flightRaw.ArrivalTime.$date);
        // let depTime = new Date(flightRaw.DepartureTime.$date);
        let tripD = (parseInt(Math.abs(arrTime - depTime) / (1000 * 60 * 60) % 24,10) + " Hours " + parseInt(Math.abs(arrTime.getTime() - depTime.getTime()) / (1000 * 60) % 60,10) + " Minutes");
        let flight = {
          SeatsArrBusiness: new Array(27).fill(false),
          SeatsArrEconomy: new Array(27).fill(false)
        };
        Flight.findByIdAndUpdate(flightRaw._id.$oid, flight).then(result =>{
            // res.status(200).send("Flight updated ");
            console.log('The Flight is Updated successfully!');
        }).catch(err => {
            console.log(err);
          });
        }
      );
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
