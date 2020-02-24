import React, { useCallback } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

import { openModal } from 'modules/ui'
import { Task } from 'components'
import { modalType } from 'types'
import useStyles from './style'

const emptyList = List()

const TasksColumn = ({ id, onCreateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tasksList = useSelector(state => state.tasks.getIn(['tasksByColumnId', id]) || emptyList)
  const column = useSelector(state => state.tasks.getIn(['entities', 'columns', id]))

  const editColumn = useCallback(
    () => dispatch(openModal({ target: modalType.COLUMN_EDIT, params: { id } })),
    [dispatch, id],
  )

  const createTask = useCallback(() => onCreateTask(id), [id, onCreateTask])

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={clsx(classes.root, { 'dragged-over': snapshot.isDraggingOver })}
          {...provided.droppableProps}
        >
          <div className={classes.header}>
            <Button variant="text" className={classes.title} onClick={editColumn}>
              {column.get('title')}
              <EditIcon style={{ fontSize: 14, marginLeft: 5 }} />
            </Button>
          </div>
          {provided.placeholder}
          {tasksList.map((taskId, index) => (
            <Task key={taskId} index={index} id={taskId} />
          ))}
          <div className={classes.addButtonWrapper}>
            <Button
              size="large"
              fullWidth
              onClick={createTask}
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Create task
            </Button>
          </div>
        </div>
      )}
    </Droppable>
  )
}

TasksColumn.propTypes = {
  id: PropTypes.string.isRequired,
  onCreateTask: PropTypes.func,
}

TasksColumn.defaultProps = {
  onCreateTask: () => {},
}

export default TasksColumn
