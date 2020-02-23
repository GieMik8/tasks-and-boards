import { combineEpics, ofType } from 'redux-observable'
import { of, empty } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { LOCALSTORAGE_KEY_TASKS } from 'types'
import { boards, columns, tasks } from 'mock'
import { task, board, column } from 'mock/schemas'
import { getGroupedIdsByParameter } from 'utils'
import {
  fetchData,
  fetchDataSuccess,
  moveTask,
  reorderTask,
  createColumn,
  editColumn,
  editTask,
  deleteTask,
  createTask,
} from './actions'

const fetchDataEpic = action$ =>
  action$.pipe(
    ofType(fetchData.toString()),
    switchMap(() => {
      const persistedTasksState = localStorage.getItem(LOCALSTORAGE_KEY_TASKS)
      if (persistedTasksState) {
        return of(fetchDataSuccess(JSON.parse(persistedTasksState)))
      }
      const normalized = normalize(
        { boards, tasks, columns },
        { boards: [board], tasks: [task], columns: [column] },
      )
      const payload = {
        boards: normalized.result.boards,
        entities: normalized.entities,
        columnsByBoardId: getGroupedIdsByParameter(columns, 'boardId'),
        tasksByColumnId: getGroupedIdsByParameter(tasks, 'columnId'),
      }
      return of(fetchDataSuccess(payload))
    }),
  )

const autoPersistTasksEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      moveTask.toString(),
      reorderTask.toString(),
      createColumn.toString(),
      createTask.toString(),
      editColumn.toString(),
      editTask.toString(),
      deleteTask.toString(),
    ),
    map(() => state$.value.tasks.toJS()),
    switchMap(tasksState => {
      localStorage.setItem(LOCALSTORAGE_KEY_TASKS, JSON.stringify(tasksState))
      return empty()
    }),
  )

export default combineEpics(fetchDataEpic, autoPersistTasksEpic)
