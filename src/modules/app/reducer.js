import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { appStarted } from './actions'

const initialState = fromJS({ isReady: false })

const appReducer = handleActions(
  {
    [appStarted]: state => state.set('isReady', true),
  },
  initialState,
)

export default appReducer
