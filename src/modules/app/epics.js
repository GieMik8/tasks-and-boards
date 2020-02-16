import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { startApp, appStarted } from './actions'

const initEpic = action$ =>
  action$.pipe(
    ofType(startApp.toString()),
    switchMap(() => of(appStarted())),
  )

export default combineEpics(initEpic)
