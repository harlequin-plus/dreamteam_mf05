import { useState, useEffect } from 'react'
import { User } from './authApiTypes'
import authApi from './authApi'
type GetUser = {
  isLoading: boolean
  user: null | User
  error: boolean
}
const useGetUser = () => {
  const [state, setState] = useState<GetUser>({
    isLoading: true,
    user: null,
    error: false,
  })

  const getUser = async () => {
    try {
      const getUserResponse = await authApi.getUser()
      if ('reason' in getUserResponse) {
        throw Error(getUserResponse.reason)
      }
      setState({ ...state, isLoading: false, user: getUserResponse })
      console.log('User:', getUserResponse)
    } catch (error) {
      console.log(error)
      setState({ ...state, isLoading: false, error: true })
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return state
}

export default useGetUser
