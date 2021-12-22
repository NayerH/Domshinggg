import React from 'react'
import NavBar from './NavBar'
import Button from '@mui/material/Button'

export default function Confirmation() {
  return (
    <div>
      <div style={{ marginTop: '-1vw', marginLeft: '-2vw', width: '101vw' }}>
        <NavBar />
      </div>
      <div>
        <h1 style={{ textAlign: '-webkit-center', marginTop: '3vw' }}>
          Booking Confirmation
        </h1>
        <br />
        <br />
        <br />
        <br />

        <div style={{ marginLeft: '20vw' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <h1>Departure Details</h1>
              <br />
              <h2>Flight Number: </h2>
              <h2>Departure Airport: </h2>
              <h2>Departure Date: </h2>
              <h2>Departure Duration: </h2>
            </div>
            <div style={{ marginLeft: '15vw' }}>
              <h1>Return Details</h1>
              <br />
              <h2>Flight Number: </h2>
              <h2>Return Airport: </h2>
              <h2>Return Date: </h2>
              <h2>Return Duration: </h2>
            </div>
          </div>
          <br />
          <br />
          <h2>Cabin: </h2>
          <h2>Total Price: </h2>
        </div>
        <br />
        <br />
        <br />
        <Button
          style={{ marginLeft: '80vw', marginTop: '-6vw' }}
          variant='contained'
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
