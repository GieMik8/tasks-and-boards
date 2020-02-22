import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import uuid from 'uuid'

import { closeModal as closeModalAction } from 'modules/ui'
import { createColumn } from 'modules/app'
import { Modal } from 'components'
import { modalType } from 'types'
import FormColumn from '../FormColumn'

const ModalColumnCreate = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_CREATE, 'open']))
  const params = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_CREATE, 'params']))

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.COLUMN_CREATE))
  }, [dispatch])

  const submit = useCallback(
    data => {
      dispatch(createColumn({ title: data.title, id: uuid(), boardId: params.boardId }))
      dispatch(closeModalAction(modalType.COLUMN_CREATE))
    },
    [dispatch, params],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Create column</Typography>
      <FormColumn onSubmit={submit} />
    </Modal>
  )
}

export default ModalColumnCreate
