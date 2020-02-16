import { createAction } from 'redux-actions'

export const APP_START = 'app/START'
export const APP_STARTED = 'app/STARTED'
export const TEST_PERSIST = 'app/TEST_PERSIST'

export const startApp = createAction(APP_START)
export const appStarted = createAction(APP_STARTED)
