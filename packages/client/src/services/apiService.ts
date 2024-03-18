import { useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'
import { SignUpDataType, SignInDataType, User } from '../api/authApiTypes'
import { useState, useEffect } from 'react'

const signUp = async (data: SignUpDataType) => {
  const navigate = useNavigate()
  try {
    const signUpResponse = await authApi.signUp(data)
    if ('reason' in signUpResponse) {
      throw Error(signUpResponse.reason)
    }
    const getUserResponse = await authApi.getUser()
    if ('reason' in getUserResponse) {
      throw Error(getUserResponse.reason)
    }
    console.log('устанавливаем в стор', getUserResponse)
    navigate('/')
  } catch (error) {
    console.log(error)
    navigate('/404')
    return
  }
}

const signIn = async (data: SignInDataType) => {
  const navigate = useNavigate()
  try {
    const signInResponse = await authApi.signIn(data)
    if (signInResponse && 'reason' in signInResponse) {
      throw Error(signInResponse.reason)
    }
    console.log('вход выполнен')
    navigate('/')
  } catch (error) {
    console.log('Ошибка в signIn:', error)
    navigate('/404')
    return
  }
}

const getUser = async () => {
  const navigate = useNavigate()
  try {
    const userResponse = await authApi.getUser()
    if ('reason' in userResponse) {
      throw Error(userResponse.reason)
    }
    return userResponse
  } catch (error) {
    console.log(error)
    navigate('/404')
    return
  }
}

const logout = async () => {
  const navigate = useNavigate()
  try {
    const status = await authApi.logout()
    if (status === 200) {
      console.log('устанавливаем в сторе user:null')
      navigate('/auth')
    }
  } catch (error) {
    console.log(error)
    navigate('/404')
    return
  }
}

// **************************hooks*****************************
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

export { signUp, signIn, getUser, logout, useGetUser }

// const test = {
//   first_name: 'Vasia25',
//   second_name: 'vasin25',
//   login: 'vasia2567',
//   email: 'mail@vas25.com',
//   password: '13456743223LL',
//   phone: '+79345676',
// }
