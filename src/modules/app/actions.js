import { createAction } from 'redux-actions'

export const APP_START = 'app/START'
export const APP_STARTED = 'app/STARTED'

export const startApp = createAction(APP_START)
export const appStarted = createAction(APP_STARTED)
