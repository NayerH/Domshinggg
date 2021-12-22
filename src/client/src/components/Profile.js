import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import NavBar from './NavBar'
import AccountDetails from './AccountDetails'
import ResHistory from './ResHistory'
import axios from 'axios'
import Divider from '@mui/material/Divider'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    height: '55vw',
  },
  accountDetails: {
    marginLeft: isMobile ? '-78vw' : '8vw',
    marginTop: isMobile ? '20vw' : '0vw',
  },
  kaosStores: {
    marginBottom: '4vw',
    fontFamily: '-webkit-pictograph',
    color: '#4B4747',
    marginTop: '5vw',
    marginLeft: '12vw',
    fontSize: isMobile ? '12vw' : '2vw',
  },
  orderHistory: {
    marginTop: isMobile ? '100vw' : '4vw',
    fontFamily: '-webkit-pictograph',
    color: '#4B4747',
    marginLeft: '12vw',
  },

  divider: {
    marginLeft: isMobile ? '5vw' : '58vw',
    marginTop: isMobile ? '7vw' : '2vw',
    width: isMobile ? '10vw' : '40vw',
  },
})

export default function Profile() {
  const classes = useStyles()
  const history = useHistory()
  const [button] = useState(-1)
  const headers = window.localStorage.getItem('token')
  const [type, setType] = useState(false)
  const [prevOrders, setPrevOrders] = useState([[]])

  var name
  useEffect(() => {
    name = window.localStorage.getItem('name')
    console.log(window.localStorage.getItem('token'))
    if (button === 1) {
      history.push('/todolist')
    } else if (button === 0) {
      history.push('/notes')
    }
    if (window.localStorage.getItem('token') == 'undefined') {
      console.log('its null')
      history.push('/')
    }
  }, [button])
  useEffect(() => {
    axios
      .post(
        'http://localhost:5000/order/viewAllOrders',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log('kharaaaaa')
        for (let i = 0; i < res.data.displayedOrders.length; i++) {
          setPrevOrders(res.data.displayedOrders)
          console.log(res.data.displayedOrders[i])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [type])

  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <div>
          <h1 className={classes.kaosStores}>Kaos Stores</h1>
          <h2 className={classes.orderHistory}>Order History</h2>
          {prevOrders.map((d) => (
            <ResHistory className={classes.oneOrder} displayedOrders={d} />
          ))}
        </div>

        <div className={classes.accountDetails}>
          <AccountDetails />
        </div>
      </div>
    </div>
  )
}
