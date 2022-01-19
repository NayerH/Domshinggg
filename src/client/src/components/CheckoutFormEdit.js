import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CardSection from './CardSection'
import axios from 'axios'

const seatsDep = window.localStorage.getItem('reservedSeatsDep')
const seatsRet = window.localStorage.getItem('reservedSeatsRet')
const fNumDep = parseInt(window.localStorage.getItem('depFlightNum'), 10)
const fNumRet = parseInt(window.localStorage.getItem('retFlightNum'), 10)
const cabin = window.localStorage.getItem('cabin')
const retD = window.localStorage.getItem('retDate')
const depD = window.localStorage.getItem('depDate')
const depAir = window.localStorage.getItem('from')
const retAir = window.localStorage.getItem('to')
const numOfPassengers = window.localStorage.getItem('numOfPassengers')
const priceDep = parseInt(window.localStorage.getItem('priceDep'), 10)
const priceRet = parseInt(window.localStorage.getItem('priceRet'), 10)
const totalPrice = numOfPassengers * (priceDep + priceRet)
window.localStorage.setItem('totalPrice', totalPrice)
var severityVar = ''

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function CheckoutFormEdit(props) {
  var headers = window.localStorage.getItem('token')
  const [open, setOpen] = React.useState(false)
  const [paymentFlag, setPaymentFlag] = React.useState(false)
  const [errorMessage, setError] = useState('')
  const [flag, setFlag] = React.useState(props.flag || false)
  const stripe = useStripe()
  const elements = useElements()
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  //cabinOld(cabinOld) cabinNew(cabinNew) flightNumOld(flightNumOld) flightNumNew(flightNumNew) oldSeats(oldSeats) newSeats(newSeats)
  async function handleBooking2() {
    console.log(window.localStorage.getItem('reservedSeatsRet'))
    await axios
      .post(
        'http://localhost:3000/editReservationFlight',
        {
          flightNumOld: parseInt(
            window.localStorage.getItem('flightNumOld'),
            10
          ),
          flightNumNew: parseInt(
            window.localStorage.getItem('flightNumNew'),
            10
          ),
          oldSeats: window.localStorage.getItem('oldSeats'),
          newSeats: window.localStorage.getItem('newSeats'),
          cabinOld: window.localStorage.getItem('cabinOld'),
          cabinNew: window.localStorage.getItem('cabinNew'),
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

  //reservationIndex(reservationIndex) departure(departure(true/false)) seats(newSeats) flightNumNew(flightNumNew) cabinNew(cabinNew) priceDifference(totalPriceDiff)
  async function handleBooking1() {
    await axios
      .post(
        'http://localhost:3000/editReservationUser',
        {
          flightNumNew: parseInt(
            window.localStorage.getItem('flightNumNew'),
            10
          ),
          cabinNew: window.localStorage.getItem('cabinNew'),
          seats: window.localStorage.getItem('newSeats'),
          priceDifference: parseInt(
            window.localStorage.getItem('totalPriceDiff'),
            10
          ),
          departure: window.localStorage.getItem('departure'),
          reservationIndex: window.localStorage.getItem('reservationIndex'),
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
  async function stripeTokenHandler(token) {
    const paymentData = { token: token.id, amount: totalPrice }

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch('http://localhost:3000/payForBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    // Return and display the result of the charge.
    //set payment flag--------------------------------------------------------
    setPaymentFlag(true)
    window.localStorage.setItem('flag', true)
    setFlag(true)
    return response.json()
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
      severityVar = 'warning'
      setError(result.error.message)
      handleClick()
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      let resJson = await stripeTokenHandler(result.token)
      console.log(resJson.error)
      if (resJson.status === 'succeeded') {
        console.log('SUCCESS PAYMENT')
        setError('SUCCESS PAYMENT')
        severityVar = 'success'
        handleBooking1()
        handleBooking2()
        handleClick()
        setTimeout(() => {
          handleClose()
          console.log('Timer done!')
          window.location = '/my-profile'
        }, 2000)
      } else {
        console.log('error', resJson.raw.message)
        severityVar = 'warning'
        setError(resJson.raw.message)
      }
      console.log(resJson.paid)
    }
  }
  return (
    <form style={{}} onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severityVar}
            sx={{ width: '100%' }}
            style={{ marginLeft: '5vw' }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <CardSection />

      <Button
        style={{ cursor: 'pointer', marginTop: '2vw', marginLeft: '7vw' }}
        variant='outlined'
        disabled={!stripe}
        onClick={(e) => {
          handleSubmit(e)
        }}
      >
        Confirm order
      </Button>
    </form>
  )
}
