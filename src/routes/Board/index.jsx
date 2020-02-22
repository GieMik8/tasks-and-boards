import React from 'react'
import { useParams } from 'react-router'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  TasksBoard,
  ModalColumnEdit,
  ModalColumnCreate,
  ModalTaskCreate,
  ModalTaskEdit,
} from 'components'

const Board2 = () => {
  const { boardId } = useParams()

  const board = useSelector(state => state.app.getIn(['entities', 'boards', boardId]))

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
