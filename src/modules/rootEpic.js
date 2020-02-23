import { combineEpics } from 'redux-observable'

import { epics as appEpics } from './app'
import { epics as uiEpics } from './ui'
import { epics as tasksEpics } from './tasks'

export default combineEpics(appEpics, uiEpics, tasksEpics)
