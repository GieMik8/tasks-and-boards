import { combineEpics, ofType } from 'redux-observable'
import { empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { test } from './actions'

const testEpic = action$ =>
  action$.pipe(
    ofType(test.toString()),
    switchMap(() => empty()),
  )

export default combineEpics(testEpic)
