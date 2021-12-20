import React from 'react'
import Button from '@material-ui/core/Button'
import NavBar from './NavBar'
import { makeStyles } from '@material-ui/core/styles'
import { formControlClasses } from '@mui/material'

const count = 2
var clicks = 0
const arr = [
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

  const handleSelect = (e, index) => {
    var reservedArrayTemp = reservedArray
    var isAlreadySelected = false
    var k = 0

    if (clicks === count) {
      setDone(true)
    }

    for (k; k < reservedArrayTemp.length; k++) {
      //to check whether this room is already selected or not
      if (reservedArrayTemp[k].seatNumber === index) {
        isAlreadySelected = true
        break
      }
    }
    //to unselect a seat
    if (isAlreadySelected && clicks != 0) {
      reservedArrayTemp.splice(k, 1)
      // setReservedArray(
      //   reservedArray.filter((element) => element.seatNumber != index)
      // )
      e.target.className = classes.av
      console.log('Unselecting')
      console.log(reservedArray)
      clicks--
      return
    }
    //first selection
    if (clicks === 0) {
      console.log('1st Selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicks++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      return
    }
    //not first selection
    if (clicks < count) {
      console.log('not first selection')
      reservedArrayTemp.push({ seatNumber: index })
      e.target.className = classes.selected
      clicks++
      setReservedArray(reservedArrayTemp)
      console.log(reservedArray)
      // console.log('You picked seat number', index + 1)
      return
    }
  }
  return (
    <div>
      <div style={{ marginTop: '-1vw', marginLeft: '-2vw', width: '101vw' }}>
        <NavBar />
      </div>
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
          <h1 style={{ marginLeft: '19vw', marginTop: '1vw' }}>Flight Seats</h1>
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
          {arr.map((seat, index) => {
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
                      handleSelect(e, index)
                    }}
                  ></Button>
                </div>
              )
            }
          })}
        </div>
      </div>
      {/* {
      if(done===true)
      {
        <Button
          style={{
            backgroundColor: '#7A7B7D ',
            marginLeft: '21vw',
            marginTop: '3vw',
            width: '7vw',
            height: '3vw',
          }}
        >
          Continue
        </Button>
      } */}
    </div>
  )
}

// <React.Fragment>
//   <Button
//     style={{
//       backgroundColor: 'grey',
//       width: '7vw',
//       height: '5vw',
//       marginLeft: '7vw',
//       marginTop: '0.5vw',
//     }}
//   ></Button>
// </React.Fragment>
