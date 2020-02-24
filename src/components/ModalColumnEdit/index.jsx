import React, { useCallback } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Typography } from '@material-ui/core'

import { closeModal as closeModalAction } from 'modules/ui'
import { editColumn } from 'modules/tasks'
import { Modal } from 'components'
import { modalType } from 'types'
import FormColumn from '../FormColumn'

const ModalColumnEdit = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_EDIT, 'open']))
  const id = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_EDIT, 'params', 'id']))
  const column = useSelector(state => state.tasks.getIn(['entities', 'columns', id]))

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.COLUMN_EDIT))
  }, [dispatch])

  const submit = useCallback(
    data => {
      batch(() => {
        dispatch(editColumn({ title: data.title, id }))
        dispatch(closeModalAction(modalType.COLUMN_EDIT))
      })
    },
    [dispatch, id],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Edit column</Typography>
      <FormColumn initial={column} onSubmit={submit} buttonText="Save" />
    </Modal>
  )
}

export default ModalColumnEdit
