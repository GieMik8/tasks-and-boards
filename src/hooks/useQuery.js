import QueryString from 'query-string'
import { useLocation } from 'react-router'

const useQuery = () => {
  const location = useLocation()
  return QueryString.parse(location.search)
}

export default useQuery
