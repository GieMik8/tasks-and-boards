import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { List } from 'immutable'

import { Task } from 'components'
import useStyles from './style'

const TasksColumn = ({ id }) => {
  const classes = useStyles()
  const tasks = useSelector(state => state.app.getIn(['tasksByColumnId', id]) || List())
  const tasksById = useSelector(state => state.app.getIn(['entities', 'tasks']))

  console.log({ tasksById })

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={clsx(classes.root, { hovered: snapshot.isDraggingOver })}
          {...provided.droppableProps}
        >
          <h5>Column: {id}</h5>
          {provided.placeholder}
          {tasks.map((taskId, index) => {
            const task = tasksById.get(taskId)
            return <Task key={taskId} title={task.get('title')} index={index} id={taskId} />
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
