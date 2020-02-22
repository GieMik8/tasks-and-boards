import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { modalType } from 'types'
import { openModal, closeModal } from './actions'

const initialState = fromJS({
  modals: {
    [modalType.COLUMN_CREATE]: { open: false, params: null },
    [modalType.COLUMN_EDIT]: { open: false, params: null },
    [modalType.TASK_CREATE]: { open: false, params: null },
    [modalType.TASK_EDIT]: { open: false, params: null },
  },
})

const uiReducer = handleActions(
  {
    [openModal]: (state, { payload }) => {
      let targetModal = state.getIn(['modals', payload.target])
      targetModal = targetModal.set('open', true).set('params', payload.params || null)
      return state.setIn(['modals', payload.target], targetModal)
    },
    [closeModal]: (state, { payload }) => {
      let targetModal = state.getIn(['modals', payload])
      targetModal = targetModal.set('open', false).set('params', null)
      return state.setIn(['modals', payload], targetModal)
    },
  },
  initialState,
)

export default uiReducer
