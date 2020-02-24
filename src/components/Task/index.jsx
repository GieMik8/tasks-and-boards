import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

import { openModal } from 'modules/ui'
import { deleteTask as deleteTaskAction } from 'modules/tasks'
import { modalType } from 'types'
import useStyles from './style'

const Task = ({ id, index }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const task = useSelector(state => state.tasks.getIn(['entities', 'tasks', id]))

  const editTask = useCallback(
    () => dispatch(openModal({ target: modalType.TASK_EDIT, params: { id } })),
    [dispatch, id],
  )

  const deleteTask = useCallback(() => dispatch(deleteTaskAction(id)), [dispatch, id])

  const taskStatus = useMemo(() => {
    const updatedAt = task.get('updatedAt')
    if (updatedAt) {
      return `updated ${moment(updatedAt).fromNow()}`
    }

    const createdAt = task.get('createdAt')
    return `created ${moment(createdAt).fromNow()}`
  }, [task])

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
            <Typography variant="subtitle1">{task.get('title')}</Typography>
            <Typography variant="subtitle2">{task.get('description')}</Typography>
          </div>
          <div className={classes.footer}>
            <Typography variant="caption">{taskStatus}</Typography>
            <div className={classes.buttons}>
              <IconButton size="small" onClick={editTask} color="secondary" aria-label="Edit">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={deleteTask} aria-label="Delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default Task
