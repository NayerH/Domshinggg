//jshint esversion:6
const Flight = require('../models/Flight')
const fs = require('file-system')
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
  console.log(req.body)
  let arrTime = new Date(
    req.body.cityFrom.fDate + 'T' + req.body.cityFrom.arrTime + ':00.123Z'
  )
  let depTime = new Date(
    req.body.cityFrom.fDate + 'T' + req.body.cityFrom.depTime + ':00.123Z'
  )
  let tripD =
    parseInt((Math.abs(arrTime - depTime) / (1000 * 60 * 60)) % 24, 10) +
    ' Hours ' +
    parseInt(
      (Math.abs(arrTime.getTime() - depTime.getTime()) / (1000 * 60)) % 60,
      10
    ) +
    ' Minutes'
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
    SeatsArrBusiness: new Array(parseInt(req.body.cityFrom.busSeats, 10)).fill(
      false
    ),
    SeatsArrEconomy: new Array(parseInt(req.body.cityFrom.ecoSeats, 10)).fill(
      false
    ),
  })
  console.log(flight)
  flight
    .save()
    .then((result) => {
      res.status(200).send(result)
      console.log('flight added')
    })
    .catch((err) => {
      console.log(err)
    })
}
// getting all the Flight

exports.viewFlight = (req, res) => {
  Flight.find({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.findSpecificFlight = (req, res) => {
  Flight.findOne({ FlightNumber: req.body.flightNum })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getFlights = (req, res) => {
  const flight = {}
  if (req.body.cityFrom !== '') {
    flight.From = req.body.cityFrom
  }
  if (req.body.to !== '') {
    flight.To = req.body.to
  }
  if (req.body.fNum !== '') {
    flight.FlightNumber = parseInt(req.body.fNum, 10)
  }
  if (req.body.fDate !== '') {
    flight.FlightDate = new Date(req.body.fDate)
  }
  // if(req.body.arrTime !== ''){
  //
  // }
  // if(req.body.depTime !== ''){
  //
  // }
  if (req.body.busSeats !== '') {
    flight.BusinessNumOfSeats = parseInt(req.body.busSeats, 10)
  }
  if (req.body.ecoSeats !== '') {
    flight.EconomyNumOfSeats = parseInt(req.body.ecoSeats, 10)
  }
  // console.log(flight);
  Flight.find(flight)
    .then((result) => {
      if (req.body.arrTime !== '' || req.body.depTime !== '') {
        for (let i = 0; i < result.length; i++) {
          let flightRes = result[i]
          // console.log(flightRes);
          if (req.body.arrTime !== '') {
            if (
              flightRes.ArrivalTime.toISOString().substr(11, 5) !==
              req.body.arrTime
            ) {
              result.splice(i, 1)
              i--
              continue
            }
          }
          if (req.body.depTime !== '') {
            if (
              flightRes.DepartureTime.toISOString().substr(11, 5) !==
              req.body.depTime
            ) {
              console.log(flightRes)
              result.splice(i, 1)
              i--
            }
          }
        }
      }
      console.log(result)
      // console.log(result);
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

//depAir arrAir flightDate numOfPassengers cabin
exports.getFlightsUserEdit = (req, res) => {
  console.log(req.body)
  const flightSearch = {}
  flightSearch.From = req.body.depAir
  flightSearch.To = req.body.arrAir
  flightSearch.FlightDate = new Date(req.body.flightDate)
  let numOfPassengers = parseInt(req.body.numOfPassengers, 10)
  console.log(flightSearch)
  Flight.find(flightSearch).then((flights) => {
    if (!(flights instanceof Array)) {
      console.log('NOT ARRAY')
      let tempFlights = []
      tempFlights.push(flights)
      flights = tempFlights
    }
    console.log(flights)
    if (req.body.cabin === 'Business') {
      flights = flights.filter(
        (flight) => flight.BusinessNumOfSeats >= numOfPassengers
      )
    } else {
      flights = flights.filter(
        (flight) => flight.EconomyNumOfSeats >= numOfPassengers
      )
    }
    let result = {}
    result.resFlights = flights
    result.cabin = req.body.cabin
    result.numOfPassengers = numOfPassengers
    // console.log(result)
    res.send(result)
  })
}

//depAir arrAir depDate arrDate children adults cabin
exports.getFlightsUser = (req, res) => {
  // console.log(req.body)
  const flightDep = {}
  const flightRet = {}
  if (req.body.depAir !== '') {
    flightDep.From = req.body.depAir
    flightRet.To = req.body.depAir
  }
  if (req.body.arrAir !== '') {
    flightDep.To = req.body.arrAir
    flightRet.From = req.body.arrAir
  }
  if (req.body.depDate !== '') {
    flightDep.FlightDate = new Date(req.body.depDate)
  }
  if (req.body.arrDate !== '') {
    flightRet.FlightDate = new Date(req.body.arrDate)
  }
  let numOfPassengers =
    parseInt(req.body.children, 10) + parseInt(req.body.adults, 10)
  Flight.find(flightDep).then((depFlights) => {
    Flight.find(flightRet).then((arrFlights) => {
      if (!(depFlights instanceof Array)) {
        // console.log('NOT ARRAY')
        let tempDepFlights = []
        tempDepFlights.push(depFlights)
        depFlights = tempDepFlights
        console.log(depFlights)
      }
      if (!(arrFlights instanceof Array)) {
        // console.log('NOT ARRAY')
        let tempArrFlights = []
        tempArrFlights.push(arrFlights)
        arrFlights = tempArrFlights
      }
      if (req.body.cabin === 'Business') {
        depFlights = depFlights.filter(
          (flight) => flight.BusinessNumOfSeats >= numOfPassengers
        )
        arrFlights = arrFlights.filter(
          (flight) => flight.BusinessNumOfSeats >= numOfPassengers
        )
      } else {
        depFlights = depFlights.filter(
          (flight) => flight.EconomyNumOfSeats >= numOfPassengers
        )
        arrFlights = arrFlights.filter(
          (flight) => flight.EconomyNumOfSeats >= numOfPassengers
        )
      }
      let result = {}
      result.depFlights = depFlights
      result.arrFlights = arrFlights
      result.cabin = req.body.cabin
      result.numOfPassengers = numOfPassengers
      console.log(result)
      res.send(result)
    })
  })
}

exports.updateFlight = (req, res) => {
  console.log(req.body.data)
  const flight = {
    FlightNumber: req.body.data.fNum,
    From: req.body.data.cityFrom,
    To: req.body.data.to,
    FlightDate: new Date(req.body.data.fDate),
    ArrivalTime: new Date(
      req.body.data.fDate + 'T' + req.body.data.arrTime + '.123Z'
    ),
    DepartureTime: new Date(
      req.body.data.fDate + 'T' + req.body.data.depTime + '.123Z'
    ),
    BusinessNumOfSeats: req.body.data.busSeats,
    EconomyNumOfSeats: req.body.data.ecoSeats,
  }
  Flight.findByIdAndUpdate(req.body.data.id, flight)
    .then((result) => {
      res.status(200).send('Flight updated ')
      console.log('The Flight is Updated successfully!')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.testUpdate = (req, res) => {
  let rawdata = fs.readFileSync('./flights.json')
  let flights = JSON.parse(rawdata)
  flights.forEach((flightRaw) => {
    // let arrTime = new Date(flightRaw.ArrivalTime.$date);
    // let depTime = new Date(flightRaw.DepartureTime.$date);
    let tripD =
      parseInt((Math.abs(arrTime - depTime) / (1000 * 60 * 60)) % 24, 10) +
      ' Hours ' +
      parseInt(
        (Math.abs(arrTime.getTime() - depTime.getTime()) / (1000 * 60)) % 60,
        10
      ) +
      ' Minutes'
    let flight = {
      SeatsArrBusiness: new Array(27).fill(false),
      SeatsArrEconomy: new Array(27).fill(false),
    }
    Flight.findByIdAndUpdate(flightRaw._id.$oid, flight)
      .then((result) => {
        // res.status(200).send("Flight updated ");
        console.log('The Flight is Updated successfully!')
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

//Deleting an existing Flight
exports.deleteFlight = (req, res) => {
  console.log(req.body)
  Flight.findByIdAndRemove(req.body.id)
    .then((result) => {
      res.status(200).send('Flight Deleted ')
      console.log('The Flight is deleted successfully !')
    })
    .catch((err) => {
      console.log(err)
    })
}
//cabin depFlightNum retFlightNum
exports.getSeats = (req, res) => {
  console.log(req.body)
  Flight.findOne({ FlightNumber: req.body.depFlightNum })
    .then((depFlightRes) => {
      Flight.findOne({ FlightNumber: req.body.retFlightNum })
        .then((retFlightRes) => {
          const result = {}
          if (req.body.cabin === 'Economy') {
            result = {
              depFlightSeats: depFlightRes.SeatsArrEconomy,
              retFlightSeats: retFlightRes.SeatsArrEconomy,
            }
          } else {
            result = {
              depFlightSeats: depFlightRes.SeatsArrBusiness,
              retFlightSeats: retFlightRes.SeatsArrBusiness,
            }
          }
          return res.json(result)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

//cabin FlightNum
exports.getSeatsEdit = (req, res) => {
  // console.log(req.body)
  Flight.findOne({ FlightNumber: req.body.FlightNum })
    .then((FlightRes) => {
      const result = null
      if (req.body.cabin === 'Economy') {
        result = FlightRes.SeatsArrEconomy
      } else {
        result = FlightRes.SeatsArrBusiness
      }
      return res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

//cabinOld cabinNew flightNumOld flightNumNew oldSeats newSeats
exports.editReservationFlight = (req, res) => {
  // console.log(req.body)
  if(flightNumOld !== flightNumNew){
  Flight.findOne({ FlightNumber: req.body.flightNumOld })
    .then((flightRes) => {
      if(flightRes == null){
        return res.json("FAILED")
      }
      let oldFlightSeats = req.body.oldSeats.split(',')
      for (let i = 0; i < oldFlightSeats.length; i++) {
        if (req.body.cabinOld === 'Economy') {
          flightRes.SeatsArrEconomy[oldFlightSeats[i]] = false
          flightRes.EconomyNumOfSeats += 1;
        } else {
          flightRes.SeatsArrBusiness[oldFlightSeats[i]] = false
          flightRes.BusinessNumOfSeats += 1;
        }
      }
      Flight.findOne({ FlightNumber: req.body.flightNumNew })
        .then((flightRes1) => {
          let newFlightSeats = req.body.newSeats.split(',')

          for (let i = 0; i < newFlightSeats.length; i++) {
            if (req.body.cabinNew === 'Economy') {
              flightRes1.SeatsArrEconomy[newFlightSeats[i]] = true
              flightRes1.EconomyNumOfSeats -= 1;
            } else {
              flightRes1.SeatsArrBusiness[newFlightSeats[i]] = true
              flightRes1.BusinessNumOfSeats -= 1;
            }
          }
        });
      flightRes.save().then((res) => {
        flightRes1.save().then((res1) => {

        }).catch((err1) => {
          console.log(err1)
        })
      }).catch((err) => {
        console.log(err)
      })

      return res.json('SUCCESS')
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    Flight.findOne({ FlightNumber: req.body.flightNumOld })
      .then((flightRes) => {
        let oldFlightSeats = req.body.oldSeats.split(',')
        let newFlightSeats = req.body.newSeats.split(',')
        for (let i = 0; i < oldFlightSeats.length; i++) {
          if (req.body.cabinOld === 'Economy') {
            flightRes.SeatsArrEconomy[oldFlightSeats[i]] = false;
            flightRes.EconomyNumOfSeats += 1;
          } else {
            flightRes.SeatsArrBusiness[oldFlightSeats[i]] = false
            flightRes.BusinessNumOfSeats += 1;
          }
        }
        for (let i = 0; i < newFlightSeats.length; i++) {
          if (req.body.cabinNew === 'Economy') {
            flightRes.SeatsArrEconomy[newFlightSeats[i]] = true
            flightRes.BusinessNumOfSeats -= 1;
          } else {
            flightRes.SeatsArrBusiness[newFlightSeats[i]] = true
            flightRes.BusinessNumOfSeats -= 1;
          }
        }
        return res.json('SUCCESS')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


//depFlightNum retFlightNum cabin depFlightSeats retFlightSeats
exports.bookFlight = (req, res) => {
  Flight.findOne({ FlightNumber: req.body.depFlightNum })
    .then((depFlightRes) => {
      Flight.findOne({ FlightNumber: req.body.retFlightNum })
        .then((retFlightRes) => {
          let depFlightSeats = req.body.depFlightSeats.split(',')
          let retFlightSeats = req.body.retFlightSeats.split(',')
          console.log('----------------------------------------')
          console.log(depFlightSeats)
          console.log(retFlightSeats)
          if (req.body.cabin === 'Economy') {
            for (let i = 0; i < depFlightSeats.length; i++) {
              depFlightRes.SeatsArrEconomy[depFlightSeats[i]] = true
              retFlightRes.SeatsArrEconomy[retFlightSeats[i]] = true
            }
            depFlightRes.EconomyNumOfSeats -= depFlightSeats.length
            retFlightRes.EconomyNumOfSeats -= retFlightSeats.length
          } else {
            for (let i = 0; i < depFlightSeats.length; i++) {
              depFlightRes.SeatsArrBusiness[depFlightSeats[i]] = true
              retFlightRes.SeatsArrBusiness[retFlightSeats[i]] = true
            }
            depFlightRes.BusinessNumOfSeats -= depFlightSeats.length
            retFlightRes.BusinessNumOfSeats -= retFlightSeats.length
          }
          depFlightRes
            .save()
            .then((result1) => {
              retFlightRes
                .save()
                .then((result2) => {
                  console.log('reservation made')
                  res.status(200).send('Success')
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

//depFlightNum retFlightNum cabin depFlightSeats retFlightSeats
exports.cancelFlight = (req, res) => {
  Flight.findOne({ FlightNumber: req.body.depFlightNum })
    .then((depFlightRes) => {
      Flight.findOne({ FlightNumber: req.body.retFlightNum })
        .then((retFlightRes) => {
          let depFlightSeats = req.body.depFlightSeats
          let retFlightSeats = req.body.retFlightSeats
          if (req.body.cabin === 'Economy') {
            for (let i = 0; i < depFlightSeats.length; i++) {
              depFlightRes.SeatsArrEconomy[depFlightSeats[i]] = false
              retFlightRes.SeatsArrEconomy[retFlightSeats[i]] = false
            }
            depFlightRes.EconomyNumOfSeats += depFlightSeats.length
            retFlightRes.EconomyNumOfSeats += retFlightSeats.length
          } else {
            for (let i = 0; i < depFlightSeats.length; i++) {
              depFlightRes.SeatsArrBusiness[depFlightSeats[i]] = false
              retFlightRes.SeatsArrBusiness[retFlightSeats[i]] = false
            }
            depFlightRes.BusinessNumOfSeats += depFlightSeats.length
            retFlightRes.BusinessNumOfSeats += retFlightSeats.length
          }
          depFlightRes
            .save()
            .then((result1) => {
              retFlightRes
                .save()
                .then((result2) => {
                  console.log('reservation cancelled')
                  res.status(200).send('Success')
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
