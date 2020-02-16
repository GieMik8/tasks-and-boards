import { createAction } from 'redux-actions'
import { createActionSet } from 'utils'

export const APP_START = 'app/START'
export const APP_STARTED = 'app/STARTED'

export const FETCH_DATA = createActionSet('app/FETCH_DATA')

export const startApp = createAction(APP_START)
export const appStarted = createAction(APP_STARTED)

export const fetchData = createAction(FETCH_DATA.PENDING)
export const fetchDataSuccess = createAction(FETCH_DATA.SUCCESS)
export const fetchDataError = createAction(FETCH_DATA.ERROR)
