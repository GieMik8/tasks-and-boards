import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { boards, columns, tasks } from 'mock'
import { task, board, column } from 'mock/schemas'
import { getGroupedByParameter } from 'utils'
import { startApp, appStarted, fetchData, fetchDataSuccess } from './actions'

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
        entities: normalized.entities,
        boards: normalized.result.boards,
        columns: normalized.result.columns,
        tasks: normalized.result.tasks,
        collumnsByBoardId: getGroupedByParameter(columns, 'boardId'),
        tasksByCollumnId: getGroupedByParameter(tasks, 'columnId'),
      }
      return of(fetchDataSuccess(payload))
    }),
  )

export default combineEpics(initEpic, fetchDataEpic)
