import React from 'react'
import { useParams } from 'react-router'

import { useQuery } from 'hooks'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  const params = useParams()
  const query = useQuery()

  console.log({ query })

  return (
    <div className={classes.root}>
      <p>Board: {params.boardId}</p>
    </div>
  )
}
