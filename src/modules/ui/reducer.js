import { handleActions } from 'redux-actions'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { test } from './actions'

const initialState = { test: true }

const appReducer = handleActions(
  {
    [test]: (state, { payload }) => ({ ...state, test: payload }),
  },
  initialState,
)

const persistConfig = {
  key: 'ui',
  storage,
}

const uiPersistedReducer = persistReducer(persistConfig, appReducer)

export default uiPersistedReducer
