import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { isMobile } from 'react-device-detect'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: isMobile ? '100vw' : '100%',
  },
  title: {
    flexGrow: '5',
    marginLeft: isMobile ? '-2vw' : '5vw',
    fontWeight: 'bold',
    fontSize: isMobile ? '6vw' : '1.7vw',
    color: 'black',
    cursor: 'pointer',
  },
  backColor: {
    backgroundColor: 'white',
    height: '5vw',
  },
  user: {
    marginLeft: isMobile ? '0vw' : '2vw',
    height: isMobile ? '-0vw' : '3vw',
    width: isMobile ? '-0vw' : '3vw',
  },
  b: {
    width: isMobile ? '3vw' : '4vw',
    fontSize: isMobile ? '3vw' : '1vw',
    marginLeft: isMobile ? '-5vw' : '2vw',
    marginRight: isMobile ? '0vw' : '2vw',
  },
  signout: {
    backgroundColor: 'white',
  },
  image: {
    width: isMobile ? '-0vw' : '5vw',
    height: '5vw',
  },
  type: {
    marginRight: isMobile ? '-8vw' : '76vw',
    fontSize: isMobile ? '0vw' : '1vw',
    marginLeft: isMobile ? '-15vw' : '2vw',
    marginTop: isMobile ? '1vw' : '0vw',

    whiteSpace: 'nowrap',
  },
  singoutSection: {
    marginLeft: isMobile ? '-15vw' : '-50vw',
    height: 'auto',
    width: 'auto',
    marginTop: '1vw',
  },
  position: {
    width: '5vw',
  },
})

export default function NavBar(props) {
  const [coll, setColl] = React.useState('')
  const [loggedIn, setLoggedIn] = useState('')
  const [loggedOut, setLoggedOut] = useState('')

  useEffect(() => {
    if (window.localStorage.getItem('token') === 'undefined') {
      setLoggedIn('none')
      setLoggedOut('')
    } else {
      setLoggedIn('')
      setLoggedOut('none')
    }
  }, [loggedIn, loggedOut])
  const handleChange = (event) => {
    setColl(event.target.value)
  }

  const [productsArray, setProductsArray] = React.useState([])
  const [type] = useState(false)
  const [state, setState] = React.useState({
    right: false,
  })
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const headers = window.localStorage.getItem('token')
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      open = true
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <Button
          style={{ marginLeft: '5vw', marginTop: '20vw', marginBottom: '1vw' }}
          onClick={handleHome}
        >
          Home
        </Button>
        <br />

        <br />

        <br />
      </div>
    </Box>
  )
  const signin = async () => {
    window.location = '/login'
  }
  const signout = async () => {
    await axios
      .post(
        'http://localhost:3000/logout',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 0) {
          window.localStorage.setItem('token', 'undefined')
          window.location = '/'
        } else {
        }
      })
  }
  const classes = useStyles()
  const handleHome = (e) => {
    e.preventDefault()
    window.location = '/'
  }
  const handleProfile = (e) => {
    e.preventDefault()
    window.location = '/my-profile'
  }

  return (
    <div className={classes.root}>
      <AppBar id='navbar' position='static' className={classes.backColor}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='white'
            aria-label='menu'
          >
            {' '}
          </IconButton>
          <h1 variant='h5' className={classes.title} onClick={handleHome}>
            Domshing
          </h1>
          <div className={classes.type}></div>
          <div className={classes.singoutSection}>
            <Button
              id='signout'
              color='black'
              onClick={handleProfile}
              style={{
                display: loggedIn,
                fontSize: '1vw',
                marginRight: '3vw',
                width: '8vw',
                marginTop: '2vw',
                marginLeft: '-10vw',
              }}
            >
              Profile
            </Button>
            <Button
              id='signout'
              color='black'
              onClick={signout}
              style={{
                display: loggedIn,
                fontSize: '1vw',
                marginRight: '3vw',
                width: '8vw',
                marginTop: '-5vw',
                marginRight: '5vw',
              }}
            >
              SIGN OUT
            </Button>
            <Button
              id='signout'
              color='black'
              onClick={signin}
              style={{
                display: loggedOut,
                fontSize: '1vw',
                marginRight: '3vw',
                width: '8vw',
                marginTop: '-5vw',
                marginRight: '5vw',
              }}
            >
              SIGN IN
            </Button>

            {['Menu'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  style={{
                    visibility: isMobile ? 'visible' : 'hidden',
                    fontSize: isMobile ? '3vw' : '1vw',
                    width: isMobile ? '25vw' : '1vw',
                    marginRight: '-8vw',
                  }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  {anchor}{' '}
                </Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
