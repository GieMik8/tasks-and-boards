import { useState, useCallback } from 'react'

export default (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState(null)
  const onChange = useCallback(e => {
    if (e.target) {
      setValue(e.target.value || '')
    } else {
      setValue(e)
    }
    setError(null)
  }, [])
  return [value, error, onChange, setError]
}
