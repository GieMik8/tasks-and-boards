import React, { useCallback } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Typography } from '@material-ui/core'

import { closeModal as closeModalAction } from 'modules/ui'
import { editTask } from 'modules/tasks'
import { Modal, FormTask } from 'components'
import { modalType } from 'types'

const ModalTaskEdit = () => {
  const dispatch = useDispatch()
  const open = useSelector(state => state.ui.getIn(['modals', modalType.TASK_EDIT, 'open']))
  const taskId = useSelector(state =>
    state.ui.getIn(['modals', modalType.TASK_EDIT, 'params', 'id']),
  )
  const task = useSelector(state => state.tasks.getIn(['entities', 'tasks', taskId]))

  const closeModal = useCallback(() => {
    dispatch(closeModalAction(modalType.TASK_EDIT))
  }, [dispatch])

  const submit = useCallback(
    data => {
      batch(() => {
        dispatch(
          editTask({
            title: data.title,
            description: data.description,
            id: task.get('id'),
            columnId: task.get('columnId'),
          }),
        )
        dispatch(closeModalAction(modalType.TASK_EDIT))
      })
    },
    [dispatch, task],
  )

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Edit task</Typography>
      <FormTask initial={task} onSubmit={submit} buttonText="Save" />
    </Modal>
  )
}

export default ModalTaskEdit
