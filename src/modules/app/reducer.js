import { handleActions } from 'redux-actions'

import { appStarted } from './actions'

const initialState = {
  isReady: false,
}

export default handleActions(
  {
    [appStarted]: state => ({ ...state, isReady: true }),
  },
  initialState,
)
