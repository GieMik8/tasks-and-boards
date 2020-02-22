import React, { useCallback } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

import { deleteTask as deleteTaskAction } from 'modules/app'
import { openModal } from 'modules/ui'
import { Task } from 'components'
import { modalType } from 'types'
import useStyles from './style'

const TasksColumn = ({ id, onCreateTask }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.app.getIn(['tasksByColumnId', id]) || List())
  const tasksById = useSelector(state => state.app.getIn(['entities', 'tasks']))
  const column = useSelector(state => state.app.getIn(['entities', 'columns', id]))

  const editColumn = useCallback(
    () => dispatch(openModal({ target: modalType.COLUMN_EDIT, params: { id: column.get('id') } })),
    [dispatch, column],
  )

  const editTask = useCallback(
    task => dispatch(openModal({ target: modalType.TASK_EDIT, params: { id: task.get('id') } })),
    [dispatch],
  )

  const deleteTask = useCallback(taskId => dispatch(deleteTaskAction(taskId)), [dispatch])

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
            <Button className={classes.title} onClick={editColumn}>
              {column.get('title')}
              <EditIcon style={{ fontSize: 14, marginLeft: 5 }} />
            </Button>
          </div>
          {provided.placeholder}
          {tasks.map((taskId, index) => {
            const task = tasksById.get(taskId)
            return (
              <Task
                key={taskId}
                description={task.get('description')}
                title={task.get('title')}
                index={index}
                id={taskId}
                onEdit={() => editTask(task)}
                onDelete={() => deleteTask(taskId)}
              />
            )
          })}
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
