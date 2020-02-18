import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

import useStyles from './style'

export default () => {
  const classes = useStyles()
  const boardsList = useSelector(state => state.app.get('boards'))
  const boardsById = useSelector(state => state.app.getIn(['entities', 'boards']))
  return (
    <div className={classes.root}>
      <Typography variant="h5">Boards</Typography>
      <List component="nav" className={classes.list} aria-label="contacts">
        {boardsList.map(board => (
          <Link key={board} to={`/boards/${board}`}>
            <ListItem button>
              <ListItemText primary={boardsById.getIn([board, 'title'])} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
}
