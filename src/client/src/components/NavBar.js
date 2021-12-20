import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import { isMobile } from 'react-device-detect'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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

  const handleChange = (event) => {
    setColl(event.target.value)
  }

  const [productsArray, setProductsArray] = React.useState([])
  const [type] = useState(false)
  const history = useHistory()
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
        <Button
          style={{ marginLeft: '5vw', marginTop: '1vw', marginBottom: '1vw' }}
          onClick={handleShop}
        >
          Shop
        </Button>

        <br />
        <Button
          style={{ marginLeft: '5vw', marginTop: '1vw', marginBottom: '1vw' }}
          onClick={handleContactUs}
        >
          Contact Us
        </Button>
        <br />
        <Button
          style={{ marginLeft: '5vw', marginTop: '1vw', marginBottom: '1vw' }}
          onClick={handleMyAccount}
        >
          My Profile
        </Button>
      </div>
    </Box>
  )

  // useEffect(() => {
  //   if (type === false) {
  //     axios
  //       .post('http://localhost:5000/product/viewAllProducts', {}, {})
  //       .then((res) => {
  //         setProductsArray(res.data.displayedProducts)
  //         props.setData(res.data.displayedProducts)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }
  // }, [type])

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
          history.push('/')
        } else {
          //DISPLAY ERROR
        }
      })
  }
  const classes = useStyles()
  const handleHome = (e) => {
    e.preventDefault()
    window.location = '/home'
  }
  const handleShop = (e) => {
    e.preventDefault()
    window.location = '/collection'
  }
  const handleContactUs = (e) => {
    e.preventDefault()
    window.location = '/contact-us'
  }
  const handleMyAccount = (e) => {
    e.preventDefault()
    window.location = '/my-profile'
  }
  const handleMyCart = (e) => {
    e.preventDefault()
    window.location = '/my-cart'
  }
  const handleAddProduct = (e) => {
    e.preventDefault()
    window.location = '/add-product'
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
              onClick={signout}
              style={{
                visibility: 'visible',
                fontSize: '1vw',
                marginRight: '3vw',
                width: '8vw',
              }}
            >
              Sign out
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
