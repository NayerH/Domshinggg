import React from 'react'
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
import { useHistory } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright ©️ '}
      <Link color='inherit' href='https://www.instagram.com/kaos.eg/'>
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

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')
  const [open, setOpen] = React.useState(false)

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
  const history = useHistory()
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleSignin = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:3000/login', {
        email: email,
        password: password,
      })
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

        // window.localStorage.setItem('token', res.headers.authtoken)
        // window.localStorage.setItem('name', res.headers.name)

        history.push('/home')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <NavBar />
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
                Sign In
              </Button>
            </form>
          </div>
          <Box mt={8}>
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
