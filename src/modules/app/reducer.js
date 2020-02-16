import { handleActions } from 'redux-actions'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { appStarted } from './actions'

const initialState = {
  isReady: false,
}

const appReducer = handleActions(
  {
    [appStarted]: state => ({ ...state, isReady: true }),
  },
  initialState,
)

const persistConfig = {
  key: 'app',
  storage,
}

const appPersistedReducer = persistReducer(persistConfig, appReducer)

export default appPersistedReducer
