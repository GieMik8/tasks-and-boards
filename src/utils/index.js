export const createActionSet = actionName => ({
  PENDING: `${actionName}_PENDING`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
  actionName,
})

export const getGroupedByParameter = (items, paramaterName, idParameter = 'id') =>
  items.reduce((accumulated, currentItem) => {
    if (accumulated[currentItem[paramaterName]]) {
      accumulated[currentItem[paramaterName]].push(currentItem[idParameter])
    } else {
      // eslint-disable-next-line no-param-reassign
      accumulated[currentItem[paramaterName]] = [currentItem[idParameter]]
    }
    return accumulated
  }, {})
