import React from 'react'
import NavBar from './NavBar'
import { useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar } from '@material-ui/core'
import FlightCard from '../components/FlightCard'
import Box from '@mui/material/Box'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FlightCard2 from './FlightCard2'
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
    marginLeft: '26vw',
    marginTop: '2vw',
  },
  flights: {
    marginLeft: '10vw',
    marginTop: '2vw',
  },
})
const cabin = ''
var clicksDep = 0
var clicksArr = 0
const departure = [
  {
    fNum: 123,
    DepartureTime: '15:00',
    ArrivalTime: '20:00',
    CabinClass: 'Economy',
    Price: '1000',
    TripDuration: '5h 0min',
    BaggageAllowance: '2',
  },
  {
    fNum: 456,
    DepartureTime: '16:00',
    ArrivalTime: '20:00',
    CabinClass: 'Economy',
    Price: '2000',
    TripDuration: '4h 0min',
    BaggageAllowance: '2',
  },
]
const ret = [
  {
    fNum: 789,
    DepartureTime: '1:00',
    ArrivalTime: '2:00',
    CabinClass: 'Economy',
    Price: '3000',
    TripDuration: '2h 0min',
    BaggageAllowance: '1',
  },
  {
    fNum: 321,
    DepartureTime: '4:00',
    ArrivalTime: '6:00',
    CabinClass: 'Economy',
    Price: '1000',
    TripDuration: '2h 0min',
    BaggageAllowance: '1',
  },
]

export default function Home() {
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
  const [disable, setDisable] = React.useState(true)

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
          console.log('Done 1:' + fNum)
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
  }
  const handleClickBook = () => {
    if (depFlag === true && retFlag === true) {
      window.location = '/chooseSeats'
    } else {
      handleClick()
    }
  }
  const handleSearch = async (
    adults,
    children,
    depAir,
    arrAir,
    cabin,
    depDate,
    arrDate
  ) => {
    const res = await axios
      .post(
        'http://localhost:3000/searchFlightUser',
        {
          depAir: depAir,
          arrAir: arrAir,
          depDate: depDate,
          arrDate: arrDate,
          children: children,
          adults: adults,
          cabin: cabin,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        setDepFlag(false)
        setRetFlag(false)
        console.log(res.data.cabin)
        setFlightsArrayDep(res.data.depFlights)
        setFlightsArrayRet(res.data.arrFlights)
        cabin = res.data.cabin
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className={classes.disp}>
        <div>
          <br />
          <h1>Search</h1>
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            label='Number Of Adults'
            variant='outlined'
            onChange={handleChangeAdults}
          />{' '}
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            label='Number Of Children'
            variant='outlined'
            onChange={handleChangeChildren}
          />{' '}
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            onChange={handleChangeDepAir}
            label='Departure Airport'
            variant='outlined'
          />
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            onChange={handleChangeArrAir}
            label='Arrival Airport'
            variant='outlined'
          />
          <br />
          <br />
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
          <h4>Departure Date</h4>
          <TextField
            required
            className={classes.box}
            id='outlined-basic'
            label=''
            onChange={handleChangeDepDate}
            type='date'
          />
          <h4>Return Date</h4>
          <TextField
            required
            className={classes.box}
            id='outlined-basic'
            label=''
            onChange={handleChangeArrDate}
            type='date'
          />
          <br />
          <br />
          <Button
            variant='contained'
            onClick={() => {
              handleSearch(
                adults,
                children,
                depAir,
                arrAir,
                cabin,
                depDate,
                arrDate
              )
            }}
          >
            Search
          </Button>
        </div>
        <div className={classes.flights}>
          <h2>Departure Flights</h2>
          {/* <FlightCard2 handleSelected={handleSelected} /> */}
          {flightsArrayDep.map((d) => (
            <FlightCard2
              handleSelected={handleSelected}
              fNum={d.FlightNumber}
              arrTime={d.ArrivalTime.toString().substring(11, 19)}
              depTime={d.DepartureTime.toString().substring(11, 19)}
              cabin={cabin}
              price={d.Price}
              duration={d.TripDuration}
              baggage={d.Baggage}
              id={d._id}
              key={d._id}
            />
          ))}
        </div>
        <div className={classes.flights}>
          <h2>Return Flights</h2>
          {/* <FlightCard2 handleSelected={handleSelected} /> */}
          {flightsArrayRet.map((d) => (
            <FlightCard2
              handleSelected={handleSelected}
              fNum={d.FlightNumber}
              arrTime={d.ArrivalTime.toString().substring(11, 19)}
              depTime={d.DepartureTime.toString().substring(11, 19)}
              cabin={cabin}
              price={d.Price}
              duration={d.TripDuration}
              baggage={d.Baggage}
              id={d._id}
              key={d._id}
            />
          ))}
          <div onClick={handleClickBook} className={classes.book}>
            <Button variant='contained'>Book</Button>
          </div>
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
