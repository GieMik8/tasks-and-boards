import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'

import { closeModal as closeModalAction } from 'modules/ui'
import { editColumn } from 'modules/app'
import { Modal } from 'components'
import { modalType } from 'types'
import FormColumn from '../FormColumn'

const ModalColumnEdit = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_EDIT, 'open']))
  const params = useSelector(state => state.ui.getIn(['modals', modalType.COLUMN_EDIT, 'params']))

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.COLUMN_EDIT))
  }, [dispatch])

  const submit = useCallback(
    data => {
      dispatch(editColumn({ title: data.title, id: params.get('id') }))
      dispatch(closeModalAction(modalType.COLUMN_EDIT))
    },
    [dispatch, params],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Edit column</Typography>
      <FormColumn initial={params} onSubmit={submit} buttonText="Save" />
    </Modal>
  )
}

export default ModalColumnEdit
