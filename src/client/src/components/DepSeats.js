import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles'
import { formControlClasses } from '@mui/material'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import axios from 'axios'
import { Typography } from '@material-ui/core'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const fNumDep = parseInt(window.localStorage.getItem('depFlightNum'), 10)
const cabin = window.localStorage.getItem('cabin')
const count = window.localStorage.getItem('numOfPassengersEdit')
const oldSeatsArr = window.localStorage.getItem('oldSeats').split(',')

var clicksDep = 0

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: '#8D9CE9',
    width: '8vw',
    height: '5vw',
    border: 'white',
    borderRadius: 5,
    cursor: 'pointer',
  },
  unav: {
    backgroundColor: '#A0A0A0',
    width: '8vw',
    height: '5vw',
    border: 'white',
    borderRadius: 5,
  },
  old: {
    backgroundColor: '#FFF14C',
    width: '8vw',
    height: '5vw',
    border: 'white',
    borderRadius: 5,
  },
  av: {
    backgroundColor: '#269334',
    width: '8vw',
    height: '5vw',
    border: 'white',
    borderRadius: 5,
  },
}))

export default function DepSeats() {
  const classes = useStyles()
  const [reservedArrayDep, setReservedArrayDep] = React.useState([])
  const [reservedArrayRet, setReservedArrayRet] = React.useState([])
  const [done, setDone] = React.useState(false)
  const [seatsDep, setSeatsDep] = React.useState(false)
  const [seatsRet, setSeatsRet] = React.useState(false)
  const [dep, setDep] = React.useState([])
  const [ret, setRet] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const headers = window.localStorage.getItem('token')
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const handleSelectDep = (e, index) => {
    var reservedArrayTemp = reservedArrayDep
    var isAlreadySelected = false
    var k = 0

    for (k; k < reservedArrayTemp.length; k++) {
      //to check whether this room is already selected or not
      if (reservedArrayTemp[k].seatNumber === index) {
        isAlreadySelected = true
        break
      }
    }
    //to unselect a seat
    if (isAlreadySelected && clicksDep != 0) {
      reservedArrayTemp.splice(k, 1)

      e.target.className = classes.av
      console.log('Unselecting')
      console.log(reservedArrayDep)
      clicksDep--
      if (clicksDep == count) {
        setSeatsDep(true)
        console.log('DONE')
        window.localStorage.setItem('reservedSeatsDep', reservedArrayDep)
      }
      return
    }
    //first selection
    if (clicksDep === 0) {
      console.log('1st Selection')
      reservedArrayTemp.push(index)
      e.target.className = classes.selected
      clicksDep++
      setReservedArrayDep(reservedArrayTemp)
      console.log(reservedArrayDep)
      console.log('clicks:', clicksDep, 'count:', count)
      if (clicksDep == count) {
        setSeatsDep(true)
        console.log('DONE')
        window.localStorage.setItem('reservedSeatsDep', reservedArrayDep)
      }
      return
    }
    //not first selection
    if (clicksDep < count) {
      console.log('not first selection')
      reservedArrayTemp.push(index)
      e.target.className = classes.selected
      clicksDep++
      setReservedArrayDep(reservedArrayTemp)
      console.log(reservedArrayDep)
      console.log('clicks tany:', clicksDep, 'count:', count)

      if (clicksDep == count) {
        setSeatsDep(true)
        console.log('DONE')
        window.localStorage.setItem('reservedSeatsDep', reservedArrayDep)
      }
      return
    }
  }
  const handleClickSeats = () => {
    if (seatsDep) {
      window.location = '/confirmationDep'
    } else {
      handleClick()
    }
  }
  useEffect(async () => {
    await axios
      .post(
        'http://localhost:3000/findFlight',
        { flightNum: window.localStorage.getItem('depFlightNum') },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log('Flight: ', res.data)
        if (cabin === 'Economy') {
          console.log('All Seats:', res.data.SeatsArrEconomy)
          setDep(res.data.SeatsArrEconomy)
        } else {
          console.log('All Seats:', res.data.SeatsArrBusiness)
          setDep(res.data.SeatsArrBusiness)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div>
      <br />
      <br />
      <div
        style={{
          marginTop: '1vw',
          width: '50vw',
          marginLeft: '23vw',
          td: {
            border: '1px solid #ccc',
          },
          table: {
            fontSize: '15px',
          },
        }}
      >
        <div>
          <div>
            <h1 style={{ marginLeft: '12vw', marginTop: '1vw' }}>
              Choose Your Departure Seats
            </h1>
            <Typography style={{ marginLeft: '17vw', marginTop: '1vw' }}>
              *Yellow seats are your old seats*
            </Typography>
          </div>
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginTop: '1vw',
            }}
          >
            {dep.map((seat, index) => {
              // console.log('my old seats:', oldSeatsArr)
              if (seat === true) {
                var i = 0
                for (i; i < oldSeatsArr.length; i++) {
                  if (parseInt(oldSeatsArr[i], 10) == index) {
                    return (
                      <div style={{ marginLeft: '1vw', marginTop: '0.5vw' }}>
                        <Button
                          onClick={(e) => {
                            handleSelectDep(e, index)
                          }}
                          className={classes.old}
                        >
                          your seat
                        </Button>
                      </div>
                    )
                  }
                }
                return (
                  <div style={{ marginLeft: '1vw', marginTop: '0.5vw' }}>
                    <Button className={classes.unav} disabled>
                      reserved
                    </Button>
                  </div>
                )
              }
              if (seat === false) {
                return (
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '1vw',
                      marginTop: '0.5vw',
                    }}
                  >
                    <Button
                      className={classes.av}
                      onClick={(e) => {
                        handleSelectDep(e, index)
                      }}
                    ></Button>
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div>
          <br />
          <br />
        </div>
        <div>
          <Button
            onClick={handleClickSeats}
            variant='contained'
            style={{
              marginLeft: '40vw',
            }}
          >
            Continue
          </Button>
          <br />
          <br />
          <br />
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity='warning'
                sx={{ width: '100%' }}
              >
                Please select all seats!
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      </div>
    </div>
  )
}
