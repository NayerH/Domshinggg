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
  //tokin
  var name
  useEffect(() => {
    name = window.localStorage.getItem('name')
    console.log(window.localStorage.getItem('token'))

    if (window.localStorage.getItem('token') == 'undefined') {
      console.log('its null')
      window.location = '/'
    }
  }, [button])
  //useEffect to get all reservations
  useEffect(() => {
    axios
      .post(
        'http://localhost:5000/order/viewAllOrders',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        //to loop 3ala el orders kolaha
        for (let i = 0; i < res.data.displayedOrders.length; i++) {
          setPrevRes(res.data.displayedOrders)
          console.log(res.data.displayedOrders[i])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [type])

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <h1 style={{ marginTop: '5vw', marginLeft: '10vw' }}>
            Reservations:-
          </h1>
          <div style={{ marginTop: '4vw', marginLeft: '10vw' }}>
            {arr.map(
              (d) => (
                <div>
                  <h4>Reservation Number: {d.reservation}</h4>
                  <h4>Departure:{d.departure}</h4>
                  <h4>Returnnn: {d.returnRes}</h4>
                  <h4>Price: {d.price}</h4>
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
                    onClick={handleClose}
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
            <h3>Full Name:</h3>
            <h3>Passport Number:</h3>
            <h3>Username:</h3>
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
