import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { reducer as app } from './app'
import { reducer as ui } from './ui'
import { reducer as tasks } from './tasks'

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app,
    ui,
    tasks,
  })

export default createRootReducer
