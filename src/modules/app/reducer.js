import { handleActions } from 'redux-actions'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { appStarted, testPersist } from './actions'

const initialState = {
  isReady: false,
  testValue: null,
}

const appReducer = handleActions(
  {
    [appStarted]: state => ({ ...state, isReady: true }),
    [testPersist]: (state, { payload }) => ({ ...state, testValue: payload })
  },
  initialState,
)

const persistConfig = {
  key: 'app',
  storage,
}

const appPersistedReducer = persistReducer(persistConfig, appReducer)

export default appPersistedReducer