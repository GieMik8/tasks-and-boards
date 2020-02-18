import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { Typography, Button } from '@material-ui/core'

import useStyles from './style'

const Task = ({ id, title, description, index, onEdit, onDelete }) => {
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
          <Typography variant="h6">{title}</Typography>
          <Typography>{description}</Typography>
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Task.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
}

export default Task
