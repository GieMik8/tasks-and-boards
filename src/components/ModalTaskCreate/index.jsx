import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import uuid from 'uuid'

import { closeModal as closeModalAction } from 'modules/ui'
import { createTask } from 'modules/app'
import { Modal } from 'components'
import { modalType } from 'types'
import FormTask from '../FormTask'

const ModalTaskCreate = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.TASK_CREATE, 'open']))
  const params = useSelector(state => state.ui.getIn(['modals', modalType.TASK_CREATE, 'params']))

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.TASK_CREATE))
  }, [dispatch])

  const submit = useCallback(
    data => {
      dispatch(
        createTask({
          title: data.title,
          description: data.description,
          id: uuid(),
          columnId: params.columnId,
        }),
      )
      dispatch(closeModalAction(modalType.TASK_CREATE))
    },
    [dispatch, params],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Create task</Typography>
      <FormTask onSubmit={submit} />
    </Modal>
  )
}

export default ModalTaskCreate
