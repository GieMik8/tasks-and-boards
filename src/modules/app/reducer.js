import { handleActions } from 'redux-actions'
import { fromJS, Map, List } from 'immutable'

import { entities, results } from 'mock'
import { appStarted } from './actions'

const initialState = Map({
  isReady: false,
  entities: fromJS(entities),
  boards: List(results.boards),
  collumns: List(results.collumns),
  tasks: List(results.tasks),
})

const appReducer = handleActions(
  {
    [appStarted]: state => state.set('isReady', true),
  },
  initialState,
)

export default appReducer
