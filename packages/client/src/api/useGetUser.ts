import { useState, useEffect } from 'react'
import { User } from './authApiTypes'
import authApi from './authApi'

const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)
  const [error, setError] = useState(false)
  const getUser = async () => {
    try {
      const getUserResponse = await authApi.getUser()
      if ('reason' in getUserResponse) {
        throw Error(getUserResponse.reason)
      }
      setIsLoading(false)
      setUser(getUserResponse)
    } catch (error) {
      setIsLoading(false)
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    isLoading,
    user,
    error,
  }
}

export default useGetUser
