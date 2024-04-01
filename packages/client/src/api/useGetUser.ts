import { useState, useEffect } from 'react'
import { User } from './authApiTypes'
import { getUser } from '../services/apiService'

const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)
  const [error, setError] = useState(false)
  const checkUser = async () => {
    try {
      const getUserResponse = await getUser()
      setIsLoading(false)
      if (getUserResponse) setUser(getUserResponse)
    } catch (error) {
      setIsLoading(false)
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return {
    isLoading,
    user,
    error,
  }
}

export default useGetUser
