import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles({
  font: {
    fontFamily: '-webkit-pictograph',
    color: '#4B4747',
    marginLeft: '12vw',
  },

  order: {
    marginTop: isMobile ? '18vw' : '4vw',
  },

  quant: {
    marginBottom: '8vw',
  },
})

export default function ResHistory(props) {
  const classes = useStyles()

  return (
    <div className={classes.font}>
      <div className={classes.order} style={{ fontFamily: 'hel' }}>
        <h4>Order Number: </h4>
        <h4>Product:</h4>
        <h4>Size: </h4>
        <h4 className={classes.quant}>
          Quantity: 
        </h4>
      </div>
    </div>
  )
}
