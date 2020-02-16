import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map()

const uiReducer = handleActions({}, initialState)

export default uiReducer
