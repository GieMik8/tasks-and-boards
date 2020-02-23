import { combineEpics } from 'redux-observable'
import { empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'

const testEpic = action$ => action$.pipe(switchMap(() => empty()))

export default combineEpics(testEpic)
