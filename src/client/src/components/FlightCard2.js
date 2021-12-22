import React, { useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

let count = [
  {
    isDone: true,
    name: 'Todo 1',
  },
]

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}))

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    width: '29.5vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '1.5vw',
    marginLeft: '1vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 1vw',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '2vw',
  },
  pos: {
    marginBottom: '2vw',
  },

  note: {
    width: '25vw',
    height: '10vw',
  },
  button: {
    float: 'right',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlignLast: 'center',
    marginLeft: '36vw',
    marginTop: '17vw',
  },
  colorRed: {
    color: 'red',
  },
  marginBetween: {
    marginLeft: '4vw',
  },
}))

export default function FlightCard2(props) {
  const classes = useStyles()
  const [cityFrom, setCityFrom] = React.useState(props.cityFrom || '')
  const [to, setTo] = React.useState(props.to || '')
  const [fDate, setFDate] = React.useState(props.fDate || '')
  const [fNum, setFNum] = React.useState(props.fNum || '')
  const [price, setPrice] = React.useState(props.price || '')
  const [arrTime, setArrTime] = React.useState(props.arrTime || '')
  const [depTime, setDepTime] = React.useState(props.depTime || '')
  const [cabin, setCabin] = React.useState(props.cabin || '')
  const [baggage, setBaggage] = React.useState(props.baggage || '')
  const [duration, setDuration] = React.useState(props.duration || '')
  const [id, setId] = React.useState(-1)
  const [edit, setEdit] = React.useState(false)
  const [error, setError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [severityState, setSeverityState] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

  const [anchorElDet, setAnchorElDet] = React.useState(null)
  const openDet = Boolean(anchorElDet)
  const handleClickDet = (event) => {
    setAnchorElDet(event.currentTarget)
  }
  const handleCloseDet = () => {
    setAnchorElDet(null)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const headers = window.localStorage.getItem('token')

  const handleEditFlightCard = async (data) => {
    const res = await axios.post(
      'http://localhost:3000/editFlight',
      {
        data: data,
      },
      {
        headers: {
          token: headers,
        },
      }
    )
    if (res.data.error) {
      setSeverityState('warning')
      setError(res.data.error)
      handleClick()
      setOpen(true)
    } else {
      setSeverityState('success')
      setError('saved succesfuly')
      handleClick()
      setOpen(true)
    }

    setEdit(false)
  }

  const body = (
    <div className={classes.paper}>
      <h3 id='simple-modal-title'>Delete a flight</h3>
      <p id='simple-modal-description'>
        Are you sure you want to delete this flight?
      </p>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          props.handleDeleteFlightCard(props.id)
        }}
      >
        yes
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={classes.marginBetween}
        onClick={() => {
          handleCloseModal()
        }}
      >
        no
      </Button>
    </div>
  )

  return (
    <div>
      <div className={classes.allroot}>
        <Modal open={openModal} onClose={handleCloseModal}>
          {body}
        </Modal>

        <List className={classes.root}>
          {[0].map((value) => {
            return (
              <>
                {count.map((elem) => {
                  return (
                    <>
                      <Card className={classes.root}>
                        <CardContent>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() => {
                                  props.handleSelected(props.fNum)
                                }}
                                {...label}
                              />
                            }
                            label='Select Flight'
                          />

                          <br />
                          <br />
                          <TextField
                            disabled
                            className={classes.fNum}
                            id='standard-password-input'
                            label='Flight Number'
                            value={fNum}
                          />
                          <br />
                          <TextField
                            disabled
                            className={classes.depTime}
                            id='standard-password-input'
                            label='Departure Time  '
                            value={depTime}
                          />

                          <TextField
                            disabled
                            className={classes.arrTime}
                            id='standard-password-input'
                            label='Arrival Time '
                            value={arrTime}
                          />
                          <TextField
                            disabled
                            className={classes.cabin}
                            id='standard-password-input'
                            label='Cabin'
                            value={cabin}
                          />
                          <TextField
                            disabled
                            className={classes.fNum}
                            id='standard-password-input'
                            label='Price (EGP)'
                            value={price}
                          />
                          <br />

                          <br />
                          <br />
                          <Button
                            id='demo-positioned-button'
                            aria-controls='demo-positioned-menu'
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickDet}
                          >
                            View Flight Details
                          </Button>
                          <Menu
                            id='demo-positioned-menu'
                            aria-labelledby='demo-positioned-button'
                            anchorEl={anchorElDet}
                            open={openDet}
                            onClose={handleCloseDet}
                            style={{ width: '100vw' }}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <TextField
                              disabled
                              className={classes.fNum}
                              id='standard-password-input'
                              label='Baggage'
                              value={baggage}
                            />
                            <br />
                            <TextField
                              disabled
                              className={classes.fNum}
                              id='standard-password-input'
                              label='Trip Duration'
                              value={duration}
                            />
                            <br />
                          </Menu>
                        </CardContent>
                      </Card>
                    </>
                  )
                })}
                {props.new ? <ListItem></ListItem> : <div></div>}
              </>
            )
          })}
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severityState}>
              {error}
            </Alert>
          </Snackbar>
        </List>
      </div>
    </div>
  )
}
