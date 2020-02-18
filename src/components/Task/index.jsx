import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

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
          <div className={classes.body}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="subtitle2">{description}</Typography>
          </div>
          <div className={classes.footer}>
            <IconButton size="small" onClick={onEdit} color="secondary" aria-label="Edit">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} aria-label="Delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
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
