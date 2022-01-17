import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CardSection from './CardSection'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function CheckoutForm(props) {
  const totalPrice = window.localStorage.getItem('totalPrice')

  const [open, setOpen] = React.useState(false)
  const [paymentFlag, setPaymentFlag] = React.useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const stripe = useStripe()
  const elements = useElements()

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
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      let resJson = await stripeTokenHandler(result.token)
      console.log(resJson.paid)
    }
  }

  return (
    <form
      style={{ marginLeft: '25%', width: '50%', marginTop: '15vw' }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button variant='outlined' onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
      <CardSection />

      <Button
        style={{ cursor: 'pointer' }}
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
