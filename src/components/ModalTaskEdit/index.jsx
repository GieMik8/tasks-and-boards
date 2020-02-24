import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { Typography } from '@material-ui/core'

import { closeModal as closeModalAction } from 'modules/ui'
import { editTask } from 'modules/tasks'
import { Modal, FormTask } from 'components'
import { modalType } from 'types'
import moment from 'moment'

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

  const taskStatus = useMemo(() => {
    if (!task) {
      return null
    }
    const updatedAt = task.get('updatedAt')
    if (updatedAt) {
      return `last updated ${moment(updatedAt).fromNow()}`
    }

    const createdAt = task.get('createdAt')
    return `created ${moment(createdAt).fromNow()}`
  }, [task])

  return (
    <Modal open={open} onClose={closeModal}>
      <Typography variant="h6">Edit task</Typography>
      <Typography variant="caption">{taskStatus}</Typography>
      <FormTask initial={task} onSubmit={submit} buttonText="Save" />
    </Modal>
  )
}

export default ModalTaskEdit
