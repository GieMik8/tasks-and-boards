import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

import {
  appStarted,
  fetchDataSuccess,
  moveTask,
  reorderTask,
  createColumn,
  editColumn,
  editTask,
} from './actions'

const initialState = Map({
  isReady: false,
  entities: Map(),
  boards: List(),
  columns: List(),
  tasks: List(),
})

const appReducer = handleActions(
  {
    [appStarted]: state => state.set('isReady', true),
    [fetchDataSuccess]: (state, { payload }) =>
      state
        .set('entities', fromJS(payload.entities))
        .set('boards', fromJS(payload.boards))
        .set('columnsByBoardId', fromJS(payload.columnsByBoardId))
        .set('tasksByColumnId', fromJS(payload.tasksByColumnId)),
    [moveTask]: (state, { payload }) =>
      state
        .setIn(['entities', 'tasks', payload.taskId, 'columnId'], payload.to)
        .setIn(
          ['tasksByColumnId', payload.from.columnId],
          state.getIn(['tasksByColumnId', payload.from.columnId]).delete(payload.from.index),
        )
        .setIn(
          ['tasksByColumnId', payload.to.columnId],
          (state.getIn(['tasksByColumnId', payload.to.columnId]) || List()).insert(
            payload.to.index,
            payload.taskId,
          ),
        ),
    [reorderTask]: (state, { payload }) => {
      let tasks = state.getIn(['tasksByColumnId', payload.columnId])
      const targetTask = tasks.get(payload.from)
      if (payload.from > payload.to) {
        tasks = tasks.delete(payload.from).insert(payload.to, targetTask)
      } else {
        tasks = tasks.insert(payload.to + 1, targetTask).delete(payload.from)
      }
      return state.setIn(['tasksByColumnId', payload.columnId], tasks)
    },
    [createColumn]: (state, { payload }) =>
      state
        .setIn(['entities', 'columns', payload.id], fromJS(payload))
        .setIn(
          ['columnsByBoardId', payload.boardId],
          state.getIn(['columnsByBoardId', payload.boardId]).push(payload.id),
        ),
    [editColumn]: (state, { payload }) =>
      state.setIn(['entities', 'columns', payload.id, 'title'], payload.title),
    [editTask]: (state, { payload }) => {
      const task = state
        .getIn(['entities', 'tasks', payload.id])
        .set('title', payload.title)
        .set('description', payload.description)
      return state.setIn(['entities', 'tasks', payload.id], task)
    },
  },
  initialState,
)

export default appReducer
