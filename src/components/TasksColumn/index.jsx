import React, { useMemo, useCallback } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { List } from 'immutable'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import QueryString from 'query-string'

import { Task } from 'components'
import useStyles from './style'

const TasksColumn = ({ id }) => {
  const classes = useStyles()
  const { boardId } = useParams()
  const history = useHistory()
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

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={clsx(classes.root, { hovered: snapshot.isDraggingOver })}
          {...provided.droppableProps}
        >
          <Link to={editColumnLink}>
            <Typography variant="h6">{column.get('title')}</Typography>
          </Link>
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
              />
            )
          })}
        </div>
      )}
    </Droppable>
  )
}

TasksColumn.propTypes = {
  id: PropTypes.string.isRequired,
}

export default TasksColumn
