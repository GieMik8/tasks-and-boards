import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import { Button } from '@material-ui/core'

import useStyles from './style'

const TasksColumns = ({ children, onCreateColumn }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        {children}
        <Button onClick={onCreateColumn} variant="outlined" color="secondary">
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}

TasksColumns.propTypes = {
  children: PropTypes.any,
  onCreateColumn: PropTypes.func,
}

TasksColumns.defaultProps = {
  children: null,
  onCreateColumn: () => {},
}

export default TasksColumns
