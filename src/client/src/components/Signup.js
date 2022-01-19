import React from 'react'
import { Alert } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'
import NavBar from './NavBar'

function Copyright() {
  return (
    <Typography
      style={{ marginBottom: '3vw' }}
      variant='body2'
      color='textSecondary'
      align='center'
    >
      {'Copyright ©️ '}
      <Link color='inherit' href='https://www.instagram.com/kaos.eg/'>
        KAOS
      </Link>{' '}
      {new Date().getFullYear()}
      {''}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '99vw',
    height: '70vw',
    marginTop: '-5vw',
  },
  signupTitle: {
    marginTop: '8vw',
    marginBottom: '2vw',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '-3vw',
  },
  signinTitle: {
    marginTop: '8vw',
    marginBottom: '3vw',
  },
  email: {
    marginLeft: '-21vw',
  },
  pass: {
    marginLeft: '1vw',
    marginBottom: '1vw',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: '-1vw',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#e8f0fd',
    color: 'black',
    marginTop: '1vw',
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

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [passNum, setPassNum] = useState('')
  const [errorMessage, setError] = useState('')
  const [sign, setsign] = useState(false)
  const [route, setRoute] = useState(false)
  const classes = useStyles()
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

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
    console.log(password)
  }

  const firstNameChange = (e) => {
    setFirstName(e.target.value)
    console.log(firstName)
  }

  const lastNameChange = (e) => {
    setLastName(e.target.value)
    console.log(lastName)
  }

  const addressChange = (e) => {
    setAddress(e.target.value)
    console.log(address)
  }

  const phoneNoChange = (e) => {
    setPhoneNo(e.target.value)
    console.log(phoneNo)
  }

  const codeChange = (e) => {
    setCode(e.target.value)
    console.log(code)
  }

  const passNumChange = (e) => {
    setPassNum(e.target.value)
    console.log(passNum)
  }
  const history = useHistory()

  const handleSignup = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:3000/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        address: address,
        code: code,
        passNum: passNum,
      })
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          setError(res.data.message)
          setOpen(true)
          setsign(true)
          setRoute(false)
        } else if (res.data.error) {
          setError(res.data.error)
          handleClick()
          setOpen(true)
          setsign(true)
          setRoute(false)
        } else {
          console.log('routeedddd')
          history.push('/login')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className={classes.root}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography
              component='h1'
              variant='h5'
              className={classes.signupTitle}
            >
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <h4 className={classes.pass}>First Name* </h4>

                  <TextField
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    onChange={firstNameChange}
                    fullWidth
                    id='firstName'
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h4 className={classes.pass}>Last Name*</h4>

                  <TextField
                    variant='outlined'
                    required
                    onChange={lastNameChange}
                    fullWidth
                    id='lastName'
                    name='lastName'
                    autoComplete='lname'
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
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.pass}>Email*</h4>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    value={email}
                    onChange={emailChange}
                    name='email'
                    autoComplete='email'
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
                  <Grid item xs={12}>
                    <h4 className={classes.pass}>Password*</h4>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      value={password}
                      onChange={passwordChange}
                      name='password'
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

                    <h4 className={classes.pass}>Phone Number*</h4>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='phoneNo'
                      value={phoneNo}
                      onChange={phoneNoChange}
                      name='phoneNo'
                      autoComplete='phoneNo '
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
                    <h4 className={classes.pass}>Home Address*</h4>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='address'
                      value={address}
                      onChange={addressChange}
                      name='address'
                      autoComplete='address '
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
                    <h4 className={classes.pass}>Country Code*</h4>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='code'
                      value={code}
                      onChange={codeChange}
                      name='code'
                      autoComplete='code '
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
                    <h4 className={classes.pass}>Passport Number*</h4>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='passNum'
                      value={passNum}
                      onChange={passNumChange}
                      name='passNum'
                      autoComplete='passNum '
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
                  </Grid>
                </Grid>
              </Grid>

              <Button
                style={{ marginTop: '3vw' }}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/' variant='body2' className={classes.fontColor}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </div>
  )
}
