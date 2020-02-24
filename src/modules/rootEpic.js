import { combineEpics } from 'redux-observable'

import { epics as appEpics } from './app'
import { epics as tasksEpics } from './tasks'

export default combineEpics(appEpics, tasksEpics)
