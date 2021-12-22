import React, { useEffect } from 'react'
import { Alert } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useState } from 'react'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright ©️ '}
      <Link color='inherit' href='https://www.instagram.com'>
        Domshing
      </Link>{' '}
      {new Date().getFullYear()}
      {''}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    marginTop: '-9.1vw',
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signinTitle: {
    marginTop: '8vw',
    marginBottom: '3vw',
  },
  email: {
    marginLeft: '0vw',
  },
  pass: {
    marginLeft: '0vw',
    marginBottom: '0.1vw',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginTop: '-1vw',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#e8f0fd',
    color: 'black',
  },
  fontColor: {
    color: 'black',
  },
  buttonStyle: {
    color: 'black',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `black !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'black !important',
  },
}))

export default function Confirmation() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')
  const [open, setOpen] = React.useState(false)
  const headers = window.localStorage.getItem('token')
  const [loginVisible, setLoginVisible] = useState('hidden')

  useEffect(() => {}, [])

  const handleClickConfirm = () => {
    console.log(window.localStorage.getItem('token'))
    if (window.localStorage.getItem('token') === 'undefined') {
      setLoginVisible('visible')
    } else {
      console.log('khara')
      //window.location = '/my-profile'
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const classes = useStyles()
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSignin = async (e) => {
    e.preventDefault()
    await axios
      .post(
        'http://localhost:3000/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          setError(res.data.message)
          setOpen(true)
          return
        }
        if (res.data.error) {
          setError(res.data.error)
          setOpen(true)
          return
        }

        window.localStorage.setItem('token', res.headers.token)
        window.localStorage.setItem('name', res.headers.name)
        window.location = '/my-profile'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
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
          onClick={() => {
            handleClickConfirm()
          }}
        >
          Confirm
        </Button>
      </div>
      <div style={{ visibility: loginVisible }}>
        <div className={classes.root}>
          <Container component='main' maxWidth='xs' color='white'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography
                component='h1'
                variant='h5'
                className={classes.signinTitle}
              >
                Sign in
              </Typography>

              <form className={classes.form} noValidate>
                <h4 className={classes.email}>Email*</h4>
                <TextField
                  className={classes['MuiInputBase-input']}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  color='black'
                  backgroundColor='black'
                  id='email'
                  onChange={emailChange}
                  name='email'
                  autoComplete='false'
                  autoFill='false'
                  autoFocus
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: 'numeric',
                  }}
                />
                <h4 className={classes.pass}>Password*</h4>
                <TextField
                  className={classes.inputText}
                  variant='outlined'
                  color='black'
                  margin='normal'
                  backgroundColor='black'
                  required
                  fullWidth
                  name='password'
                  onChange={passwordChange}
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    inputMode: 'numeric',
                  }}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='white'
                  className={classes.submit}
                  onClick={handleSignin}
                >
                  Sign In and confirm booking
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
            <br />
            <br />
            <br />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error'>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </div>
    </div>
  )
}
