import { combineEpics } from 'redux-observable'

import { epics as appEpics } from './app'

export default combineEpics(appEpics)
