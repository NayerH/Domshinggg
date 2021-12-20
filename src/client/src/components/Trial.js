import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  begad: {
    marginLeft: '15vw',
    marginTop: '15vw',
  },
  fady: {
    marginLeft: '5vw',
  },
})

export default function Trial() {
  const classes = useStyles()

  return (
    <div className={classes.begad}>
      <div>
        <Stack spacing={2} direction='row'>
          <Button variant='text'>nadim</Button>
        </Stack>
      </div>
      <div>
        <h5>nadim</h5>
      </div>
    </div>
  )
}
