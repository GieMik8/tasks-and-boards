import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'

import createRootReducer from './rootReducer'
import rootEpic from './rootEpic'

export const history = createBrowserHistory()

// TODO: persist store

const composeEnhancers = composeWithDevTools({})
const epicMiddleware = createEpicMiddleware()

const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware)),
  )

  epicMiddleware.run(rootEpic)

  return store
}

const store = configureStore()

export default store
