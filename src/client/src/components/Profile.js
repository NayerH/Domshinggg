import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Button } from '@material-ui/core'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

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
const stylePass = {
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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
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
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [username, setUsername] = useState('')
  const [bookings, setBookings] = useState([])
  const [chosenPos, setChosenPos] = useState(0)
  const [departureFlightNum, setDepartureFlightNum] = useState(0)
  const [departureFlightSeats, setDepartureFlightSeats] = useState('')
  const [returnFlightNum, setReturnFlightNum] = useState(0)
  const [returnFlightSeats, setReturnFlightSeats] = useState('')
  const [cabin, setCabin] = useState('')
  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)
  const [open3, setOpen3] = React.useState(false)
  const [openPass, setOpenPass] = React.useState(false)
  const handleOpenPass = () => setOpenPass(true)
  const handleClosePass = () => setOpenPass(false)

  const handleClick3 = () => {
    setOpen3(true)
  }
  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen3(false)
  }
  const handleChangeFullname = (event) => {
    setFullName(event.target.value)
  }
  const handleChangeOldPass = (event) => {
    setOldPass(event.target.value)
  }
  const handleChangeNewPass = (event) => {
    setNewPass(event.target.value)
  }
  const handleDepSeats = () => {
    window.location = '/depSeats'
  }
  const handleRetSeats = () => {
    window.location = '/retSeats'
  }
  const handleDepFlights = (
    bookingNoEdit,
    depFlightNumEdit,
    depFlightSeatsEdit,
    PriceEdit,
    CabinEdit
  ) => {
    console.log('my seats:', depFlightSeatsEdit)
    var depPassengers = depFlightSeatsEdit.split(',')
    window.localStorage.setItem('bookingNumEdit', bookingNoEdit)
    window.localStorage.setItem('flightNumEdit', depFlightNumEdit)
    window.localStorage.setItem('numOfPassengers', depPassengers.length)
    window.localStorage.setItem('oldSeats', depFlightSeatsEdit)
    window.localStorage.setItem('price', PriceEdit)
    window.localStorage.setItem('cabin', CabinEdit)
    window.location = '/depFlights'
  }
  const handleRetFlights = () => {
    window.location = '/retFlights'
  }
  const handleChangePassportNum = (event) => {
    setPassportNum(event.target.value)
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  useEffect(() => {
    if (window.localStorage.getItem('token') === 'undefined') {
      console.log('its null')
      window.location = '/'
    }
  }, [])
  const handleEmailConfirmation = (resNum) => {
    axios
      .post(
        'http://localhost:3000/emailItinerary',
        {
          reservationNumber: resNum,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        handleClick3()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    axios
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
        // console.log(res.data)
        setFullName(res.data.Name)
        setPassportNum(res.data.passportNo)
        setUsername(res.data.username)
        setBookings(res.data.reservations)
        console.log('Bookings', res.data.reservations)
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
        console.log(res.data)
        setBookings(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleEditUser() {
    axios
      .post(
        'http://localhost:3000/updateUser',
        {
          Name: fullName,
          passportNo: passportNum,
          username: username,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res)
        handleClose2()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleChangePassword() {
    axios
      .post(
        'http://localhost:3000/updatePassword',
        {
          oldPassword: oldPass,
          newPassword: newPass,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res)
        handleClosePass()
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
              (d, index) => (
                <div>
                  <h4 style={{ fontSize: '20px' }}>
                    Reservation Number: {d.bookingNo}
                  </h4>
                  <div style={{ display: 'flex' }}>
                    <h4 style={{ fontSize: '20px' }}>
                      Departure Flight Number:{d.DepartureFlightNum}
                    </h4>
                    <Button
                      onClick={() => {
                        handleDepFlights(
                          d.bookingNo,
                          d.DepartureFlightNum,
                          d.DepartureFlightSeats,
                          d.Price,
                          d.Cabin
                        )
                      }}
                      style={{
                        marginLeft: '2vw',
                        width: '1vw',
                        height: '2vw',
                        marginTop: '1.4vw',
                      }}
                      variant='contained'
                    >
                      edit1
                    </Button>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <h4 style={{ fontSize: '20px' }}>
                      Departure Flight Seats:{d.DepartureFlightSeats}
                    </h4>
                    <Button
                      onClick={() => {
                        handleDepSeats()
                      }}
                      style={{
                        marginLeft: '2vw',
                        width: '1vw',
                        height: '2vw',
                        marginTop: '1.4vw',
                      }}
                      variant='contained'
                    >
                      edit
                    </Button>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <h4 style={{ fontSize: '20px' }}>
                      Return Flight Number:{d.ReturnFlightNum}
                    </h4>
                    <Button
                      onClick={() => {
                        handleRetFlights()
                      }}
                      style={{
                        marginLeft: '2vw',
                        width: '1vw',
                        height: '2vw',
                        marginTop: '1.4vw',
                      }}
                      variant='contained'
                    >
                      edit
                    </Button>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <h4 style={{ fontSize: '20px' }}>
                      Return Flight Seats:{d.ReturnFlightSeats}
                    </h4>
                    <Button
                      onClick={() => {
                        handleRetSeats()
                      }}
                      style={{
                        marginLeft: '2vw',
                        width: '1vw',
                        height: '2vw',
                        marginTop: '1.4vw',
                      }}
                      variant='contained'
                    >
                      edit
                    </Button>
                  </div>
                  <h4 style={{ fontSize: '20px' }}>Price: {d.Price}</h4>
                  <h4 style={{ fontSize: '20px' }}>Cabin: {d.Cabin}</h4>

                  <Button
                    style={{ marginTop: '4vw' }}
                    onClick={() => {
                      console.log(index)
                      handleOpen()
                      setCabin(d.Cabin)
                      setDepartureFlightNum(d.DepartureFlightNum)
                      setReturnFlightNum(d.ReturnFlightNum)
                      setDepartureFlightSeats(d.DepartureFlightSeats)
                      setReturnFlightSeats(d.ReturnFlightSeats)
                      setChosenPos(index)
                    }}
                    variant='contained'
                  >
                    {' '}
                    cancel booking
                  </Button>
                  <Button
                    onClick={() => {
                      handleEmailConfirmation(d.bookingNo)
                    }}
                    style={{
                      marginLeft: '2vw',
                      marginTop: '4vw',
                    }}
                    variant='contained'
                  >
                    Send itinerary confirmation
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
                    onClick={() => {
                      handleClose()
                      handleCancel1(chosenPos)
                      handleCancel2(
                        departureFlightNum,
                        departureFlightSeats,
                        returnFlightNum,
                        returnFlightSeats,
                        cabin
                      )
                    }}
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
          <h1 style={{ marginTop: '5vw', marginLeft: '15vw' }}>Profile:-</h1>
          <div style={{ marginTop: '4vw', marginLeft: '15vw' }}>
            <h3>Full Name:{fullName}</h3>
            <h3>Passport Number:{passportNum}</h3>
            <h3>Username: {username}</h3>
            <Button
              onClick={handleOpen2}
              variant='contained'
              style={{ marginTop: '2vw', marginLeft: '0vw' }}
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleOpenPass}
              variant='contained'
              style={{ marginTop: '2vw', marginLeft: '1vw' }}
            >
              Change Password
            </Button>

            <Modal
              open={openPass}
              onClose={handleClosePass}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style2}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Change Password
                </Typography>
                <TextField
                  id='outlined-basic'
                  label='Old Password'
                  variant='outlined'
                  onChange={handleChangeOldPass}
                  style={{ marginTop: '1vw', marginBottom: '1vw' }}
                />
                <TextField
                  id='outlined-basic'
                  label='New Password'
                  variant='outlined'
                  onChange={handleChangeNewPass}
                  style={{ marginBottom: '1vw' }}
                />

                <Button
                  variant='contained'
                  style={{ marginLeft: '5vw', marginTop: '5vw' }}
                  onClick={handleChangePassword}
                >
                  {' '}
                  save
                </Button>
              </Box>
            </Modal>

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
                  onClick={handleEditUser}
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
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar
                open={open3}
                autoHideDuration={2000}
                onClose={handleClose3}
              >
                <Alert
                  onClose={handleClose}
                  severity='success'
                  sx={{ width: '100%' }}
                >
                  Email itinerary sent!
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}
