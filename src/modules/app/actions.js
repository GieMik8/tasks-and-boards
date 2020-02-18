import { createAction } from 'redux-actions'
import { createActionSet } from 'utils'

export const APP_START = 'app/START'
export const APP_STARTED = 'app/STARTED'
export const MOVE_TASK = 'app/MOVE_TASK'
export const REORDER_TASK = 'app/REORDER_TASK'
export const CREATE_COLUMN = 'app/CREATE_COLUMN'
export const EDIT_COLUMN = 'app/EDIT_COLUMN'
export const CREATE_TASK = 'app/CREATE_TASK'
export const EDIT_TASK = 'app/EDIT_TASK'
export const DELETE_TASK = 'app/DELETE_TASK'

export const FETCH_DATA = createActionSet('app/FETCH_DATA')

export const startApp = createAction(APP_START)
export const appStarted = createAction(APP_STARTED)

export const fetchData = createAction(FETCH_DATA.PENDING)
export const fetchDataSuccess = createAction(FETCH_DATA.SUCCESS)
export const fetchDataError = createAction(FETCH_DATA.ERROR)
export const moveTask = createAction(MOVE_TASK)
export const reorderTask = createAction(REORDER_TASK)
export const createColumn = createAction(CREATE_COLUMN)
export const editColumn = createAction(EDIT_COLUMN)
export const editTask = createAction(EDIT_TASK)
export const createTask = createAction(CREATE_TASK)
export const deleteTask = createAction(DELETE_TASK)
