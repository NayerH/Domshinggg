import React, { useEffect } from 'react'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SaveIcon from '@mui/icons-material/Save'
import Modal from '@mui/material/Modal'
import { isMobile } from 'react-device-detect'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const useStyles = makeStyles({
  accountDetailsDiv: {
    fontFamily: '-webkit-pictograph',
    color: '#4B4747',
    marginLeft: '15vw',
    marginTop: '12vw',
  },
})

export default function AccountDetails() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState(false)
  const headers = window.localStorage.getItem('token')
  const [myAddress, setMyAddress] = React.useState('')
  const [phoneNum, setPhoneNum] = React.useState('')
  const [name, setName] = React.useState('')
  const [mail, setMail] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleChangeMyAddress = (event) => {
    setMyAddress(event.target.value)
  }

  const handleChangePhoneNum = (event) => {
    setPhoneNum(event.target.value)
  }
  const handleClose = () => {
    axios
      .post(
        'http://localhost:5000/account/editProfile',
        {
          email: mail,
          phoneNo: phoneNum,
          address: myAddress,
        },
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log('editing profile')
      })
      .catch((error) => {
        console.log(error)
      })
    setOpen(false)
  }

  useEffect(() => {
    axios
      .post(
        'http://localhost:5000/account/getProfile',
        {},
        {
          headers: {
            token: headers,
          },
        }
      )
      .then((res) => {
        console.log('getting profile')
        setName(
          (
            res.data.myProfile.firstName +
            ' ' +
            res.data.myProfile.lastName
          ).toUpperCase()
        )
        setMyAddress(res.data.myProfile.address)
        setPhoneNum(res.data.myProfile.phoneNo)
        setMail(res.data.myProfile.email)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [type])

  return (
    <div className={classes.accountDetailsDiv}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} style={{ width: isMobile ? '65vw' : '20vw' }}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{ marginBottom: isMobile ? '7vw' : '2vw' }}
          >
            Edit your profile
          </Typography>
          <TextField
            id='outlined-basic'
            label='Address'
            variant='outlined'
            onChange={handleChangeMyAddress}
          />
          <h1></h1>
          <TextField
            id='outlined-basic'
            label='Phone Number'
            variant='outlined'
            style={{ marginBottom: '3vw' }}
            onChange={handleChangePhoneNum}
          />
          <IconButton>
            <SaveIcon
              style={{ marginLeft: isMobile ? '50vw' : '2vw' }}
              onClick={handleClose}
            />
          </IconButton>
        </Box>
      </Modal>
      <h2>Account Details</h2>
      <h3 style={{ marginTop: '3.5vw' }}>{name}</h3>
      <div style={{ fontFamily: 'hel' }}>
        <h4>{myAddress.toUpperCase()}</h4>
        <h4>CAIRO, EGYPT</h4>
        <h4>{phoneNum}</h4>
        <IconButton>
          <EditIcon onClick={handleOpen} />
        </IconButton>
      </div>
    </div>
  )
}
