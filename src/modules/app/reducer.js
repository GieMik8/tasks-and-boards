import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

import { appStarted, fetchDataSuccess } from './actions'

const initialState = Map({
  isReady: false,
  entities: Map(),
  boards: List(),
  collumns: List(),
  tasks: List(),
})

const appReducer = handleActions(
  {
    [appStarted]: state => state.set('isReady', true),
    [fetchDataSuccess]: (state, { payload }) =>
      state
        .set('entities', fromJS(payload.entities))
        .set('boards', fromJS(payload.boards))
        .set('collumns', fromJS(payload.collumns))
        .set('tasks', fromJS(payload.tasks))
        .set('collumnsByBoardId', fromJS(payload.collumnsByBoardId))
        .set('tasksByCollumnId', fromJS(payload.tasksByCollumnId)),
  },
  initialState,
)

export default appReducer
