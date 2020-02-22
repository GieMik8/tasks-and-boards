import { createAction } from 'redux-actions'

export const OPEN_MODAL = 'ui/OPEN_MODAL'
export const CLOSE_MODAL = 'ui/CLOSE_MODAL'

export const openModal = createAction(OPEN_MODAL)
export const closeModal = createAction(CLOSE_MODAL)
