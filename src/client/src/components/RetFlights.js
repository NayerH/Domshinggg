import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar } from '@material-ui/core'
import Box from '@mui/material/Box'
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
    marginLeft: '0vw',
    marginTop: '2vw',
  },
  flights: {
    marginLeft: '10vw',
    marginTop: '2vw',
  },
})

export default function RetFlights() {
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
  }
  const handleClickBook = () => {
    if (depFlag === true && retFlag === true) {
      // console.log(depFlight + ' ' + retFlight)
      // console.log(window.localStorage.getItem('depFightNum'))
      window.localStorage.setItem('depFlightNum', depFlight)
      window.localStorage.setItem('retFlightNum', retFlight)
      window.localStorage.setItem('cabin', cabin)
      window.localStorage.setItem('depDate', depDate)
      window.localStorage.setItem('retDate', arrDate)
      window.localStorage.setItem('from', from)
      window.localStorage.setItem('to', to)
      window.localStorage.setItem('priceDep', priceDep)
      window.localStorage.setItem('priceRet', priceRet)

      const numOfPassengers = parseInt(adults, 10) + parseInt(children, 10)
      window.localStorage.setItem('numOfPassengers', numOfPassengers)
      //window.localStorage.setItem('price', price)

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
      .post('http://localhost:3000/searchFlightUser', {
        depAir: depAir,
        arrAir: arrAir,
        depDate: depDate,
        arrDate: arrDate,
        children: children,
        adults: adults,
        cabin: cabin,
      })
      .then((res) => {
        setDepFlag(false)
        setRetFlag(false)
        setFlightsArrayDep(res.data.depFlights)
        setFlightsArrayRet(res.data.arrFlights)
        setCabin(res.data.cabin)
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
          <h2>Return Flights</h2>
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
