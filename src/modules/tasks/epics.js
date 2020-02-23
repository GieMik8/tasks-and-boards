import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { normalize } from 'normalizr'

import { boards, columns, tasks } from 'mock'
import { task, board, column } from 'mock/schemas'
import { getGroupedIdsByParameter } from 'utils'
import { fetchData, fetchDataSuccess } from './actions'

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
        columnsByBoardId: getGroupedIdsByParameter(columns, 'boardId'),
        tasksByColumnId: getGroupedIdsByParameter(tasks, 'columnId'),
      }
      return of(fetchDataSuccess(payload))
    }),
  )

export default combineEpics(fetchDataEpic)
