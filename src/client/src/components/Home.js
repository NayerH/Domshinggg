import React from 'react'
import NavBar from './NavBar'
import { useEffect } from 'react'
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar } from '@material-ui/core'
import FlightCard from '../components/FlightCard'
import Box from '@mui/material/Box'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FlightCard2 from './FlightCard2'

const arr = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']

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
  const [error, setError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [depFlag, setDepFlag] = React.useState(false)
  const [retFlag, setRetFlag] = React.useState(false)
  const [finalFlag, setFinalFlag] = React.useState(false)
  const [numOfPass, setNumOfPass] = React.useState(0)
  const [depAir, setDepAir] = React.useState('')
  const [arrAir, setArrAir] = React.useState('')
  const [depDate, setDepDate] = React.useState('')
  const [arrDate, setArrDate] = React.useState('')
  const [cabin, setCabin] = React.useState('')

  const handleChangeCabin = (event) => {
    setCabin(event.target.value)
  }

  const handleSelected = (fNum) => {
    for (var i = 0; i < departure.length; i++) {
      if (depFlag === false) {
        if (departure[i].fNum === 123) {
          setDepFlag(true)
          console.log('Done 1')
        }
      }
    }
    for (var i = 0; i < ret.length; i++) {
      if (retFlag === false) {
        if (ret[i].fNum === 321) {
          setRetFlag(true)
          console.log('Done 2')
        }
      }
    }
    if (depFlag === true && retFlag === true) {
      setFinalFlag(true)
    }
    setDepFlag(false)
    setRetFlag(false)
  }

  const handleChangeNumOfPass = (event) => {
    setNumOfPass(event.target.value)
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

  const handleClick = () => {
    setOpen(true)
  }

  const handleButton = () => {
    const result = arr.filter((flight) => flight.length === 9)
    if (result.length === 0) {
      console.log('not found')
    } else {
      console.log('found')
    }
  }

  const handleSearch = async (
    numOfPass,
    depAir,
    arrAir,
    cabin,
    depDate,
    arrDate
  ) => {
    const res = await axios
      .post(
        'http://localhost:3000/searchFlight',
        {
          numOfPass: numOfPass,
          depAir: depAir,
          arrAir: arrAir,
          cabin: cabin,
          depDate: depDate,
          arrDate: arrDate,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        setFlightsArrayDep(res.data.departureFlights)
        setFlightsArrayRet(res.data.returnFlights)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div style={{ marginTop: '-1vw', marginLeft: '-2vw', width: '101vw' }}>
        <NavBar />
      </div>
      <div className={classes.disp}>
        <div>
          <br />
          <h1>Search</h1>
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            label='Number Of Passengers'
            variant='outlined'
            onChange={handleChangeNumOfPass}
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
                <MenuItem value={10}>Economy</MenuItem>
                <MenuItem value={20}>Business</MenuItem>
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
          <h4>Arrival Date</h4>
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
              handleSearch(numOfPass, depAir, arrAir, cabin, depDate, arrDate)
            }}
          >
            Search
          </Button>
        </div>
        <div className={classes.flights}>
          <h2>Departure Flights</h2>
          <FlightCard2 handleSelected={handleSelected} />
          {/* {flightsArrayDep.map((d) => (
            <FlightCard2
              handleSelected={handleSelected}
              fNum={d.fNum}
              arrTime={d.ArrivalTime.toString().substring(11, 19)}
              depTime={d.DepartureTime.toString().substring(11, 19)}
              cabin={d.cabin}
              price={d.price}
              id={d._id}
              key={d._id}
            />
          ))} */}
        </div>
        <div className={classes.flights}>
          <h2>Return Flights</h2>
          <FlightCard2 handleSelected={handleSelected} />
          {/* {flightsArrayRet.map((d) => (
            <FlightCard2
              handleSelected={handleSelected}
              fNum={d.fNum}
              arrTime={d.ArrivalTime.toString().substring(11, 19)}
              depTime={d.DepartureTime.toString().substring(11, 19)}
              cabin={d.cabin}
              price={d.price}
              id={d._id}
              key={d._id}
            />
          ))} */}
          <div className={classes.book}>
            <Button disabled={!finalFlag} variant='contained'>
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
