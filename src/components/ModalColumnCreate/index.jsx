import React, { useCallback } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Typography } from '@material-ui/core'
import uuid from 'uuid'

import { closeModal as closeModalAction } from 'modules/ui'
import { createColumn } from 'modules/tasks'
import { Modal, FormColumn } from 'components'
import { modalType } from 'types'

const ModalColumnCreate = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_CREATE, 'open']))
  const boardId = useSelector(state =>
    state.ui.getIn(['modals', modalType.COLUMN_CREATE, 'params', 'boardId']),
  )

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.COLUMN_CREATE))
  }, [dispatch])

  const submit = useCallback(
    data => {
      batch(() => {
        dispatch(createColumn({ title: data.title, id: uuid(), boardId }))
        dispatch(closeModalAction(modalType.COLUMN_CREATE))
      })
    },
    [dispatch, boardId],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Create column</Typography>
      <FormColumn onSubmit={submit} />
    </Modal>
  )
}

export default ModalColumnCreate
