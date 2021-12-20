import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar } from '@material-ui/core'
import NavBar from '../components/NavBar'
import FlightCard from '../components/FlightCard'
import Box from '@mui/material/Box'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'

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
  },
  box: {
    width: '13vw',
  },
  date: {
    width: '17vw',
  },
})
export default function AddFlight() {
  const classes = useStyles()
  const [value, setValue] = React.useState(null)
  const headers = window.localStorage.getItem('token')

  const [change, setChange] = React.useState(false)
  const [flightsArray, setFlightsArray] = React.useState([])
  const [error, setError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [severityState, setSeverityState] = React.useState('')

  const [fNum, setFNum] = React.useState('')
  const [cityFrom, setCityFrom] = React.useState('')
  const [to, setTo] = React.useState('')
  const [fDate, setFDate] = React.useState('')
  const [arrTime, setArrTime] = React.useState('')
  const [depTime, setDepTime] = React.useState('')
  const [busSeats, setBusSeats] = React.useState('')
  const [ecoSeats, setEcoSeats] = React.useState('')

  const history = useHistory()
  const handleChangeTo = (event) => {
    setTo(event.target.value)
  }
  const handleChangeCityFrom = (event) => {
    setCityFrom(event.target.value)
  }
  const handleChangeArrTime = (event) => {
    setArrTime(event.target.value)
  }
  const handleChangeDepTime = (event) => {
    setDepTime(event.target.value)
  }
  const handleChangeBusSeats = (event) => {
    setBusSeats(event.target.value)
  }
  const handleChangeEcoSeats = (event) => {
    setEcoSeats(event.target.value)
  }
  const handleChangeFNum = (event) => {
    setFNum(event.target.value)
  }
  const handleChangeFDate = (event) => {
    setFDate(event.target.value)
  }
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (window.localStorage.getItem('token') === 'undefined') {
      console.log('its null')
      history.push('/')
    } else {
      axios
        .post(
          'http://localhost:3000/viewAllFlights',
          {},
          {
            headers: {
              token: headers,
            },
          }
        )
        .then((res) => {
          setFlightsArray(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [change])

  const handleSearch = async (cityFrom, to, fNum, fDate,arrTime,depTime,busSeats,ecoSeats) => {
    console.log(fDate);
    const res = await axios.post(
      'http://localhost:3000/searchFlight',
      {
        cityFrom: cityFrom,
        to: to,
        fNum: fNum,
        fDate: fDate,
        arrTime:arrTime,
        depTime:depTime,
        busSeats:busSeats,
        ecoSeats:ecoSeats
      },
      {
        headers: {
          token: headers,
        },
      }
    ).then((res) => {
      console.log(res.data);
      setFlightsArray(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
    //IDK
  }

  const handleAddFlightCard = async (cityFrom, to, fNum, fDate,arrTime,depTime,busSeats,ecoSeats) => {

    const res = await axios.post(
      'http://localhost:3000/createFlight',
      {
        to: to,
        cityFrom: cityFrom,
        fNum: fNum,
        fDate: fDate,
        arrTime:arrTime,
        depTime:depTime,
        busSeats:busSeats,
        ecoSeats:ecoSeats
      },
      {
        headers: {
          token: headers,
        },
      }
    ).then((res) => {
      console.log(res.data);
      console.log('flight added')
      if (res.data.error) {
        setSeverityState('warning')
        setError(res.data.error)
        handleClick()
        setOpen(true)
      }
      if (res.data.message) {
        setSeverityState('success')
        setError('Flight Added Succesfuly')
        handleClick()
        setOpen(true)
      }
      console.log(res);
      if (!res.error && !res.data.error) {
        setChange((prev) => !prev)
        console.log('adding', flightsArray)
      } else {
        console.log(res.data.error)
      }
      // var flArray = this.state.flightsArray;
      // flArray.add(res.data)
      // setFlightsArray(flArray)
      // console.log(res.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleDeleteFlightCard = async (id) => {
    const res = await axios.post(
      'http://localhost:3000/deleteFlight',
      {
        id:id
      },
      {
        headers: {
          token: headers,
        },
      }
    )
    console.log(res)
    setChange((prev) => !prev)
  }

  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className={classes.disp}>
        <div>
          <br />
          <h1>Search</h1>
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            label='To (e.g Cairo)'
            variant='outlined'
            onChange={handleChangeTo}
          />{' '}
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            onChange={handleChangeCityFrom}
            label='From (e.g Berlin)'
            variant='outlined'
          />
          <br />
          <br />
          <TextField
            required
            className={classes.box}
            id='outlined-basic'
            label='Flight Date'
            onChange={handleChangeFDate}
            type="date"
          />
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            onChange={handleChangeFNum}
            label='Flight Number'
            variant='outlined'
          />
          <br />
          <br />
          <TextField
            className={classes.box}
            id='outlined-basic'
            onChange={handleChangeArrTime}
            label='Arrival Time'
            variant='outlined'
          />
          <br />
          <br />
          <TextField
              className={classes.box}
              id='outlined-basic'
              onChange={handleChangeDepTime}
              label='Departure Time'
              variant='outlined'
            />
          <br />
          <br />
            <TextField
              className={classes.box}
              id='outlined-basic'
              onChange={handleChangeBusSeats}
              label='Business Seats'
              variant='outlined'
            />
            <br />
            <br />
              <TextField
                className={classes.box}
                id='outlined-basic'
                onChange={handleChangeEcoSeats}
                label='Economy Seats'
                variant='outlined'
              />
              <br />
              <br />
          <Button
            variant='contained'
            onClick={() => {
              handleSearch(cityFrom, to, fNum, fDate,arrTime,depTime,busSeats,ecoSeats)
            }}
          >
            Search
          </Button>
        </div>
        <div className={classes.root}>
          <div
            className={classes.background}
            style={{
              width: '100vw',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <FlightCard
              className={classes.root}
              new={true}
              handleAddFlightCard={handleAddFlightCard}
            />
          </div>
          <div
            style={{
              width: '100vw',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginTop: '3vw',
            }}
          >
            {flightsArray.map((d) => (
              <FlightCard
                handleDeleteFlightCard={handleDeleteFlightCard}
                to={d.To}
                cityFrom={d.From}
                fNum={d.FlightNumber}
                fDate={d.FlightDate.toString().substring(0,10)}
                arrTime={d.ArrivalTime.toString().substring(11,19)}
                depTime={d.DepartureTime.toString().substring(11,19)}
                busSeats={d.BusinessNumOfSeats}
                ecoSeats={d.EconomyNumOfSeats}
                id={d._id}
                new={false}
                key={d._id}
              />
            ))}
          </div>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert id='success' onClose={handleClose} severity={severityState}>
              {error}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}
