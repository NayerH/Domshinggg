import React, { useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'
import { isMobile } from 'react-device-detect'

let count = [
  {
    isDone: true,
    name: 'Todo 1',
  },
]

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

export default function FlightCard(props) {
  const history = useHistory()

  useEffect(() => {
    if (window.localStorage.getItem('token') === 'undefined') {
      history.push('/')
    }
  }, [])
  const classes = useStyles()
  const [from, setFrom] = React.useState(props.from || '')
  const [to, setTo] = React.useState(props.to || '')
  const [fDate, setFDate] = React.useState(props.fDate || '')
  const [cabin, setCabin] = React.useState(props.cabin || '')
  const [fNum, setFNum] = React.useState(props.fNum || '')

  const [id, setId] = React.useState(-1)
  const [edit, setEdit] = React.useState(false)
  const [error, setError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [severityState, setSeverityState] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)

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

  const handleChangeFrom = (event) => {
    setFrom(event.target.value)
  }
  const handleChangeTo = (event) => {
    setTo(event.target.value)
  }
  const handleChangeFDate = (event) => {
    setFDate(event.target.value)
  }
  const handleChangeCabin = (event) => {
    setCabin(event.target.value)
  }
  const handleChangeFNum = (event) => {
    setFNum(event.target.value)
  }

  const headers = window.localStorage.getItem('token')

  const handleEditFlightCard = async (from, to, cabin, fNum, fDate) => {
    const res = await axios.post(
      'http://localhost:5000/flight/editFlight',
      {
        from: from,
        to: to,
        cabin: cabin,
        fNum: fNum,
        fDate: fDate,
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
          props.handleDeleteFlightCard(props.from)
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
                          <TextField
                            required
                            disabled={!props.new && !edit}
                            className={classes.from}
                            id='standard-password-input'
                            label='From'
                            value={from}
                            onChange={handleChangeFrom}
                          />
                          <TextField
                            required
                            disabled={!props.new && !edit}
                            className={classes.to}
                            id='standard-password-input'
                            label='To'
                            value={to}
                            onChange={handleChangeTo}
                          />

                          <TextField
                            required
                            disabled={!props.new && !edit}
                            className={classes.cabin}
                            id='standard-password-input'
                            label='Cabin'
                            value={cabin}
                            onChange={handleChangeCabin}
                          />
                          <TextField
                            required
                            disabled={!props.new && !edit}
                            className={classes.fNum}
                            id='standard-password-input'
                            label='Flight Number'
                            value={fNum}
                            onChange={handleChangeFNum}
                          />
                          <br />
                          <br />
                          <TextField
                            required
                            disabled={!props.new && !edit}
                            className={classes.fDate}
                            id='standard-password-input'
                            label='Flight Date'
                            value={fDate}
                            onChange={handleChangeFDate}
                          />

                          <br />
                          <br />
                          <IconButton
                            className={classes.button}
                            disabled={!props.new && !edit}
                            onClick={() => {
                              if (props.new) {
                                props.handleAddFlightCard(
                                  from,
                                  to,
                                  fDate,
                                  cabin,
                                  fNum
                                )
                                setFrom('')
                                setTo('')
                                setFDate('')
                                setCabin('')
                                setFNum('')
                              } else {
                                handleEditFlightCard(
                                  from,
                                  to,
                                  cabin,
                                  fNum,
                                  fDate
                                )
                                setFrom(from)
                                setTo(to)
                                setFDate(fDate)
                                setCabin(cabin)
                                setFNum(fNum)
                                setId(id)
                                setEdit(false)
                              }
                            }}
                            edge='end'
                            aria-label='save'
                          >
                            <SaveIcon />
                          </IconButton>

                          <IconButton
                            disabled={props.new}
                            className={classes.button}
                            onClick={() => {
                              handleOpenModal()
                            }}
                            edge='end'
                            aria-label='delete'
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            disabled={props.new}
                            className={classes.button}
                            onClick={() => {
                              setEdit(true)
                            }}
                            edge='end'
                            aria-label='edit'
                            onChange={handleEditFlightCard}
                          >
                            <EditIcon />
                          </IconButton>
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
