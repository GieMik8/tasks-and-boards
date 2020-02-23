import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { List } from 'immutable'
import PropTypes from 'prop-types'

import { TasksColumnList, TasksColumn } from 'components'
import { moveTask, reorderTask } from 'modules/tasks'
import { openModal } from 'modules/ui'
import { modalType } from 'types'
import useStyles from './style'

const TasksBoard = ({ boardId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const columnsList =
    useSelector(state => state.tasks.getIn(['columnsByBoardId', boardId])) || List()

  const onDrag = useCallback(
    dragging => {
      const { destination, source, draggableId } = dragging
      if (!destination) {
        return
      }
      if (source.droppableId !== destination.droppableId) {
        dispatch(
          moveTask({
            from: { index: source.index, columnId: source.droppableId },
            to: { index: destination.index, columnId: destination.droppableId },
            taskId: draggableId,
          }),
        )
        return
      }
      dispatch(
        reorderTask({
          columnId: destination.droppableId,
          from: source.index,
          to: destination.index,
        }),
      )
    },
    [dispatch],
  )

  const openColumnCreateModal = useCallback(
    () => dispatch(openModal({ target: modalType.COLUMN_CREATE, params: { boardId } })),
    [dispatch, boardId],
  )

  const openTaskCreateModal = useCallback(
    id => dispatch(openModal({ target: modalType.TASK_CREATE, params: { columnId: id } })),
    [dispatch],
  )

  return (
    <div className={classes.wrapper}>
      <DragDropContext onDragEnd={onDrag}>
        <TasksColumnList onCreateColumn={openColumnCreateModal}>
          {columnsList.map(columnId => (
            <TasksColumn onCreateTask={openTaskCreateModal} key={columnId} id={columnId} />
          ))}
        </TasksColumnList>
      </DragDropContext>
    </div>
  )
}

TasksBoard.propTypes = {
  boardId: PropTypes.string.isRequired,
}

export default TasksBoard
