import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { Typography } from '@material-ui/core'

import { moveTask, reorderTask } from 'modules/app'
import { TasksColumns, TasksColumn } from 'components'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  const params = useParams()
  const dispatch = useDispatch()

  const columns = useSelector(state => state.app.getIn(['columnsByBoardId', params.boardId]))
  const board = useSelector(state => state.app.getIn(['entities', 'boards', params.boardId]))

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

  if (!board) {
    return null
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">Board: {board.get('title')}</Typography>
      <div className={classes.context}>
        <DragDropContext onDragEnd={onDrag}>
          <TasksColumns>
            {columns.map(columnId => (
              <TasksColumn key={columnId} id={columnId} />
            ))}
          </TasksColumns>
        </DragDropContext>
      </div>
    </div>
  )
}
