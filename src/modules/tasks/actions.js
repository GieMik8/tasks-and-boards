import { createAction } from 'redux-actions'
import { createActionSet } from 'utils'

export const MOVE_TASK = 'tasks/MOVE_TASK'
export const REORDER_TASK = 'tasks/REORDER_TASK'
export const CREATE_COLUMN = 'tasks/CREATE_COLUMN'
export const EDIT_COLUMN = 'tasks/EDIT_COLUMN'
export const CREATE_TASK = 'tasks/CREATE_TASK'
export const EDIT_TASK = 'tasks/EDIT_TASK'
export const DELETE_TASK = 'tasks/DELETE_TASK'
export const FETCH_DATA = createActionSet('tasks/FETCH_DATA')

export const moveTask = createAction(MOVE_TASK)
export const reorderTask = createAction(REORDER_TASK)
export const createColumn = createAction(CREATE_COLUMN)
export const editColumn = createAction(EDIT_COLUMN)
export const editTask = createAction(EDIT_TASK)
export const createTask = createAction(CREATE_TASK)
export const deleteTask = createAction(DELETE_TASK)
export const fetchData = createAction(FETCH_DATA.PENDING)
export const fetchDataSuccess = createAction(FETCH_DATA.SUCCESS)
export const fetchDataError = createAction(FETCH_DATA.ERROR)
