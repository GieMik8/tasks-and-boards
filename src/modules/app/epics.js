import { combineEpics, ofType } from 'redux-observable'
import { of, empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { boards, columns, tasks } from 'mock'
import { task, board, column } from 'mock/schemas'
import { getGroupedByParameter } from 'utils'
import { startApp, appStarted, fetchData, fetchDataSuccess, moveTask } from './actions'

const initEpic = action$ =>
  action$.pipe(
    ofType(startApp.toString()),
    switchMap(() => of(appStarted())),
  )

const fetchDataEpic = action$ =>
  action$.pipe(
    ofType(fetchData.toString()),
    switchMap(() => {
      const normalized = normalize(
        { boards, tasks, columns },
        { boards: [board], tasks: [task], columns: [column] },
      )
      const payload = {
        boards: normalized.result.boards,
        entities: normalized.entities,
        columnsByBoardId: getGroupedByParameter(columns, 'boardId'),
        tasksByColumnId: getGroupedByParameter(tasks, 'columnId'),
      }
      return of(fetchDataSuccess(payload))
    }),
  )

const moveTaskEpic = action$ =>
  action$.pipe(
    ofType(moveTask.toString()),
    switchMap(({ payload }) => {
      console.log({ payload })
      return empty()
    }),
  )

export default combineEpics(initEpic, fetchDataEpic, moveTaskEpic)
