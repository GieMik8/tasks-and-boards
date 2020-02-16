import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { reducer as app } from './app'
import { reducer as ui } from './ui'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app,
    ui,
  })

export default createRootReducer
