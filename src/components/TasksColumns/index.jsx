import React from 'react'
import PropTypes from 'prop-types'

import useStyles from './style'

const TasksColumns = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

TasksColumns.propTypes = {
  children: PropTypes.any,
}

TasksColumns.defaultProps = {
  children: null,
}

export default TasksColumns
