import React from 'react'

import useStyles from './style'

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p>Home</p>
    </div>
  )
}
