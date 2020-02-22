import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  TasksBoard,
  ModalColumnEdit,
  ModalColumnCreate,
  ModalTaskCreate,
  ModalTaskEdit,
} from 'components'
import { useQuery } from 'hooks'
import { openModal } from 'modules/ui'
import { modalType } from 'types'

const Board2 = () => {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const { selectedTask, selectedColumn } = useQuery()

  const board = useSelector(state => state.app.getIn(['entities', 'boards', boardId]))

  useEffect(() => {
    if (selectedColumn) {
      dispatch(openModal({ target: modalType.COLUMN_EDIT, params: { id: selectedColumn } }))
      return
    }
    if (selectedTask) {
      dispatch(openModal({ target: modalType.TASK_EDIT, params: { id: selectedTask } }))
    }
  }, [selectedColumn, selectedTask, dispatch])

  if (!board) {
    return null
  }

  return (
    <>
      <Typography variant="h5">
        <Link to="/">Home</Link> / Board: {board.get('title')}
      </Typography>
      <TasksBoard boardId={boardId} />
      <ModalColumnEdit />
      <ModalColumnCreate />
      <ModalTaskCreate />
      <ModalTaskEdit />
    </>
  )
}

export default React.memo(Board2)
