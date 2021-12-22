import React from 'react'
import Button from '@material-ui/core/Button'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles'
import { formControlClasses } from '@mui/material'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const count = 2
var clicksDep = 0
var clicksRet = 0

const dep = [
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
]
const ret = [
  false,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
]

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: '#8D9CE9',
    width: '8vw',
    height: '5vw',
    border: 'white',
    borderRadius: 5,
  },
  unav: {
    backgroundColor: '#A0A0A0',
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

export default function Seats() {
  const classes = useStyles()
  const [reservedArray, setReservedArray] = React.useState([])
  const [done, setDone] = React.useState(false)
  const [seatsDep, setSeatsDep] = React.useState(false)
  const [seatsRet, setSeatsRet] = React.useState(false)
  const [open, setOpen] = React.useState(false)

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
    var reservedArrayTemp = reservedArray
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
      // setReservedArray(
      //   reservedArray.filter((element) => element.seatNumber != index)
      // )
      e.target.className = classes.av
      console.log('Unselecting')
      console.log(reservedArray)
      clicksDep--
      if (clicksDep === count) {
        setSeatsDep(true)
        console.log('DONE')
      }
      return
    }
    //first selection
    if (clicksDep === 0) {
      console.log('1st Selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicksDep++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      if (clicksDep === count) {
        setSeatsDep(true)
        console.log('DONE')
      }
      return
    }
    //not first selection
    if (clicksDep < count) {
      console.log('not first selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicksDep++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      if (clicksDep === count) {
        setSeatsDep(true)
        console.log('DONE')
      }
      return
    }
  }
  const handleSelectRet = (e, index) => {
    var reservedArrayTemp = reservedArray
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
    if (isAlreadySelected && clicksRet != 0) {
      reservedArrayTemp.splice(k, 1)
      // setReservedArray(
      //   reservedArray.filter((element) => element.seatNumber != index)
      // )
      e.target.className = classes.av
      console.log('Unselecting')
      console.log(reservedArray)
      clicksRet--
      if (clicksRet === count) {
        setSeatsRet(true)
        console.log('DONE 2')
      }

      return
    }
    //first selection
    if (clicksRet === 0) {
      console.log('1st Selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicksRet++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      if (clicksRet === count) {
        setSeatsRet(true)
        console.log('DONE 2')
      }

      return
    }
    //not first selection
    if (clicksRet < count) {
      console.log('not first selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicksRet++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      if (clicksRet === count) {
        setSeatsRet(true)
        console.log('DONE 2')
      }

      return
    }
  }
  const handleClickSeats = () => {
    if (seatsRet && seatsDep) {
      window.location = '/confirmation'
    } else {
      handleClick()
    }
  }
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
              if (seat === false) {
                return (
                  <div style={{ marginLeft: '1vw', marginTop: '0.5vw' }}>
                    <Button className={classes.unav} disabled>
                      reserved
                    </Button>
                  </div>
                )
              }

              if (seat === true) {
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
        <br />
        <br />
        <div>
          <div>
            <h1 style={{ marginLeft: '14vw', marginTop: '1vw' }}>
              Choose Your Return Seats
            </h1>
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
            {ret.map((seat, index) => {
              if (seat === false) {
                return (
                  <div style={{ marginLeft: '1vw', marginTop: '0.5vw' }}>
                    <Button className={classes.unav} disabled>
                      reserved
                    </Button>
                  </div>
                )
              }

              if (seat === true) {
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
                        handleSelectRet(e, index)
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
          <br />
          <br />
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
