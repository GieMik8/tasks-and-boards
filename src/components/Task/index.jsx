import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'

import useStyles from './style'

const Task = ({ id, title, index }) => {
  const classes = useStyles()

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{title}</h4>
        </div>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default Task
