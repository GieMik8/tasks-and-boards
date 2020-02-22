import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import { Button } from '@material-ui/core'

import useStyles from './style'

const TasksColumnList = ({ children, onCreateColumn }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        {children}
        <div className={classes.addButtonWrapper}>
          <Button onClick={onCreateColumn} variant="outlined" color="secondary">
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

TasksColumnList.propTypes = {
  children: PropTypes.any,
  onCreateColumn: PropTypes.func,
}

TasksColumnList.defaultProps = {
  children: null,
  onCreateColumn: () => {},
}

export default TasksColumnList
