import { combineEpics } from 'redux-observable'

import { epics as appEpics } from './app'
import { epics as uiEpics } from './ui'

export default combineEpics(appEpics, uiEpics)
