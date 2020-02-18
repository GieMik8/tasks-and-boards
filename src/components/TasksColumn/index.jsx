import React, { useMemo, useCallback } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'immutable'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import QueryString from 'query-string'
import AddIcon from '@material-ui/icons/Add'

import { deleteTask } from 'modules/app'
import { Task } from 'components'
import useStyles from './style'

const TasksColumn = ({ id, onCreateTask }) => {
  const classes = useStyles()
  const { boardId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.app.getIn(['tasksByColumnId', id]) || List())
  const tasksById = useSelector(state => state.app.getIn(['entities', 'tasks']))
  const column = useSelector(state => state.app.getIn(['entities', 'columns', id]))

  const editColumnLink = useMemo(
    () => `/boards/${boardId}?${QueryString.stringify({ column: id, title: column.get('title') })}`,
    [boardId, id, column],
  )

  const onEditTask = useCallback(
    ({ title, description, id: taskId }) => {
      history.replace(
        `/boards/${boardId}?${QueryString.stringify({
          task: taskId,
          title,
          description,
        })}`,
      )
    },
    [history, boardId],
  )

  const onDeleteTask = useCallback(taskId => dispatch(deleteTask(taskId)), [dispatch])

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={clsx(classes.root, { 'dragged-over': snapshot.isDraggingOver })}
          {...provided.droppableProps}
        >
          <div className={classes.header}>
            <Link className={classes.title} to={editColumnLink}>
              {column.get('title')}
              <EditIcon style={{ fontSize: 14, marginLeft: 5 }} />
            </Link>
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
                onEdit={() =>
                  onEditTask({
                    id: taskId,
                    title: task.get('title'),
                    description: task.get('description'),
                  })
                }
                onDelete={() => onDeleteTask(taskId)}
              />
            )
          })}
          <div className={classes.addButtonWrapper}>
            <Button
              size="large"
              fullWidth
              onClick={onCreateTask}
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
