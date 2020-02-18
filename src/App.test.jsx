import { getGroupedIdsByParameter } from 'utils'

test('should return an empty object', () => {
  const grouped = getGroupedIdsByParameter([], 'name')
  expect(grouped).toStrictEqual({})
})

test('should have 1 group (parameter)', () => {
  const grouped = getGroupedIdsByParameter([{ name: 'Beautiful', id: 'random_id' }], 'name')
  expect(Object.keys(grouped)).toHaveLength(1)
})

const NAME = 'Beautiful'
test(`should have group named ${NAME}`, () => {
  const grouped = getGroupedIdsByParameter([{ name: NAME, id: 'random_id' }], 'name')
  expect(Object.keys(grouped)).toContainEqual(NAME)
})
