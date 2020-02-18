import React, { useCallback, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import uuid from 'uuid'

import {
  moveTask,
  reorderTask,
  createColumn as createColumnAction,
  editColumn as editColumnAction,
  editTask as editTaskAction,
} from 'modules/app'
import { TasksColumns, TasksColumn, ColumnControlModal, TaskControlModal } from 'components'
import { useQuery } from 'hooks'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { column = false, title = '', description = '', task = false } = useQuery()
  const [createColumnModalOpened, setCreateColumnModalOpened] = useState(false)

  const columnsList = useSelector(state => state.app.getIn(['columnsByBoardId', params.boardId]))
  const board = useSelector(state => state.app.getIn(['entities', 'boards', params.boardId]))

  const openCreateModal = useCallback(() => setCreateColumnModalOpened(true), [])

  const closeModals = useCallback(() => {
    setCreateColumnModalOpened(false)
    history.replace(`/boards/${params.boardId}`)
  }, [history, params.boardId])

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

  const createColumn = useCallback(
    saveTitle => {
      dispatch(createColumnAction({ boardId: params.boardId, title: saveTitle, id: uuid() }))
      closeModals()
    },
    [dispatch, params.boardId, closeModals],
  )

  const editColumn = useCallback(
    saveTitle => {
      dispatch(editColumnAction({ title: saveTitle, id: column }))
      closeModals()
    },
    [dispatch, column, closeModals],
  )

  const editTask = useCallback(
    payload => {
      dispatch(
        editTaskAction({
          title: payload.title,
          id: task,
          description: payload.description,
        }),
      )
      closeModals()
    },
    [dispatch, closeModals, task],
  )

  if (!board) {
    return null
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">Board: {board.get('title')}</Typography>
      <div className={classes.wrapper}>
        <DragDropContext onDragEnd={onDrag}>
          <TasksColumns>
            {columnsList.map(columnId => (
              <TasksColumn key={columnId} id={columnId} />
            ))}
            <Button onClick={openCreateModal} variant="outlined" color="secondary">
              <AddIcon />
            </Button>
          </TasksColumns>
        </DragDropContext>
        <ColumnControlModal
          open={createColumnModalOpened}
          onSubmit={createColumn}
          onClose={closeModals}
        />
        <ColumnControlModal
          open={!!column}
          initial={title}
          onSubmit={editColumn}
          onClose={closeModals}
        />
        <TaskControlModal
          initial={{ title, description }}
          open={!!task}
          onSubmit={editTask}
          onClose={closeModals}
        />
      </div>
    </div>
  )
}
