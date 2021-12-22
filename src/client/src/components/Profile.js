import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NavBar from './NavBar'
import axios from 'axios'
import { Button } from '@material-ui/core'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const arr = [
  { reservation: 123, departure: 'BER', returnRes: 'CAI', price: 1000 },
  { reservation: 456, departure: 'LAX', returnRes: 'FRA', price: 2500 },
]
const useStyles = makeStyles({
  font: {
    fontFamily: '-webkit-pictograph',
    color: '#4B4747',
    marginLeft: '12vw',
  },

  order: {
    marginTop: '4vw',
  },

  quant: {
    marginBottom: '8vw',
  },
})

export default function Profile() {
  const classes = useStyles()
  const [button] = useState(-1)
  const headers = window.localStorage.getItem('token')
  const [type, setType] = useState(false)
  const [prevRes, setPrevRes] = useState([[]])
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [fullName, setFullName] = useState('')
  const [passportNum, setPassportNum] = useState('')
  const [username, setUsername] = useState('')
  const [bookings, setBookings] = useState([])

  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const handleChangeFullname = (event) => {
    setFullName(event.target.value)
  }
  const handleChangePassportNum = (event) => {
    setPassportNum(event.target.value)
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  useEffect(() => {
    if (window.localStorage.getItem('token') == 'undefined') {
      console.log('its null')
      window.location = '/'
    }
  }, [])

  useEffect(async () => {
    await axios
      .post(
        'http://localhost:3000/getUser',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        setFullName(res.data.Name)
        setPassportNum(res.data.passportNo)
        setUsername(res.data.username)
        setBookings(res.data.reservations)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  async function handleCancel1(pos) {
    await axios
      .post(
        'http://localhost:3000/cancelFlightUser',
        { index: pos },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function handleCancel2(
    DepartureFlightNum,
    DepartureFlightSeats,
    ReturnFlightNum,
    ReturnFlightSeats,
    Cabin
  ) {
    await axios
      .post(
        'http://localhost:3000/cancelFlight',
        {
          depFlightNum: DepartureFlightNum,
          depFlightSeats: DepartureFlightSeats,
          retFlightNum: ReturnFlightNum,
          retFlightSeats: ReturnFlightSeats,
          cabin: Cabin,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <h1 style={{ marginTop: '5vw', marginLeft: '10vw' }}>
            Reservations:-
          </h1>
          <div style={{ marginTop: '4vw', marginLeft: '10vw' }}>
            {bookings.map(
              (d, pos) => (
                <div>
                  <h4>Reservation Number: {d.bookingNo}</h4>
                  <h4>Departure Flight Number:{d.DepartureFlightNum}</h4>
                  <h4>Departure Flight Seats:{d.DepartureFlightSeats}</h4>
                  <h4>Return Flight Number:{d.ReturnFlightNum}</h4>
                  <h4>Return Flight Seats:{d.ReturnFlightSeats}</h4>
                  <h4>Price: {d.Price}</h4>
                  <h4>Cabin: {d.Cabin}</h4>

                  <Button onClick={handleOpen} variant='contained'>
                    {' '}
                    cancel booking
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              )

              // (<h4 className={classes.quant}>Price: {d.price}</h4>)
            )}

            <div style={{ marginTop: '-6vw' }}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                  >
                    Cancel Reservation
                  </Typography>
                  <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    Are you sure you want to cancel this reservation?
                  </Typography>
                  <br />
                  <Button
                    onClick={
                      (handleClose,
                      handleCancel1(pos),
                      handleCancel2(
                        d.DepartureFlightNum,
                        d.DepartureFlightSeats,
                        d.ReturnFlightNum,
                        d.ReturnFlightSeats,
                        d.Cabin
                      ))
                    }
                    style={{ marginLeft: '6vw' }}
                    variant='contained'
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleClose}
                    style={{ marginLeft: '5vw' }}
                    variant='contained'
                  >
                    No
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ marginTop: '5vw', marginLeft: '30vw' }}>Profile:-</h1>
          <div style={{ marginTop: '4vw', marginLeft: '30vw' }}>
            <h3>Full Name:{fullName}</h3>
            <h3>Passport Number:{passportNum}</h3>
            <h3>Username: {username}</h3>
            <Button
              onClick={handleOpen2}
              variant='contained'
              style={{ marginTop: '2vw', marginLeft: '15vw' }}
            >
              Edit Profile
            </Button>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style2}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Edit Profile
                </Typography>
                <TextField
                  id='outlined-basic'
                  label='Full Name'
                  variant='outlined'
                  onChange={handleChangeFullname}
                  style={{ marginTop: '1vw', marginBottom: '1vw' }}
                />
                <TextField
                  id='outlined-basic'
                  label='Passport Number'
                  variant='outlined'
                  onChange={handleChangePassportNum}
                  style={{ marginBottom: '1vw' }}
                />
                <TextField
                  id='outlined-basic'
                  label='Username'
                  variant='outlined'
                  onChange={handleChangeUsername}
                  style={{ marginBottom: '1vw' }}
                />
                <Button
                  variant='contained'
                  style={{ marginLeft: '5vw', marginTop: '5vw' }}
                  // onClick={handleEditUser}
                >
                  {' '}
                  save
                </Button>
              </Box>
            </Modal>
            <Box
              component='form'
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete='off'
            ></Box>
          </div>
        </div>
      </div>
    </div>
  )
}
