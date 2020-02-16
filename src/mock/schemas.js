import { schema } from 'normalizr'

export const board = new schema.Entity('boards')
export const task = new schema.Entity('tasks')
export const column = new schema.Entity('columns')
