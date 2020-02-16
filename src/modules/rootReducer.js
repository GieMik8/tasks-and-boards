import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { reducer as app } from './app'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app,
  })

export default createRootReducer
