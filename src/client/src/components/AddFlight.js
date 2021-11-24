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
  const [to, setTo] = React.useState('')
  const [from, setFrom] = React.useState('')
  const [cabin, setCabin] = React.useState('')
  const [fNum, setFNum] = React.useState('')
  const [fDate, setFDate] = React.useState('')

  const handleChangeTo = (event) => {
    setTo(event.target.value)
  }
  const handleChangeFrom = (event) => {
    setFrom(event.target.value)
  }
  const handleChangeCabin = (event) => {
    setCabin(event.target.value)
  }
  const handleChangeFNum = (event) => {
    setFNum(event.target.value)
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
    axios
      .post(
        'http://localhost:5000/flight/viewAllFlights',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        setFlightsArray(res.data.displayedFlights)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const handleSearch = async (from, to, cabin, fNum, fDate) => {
    const res = await axios.post(
      'http://localhost:5000/flight/searchFlight',
      {
        from: from,
        to: to,
        cabin: cabin,
        fNum: fNum,
        fDate: fDate,
      },
      {
        headers: {
          token: headers,
        },
      }
    )
    //IDK
  }

  const handleAddFlightCard = async (from, to, fNum, cabin, fDate) => {
    console.log('flight added')
    const res = await axios.post(
      'http://localhost:5000/flight/createFlight',
      {
        to: to,
        from: from,
        cabin: cabin,
        fNum: fNum,
        fDate: fDate,
      },
      {
        headers: {
          token: headers,
        },
      }
    )
    console.log(res.config.data)

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

    if (res.data.statusCode === 0) {
      setChange((prev) => !prev)
    }
    if (res.data.statusCode === 1) {
      console.log(res.data.error)
    }
    console.log('adding', flightsArray)
  }

  const handleDeleteFlightCard = async (to, from, cabin, fDate, fNum) => {
    const res = await axios.post(
      'http://localhost:5000/flight/deleteFlight',
      { to: to, from: from, cabin: cabin, fNum: fNum, fDate: fDate },
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
            onChange={handleChangeFrom}
            label='From (e.g Berlin)'
            variant='outlined'
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Departure date'
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={params?.inputProps?.placeholder}
                />
              )}
            />
          </LocalizationProvider>
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
            onChange={handleChangeCabin}
            label='Cabin'
            variant='outlined'
          />
          <br />
          <br />
          <Button
            variant='contained'
            onClick={() => {
              handleSearch()
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
                to={d.to}
                from={d.from}
                cabin={d.cabin}
                fNum={d.fNum}
                fDate={d.fDate}
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
