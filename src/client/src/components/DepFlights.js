import React, { useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar, Typography } from '@material-ui/core'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FlightCard3 from './FlightCard3'
import Stack from '@mui/material/Stack'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const useStyles = makeStyles({
  root: {
    width: '98vw',
    height: '100vw',
  },
  card: {
    marginRight: '20vw',
  },
  disp: {
    display: 'flex',
    marginLeft: '2vw',
  },
  box: {
    width: '13vw',
  },
  date: {
    width: '17vw',
  },
  book: {
    marginLeft: '0vw',
    marginTop: '2vw',
  },
  flights: {
    marginLeft: '10vw',
    marginTop: '2vw',
  },
})

export default function DepFlights() {
  const classes = useStyles()
  const headers = window.localStorage.getItem('token')
  const [flightsArrayDep, setFlightsArrayDep] = React.useState([])
  const [flightsArrayRet, setFlightsArrayRet] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [depFlag, setDepFlag] = React.useState(false)
  const [retFlag, setRetFlag] = React.useState(false)
  const [finalFlag, setFinalFlag] = React.useState(false)
  const [adults, setAdults] = React.useState(0)
  const [children, setChildren] = React.useState(0)
  const [depAir, setDepAir] = React.useState('')
  const [arrAir, setArrAir] = React.useState('')
  const [depDate, setDepDate] = React.useState('')
  const [arrDate, setArrDate] = React.useState('')
  const [cabin, setCabin] = React.useState('')
  const [depFlight, setDepFlight] = React.useState('')
  const [retFlight, setRetFlight] = React.useState('')
  const [priceDep, setPriceDep] = React.useState(0)
  const [priceRet, setPriceRet] = React.useState(0)
  const [from, setFrom] = React.useState('')
  const [to, setTo] = React.useState('')

  const [bookingNumEdit, setBookingNumEdit] = React.useState(-1)
  const [numOfPassengersEdit, setNumOfPassengersEdit] = React.useState(-1)
  const [flightNumEdit, setFlightNumEdit] = React.useState(-1)
  const [depEdit, SetDepEdit] = React.useState('')
  const [retEdit, SetRetEdit] = React.useState('')
  const [depDateEdit, setDepDateEdit] = React.useState('')
  const [cabinEdit, setCabinEdit] = React.useState('')
  const [priceOld, setPriceOld] = React.useState(0)

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const handleSelected = (fNum) => {
    for (var i = 0; i < flightsArrayDep.length; i++) {
      if (flightsArrayDep[i].FlightNumber === fNum) {
        if (depFlag === false) {
          setDepFlag(true)
          setDepFlight(fNum)
          setPriceDep(flightsArrayDep[i].Price)
          setFrom(flightsArrayDep[i].From)
          setTo(flightsArrayDep[i].To)
          console.log('Done 1:' + fNum)
          window.localStorage.setItem('flightNumNew', fNum)
        } else {
          setDepFlag(false)
          setDepFlight('')
          console.log('Unselect 1 ' + fNum)
        }
      }
    }
    for (var i = 0; i < flightsArrayRet.length; i++) {
      if (flightsArrayRet[i].FlightNumber === fNum) {
        if (retFlag === false) {
          setRetFlag(true)
          setRetFlight(fNum)
          setPriceRet(flightsArrayRet[i].Price)
          console.log('Done 2 ' + fNum)
        } else {
          setRetFlag(false)
          console.log('Unselect 2 ' + fNum)
          setRetFlight('')
        }
      }
    }
  }
  const handleChangeChildren = (event) => {
    setChildren(event.target.value)
  }
  const handleChangeAdults = (event) => {
    setAdults(event.target.value)
  }
  const handleChangeDepAir = (event) => {
    setDepAir(event.target.value)
  }
  const handleChangeArrAir = (event) => {
    setArrAir(event.target.value)
  }
  const handleChangeDepDate = (event) => {
    setDepDate(event.target.value)
  }
  const handleChangeArrDate = (event) => {
    setArrDate(event.target.value)
  }
  const handleChangeCabin = (event) => {
    setCabin(event.target.value)
    window.localStorage.setItem('cabinNew', cabin)
    window.localStorage.setItem('cabinEdit', cabin)
  }
  const handleClickBook = () => {
    if (depFlag === true) {
      console.log(window.localStorage.getItem('numOfPassengers'))
      window.localStorage.setItem('depFlightNum', depFlight)
      window.localStorage.setItem('cabin', cabin)
      window.localStorage.setItem(
        'numOfPassengersEdit',
        window.localStorage.getItem('numOfPassengers')
      )
      window.localStorage.setItem('priceDiff', priceDep - priceOld)

      window.location = '/depSeats'
    } else {
      handleClick()
    }
  }
  const handleSearch = async (dep, arr, fDate, passengers, cab) => {
    const res = await axios
      .post(
        'http://localhost:3000/getFlightsUserEdit',
        {
          depAir: dep,
          arrAir: arr,
          flightDate: fDate,
          numOfPassengers: passengers,
          cabin: cab,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        setFlightsArrayDep(res.data.resFlights)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    axios
      .post('http://localhost:3000/findFlight', {
        flightNum: window.localStorage.getItem('flightNumEdit'),
      })
      .then((res) => {
        console.log(res.data.Price + 50)
        SetDepEdit(res.data.From)
        SetRetEdit(res.data.To)
        setNumOfPassengersEdit(window.localStorage.getItem('numOfPassengers'))
        setDepDateEdit(res.data.FlightDate)
        setCabinEdit(window.localStorage.getItem('cabin'))
        window.localStorage.setItem('cabinEdit', cabinEdit)
        setBookingNumEdit(window.localStorage.getItem('bookingNumEdit'))
        setPriceOld(res.data.Price)
        // console.log(res.data.Price)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <div className={classes.disp}>
        <div>
          <br />
          <h1>Search</h1>
          <br />
          <Typography>Cabin Class</Typography>
          <Box sx={{ width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Cabin</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cabin}
                label='cabin'
                onChange={handleChangeCabin}
              >
                <MenuItem value={'Economy'}>Economy</MenuItem>
                <MenuItem value={'Business'}>Business</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br /> <br />
          <Typography>Departure Date</Typography>
          <TextField
            required
            className={classes.box}
            id='outlined-basic'
            label=''
            onChange={handleChangeDepDate}
            type='date'
          />
          <br />
          <br />
          <Button
            variant='contained'
            onClick={() => {
              handleSearch(
                depEdit,
                retEdit,
                depDateEdit,
                numOfPassengersEdit,
                cabinEdit
              )
            }}
          >
            Search
          </Button>
        </div>
        <div className={classes.flights}>
          <h2>Departure Flights</h2>
          {flightsArrayDep.map((d) => (
            <FlightCard3
              handleSelected={handleSelected}
              fNum={d.FlightNumber}
              arrTime={d.ArrivalTime.toString().substring(11, 19)}
              depTime={d.DepartureTime.toString().substring(11, 19)}
              cabin={cabin}
              price={d.Price - priceOld}
              duration={d.TripDuration}
              baggage={d.Baggage}
              id={d._id}
              key={d._id}
            />
          ))}
          <div onClick={handleClickBook} className={classes.book}>
            <Button variant='contained'>Book</Button>
          </div>
        </div>
        <div className={classes.flights}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity='warning'
                sx={{ width: '100%' }}
              >
                Please select departure and return flights!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </div>
    </div>
  )
}
